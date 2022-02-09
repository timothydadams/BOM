import React, {useState,useEffect} from "react";
import axios from "axios"
import { useHistory, useParams } from 'react-router-dom';
import EventsTile from './EventsTile'
import { useSnackbar } from 'notistack';


const Register = (props) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  console.log(JSON.stringify(props));
  const params = useParams();
  const [contentLoaded, setContentLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const eventid = params.eventid;
  
  const history = useHistory();
 

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try{
          const result = await axios(
            'https://bomreactapi.azurewebsites.net/events/geteventsinfo?eventid=' + eventid,
          );
        //alert(JSON.stringify(fields));
        //console.log(JSON.stringify(result.data));
        if(result.data)
        {
          setData(result.data);
        }
        //alert(JSON.stringify(fields));
        enqueueSnackbar('Event fetch success');
      }
        catch(error){
        setError(true)
        enqueueSnackbar('Event fetch failed');
      }        
    };

    if(!contentLoaded){
      
      fetchData();
      setContentLoaded(true);        
      setIsLoading(false);
    }
}, []);


  return (
<div id="">
    <div className="full-row yellow">
        <div className="container-fluid">
            <div className="row pt-4 pb-4">
                <div className="col-md-6 pt-3">
                    <div className="form-group">
                        <input name="Group"  placeholder="Enter Group Name"  id="GroupName" />
                    </div>
                </div>
                <div className="col-md-6 pt-3">
                <div className="form-group">
                    <input name="search" type="text" maxLength="200" id="" className="form-control" placeholder="Search Events..."  />
                </div>
            </div>
        </div>
    </div>
    </div>
    <div className="full-row white">
        <div className="container-fluid">
            <ul id="event-grid">
                
                { data.map(singleEvent =>
                    <EventsTile key={singleEvent.EventsID} Event={singleEvent}/>
                )}
                
            </ul>
        </div>
  </div>
  </div>
         ) 
}



export default Register;