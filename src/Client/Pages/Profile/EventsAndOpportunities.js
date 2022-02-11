import React, {useState,useEffect} from "react";
import axios from "axios"
import { useHistory } from 'react-router-dom';
import { DataGrid , GridToolbar } from '@mui/x-data-grid';
import Select from "react-select";
import EventsTile from './EventsTile'
import NoResults from '../../../Components/NoResults'


const EventsAndOpportunities = (props) => {
  const [data, setData] = useState([]);
  const [filteredData,setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [drpCateogory, setDrpCategory] = useState();
  const [search, setSearch] = useState('');
  const history = useHistory();
  const [hasFilterData, setHasFilterData] = useState();
  const categoriesList = [{ value: 68, label: "Adult Co-ed Program" }, { value:65,label:"Adult Events"}];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try{
          const result = await axios(
            'https://bomreactapi.azurewebsites.net/events/getevents',
          );
          setData(result.data);
          setFilteredData(result.data);
      }
        catch(error){
        setError(true)
      }
 
      
      setIsLoading(false);
      //console.log(data);
    };
 
    fetchData();
  }, []);

  const handleCategoryChange = option => {
    setDrpCategory({ drpCateogory: option});
   }

   const handleSearchChange = option => {
       setSearch(option.value);
       let value = option.target.value.toLowerCase();
       let result = data.filter(item => 
        item["BP_Title"].toLowerCase().includes(value) ||
        item["BP_Description"].toLowerCase().includes(value)
       );
        setFilteredData(arr => result);
       
   }


  return (
<div id="">
    <div className="full-row yellow">
        <div className="container-fluid">
            <div className="row pt-4 pb-4">
                <div className="col-md-6 pt-3">
                    <div className="form-group">
                        <Select name="BP_Categories"  placeholder="Select Categories" options={categoriesList} id="BP_Categories" value={drpCateogory} onChange={setDrpCategory}/>
                    </div>
                </div>
                <div className="col-md-6 pt-3">
                    <div className="form-group">
                         <input name="search" type="text" maxLength="200" id="" className="form-control" placeholder="Search Events..." value={search} onChange={handleSearchChange} />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="full-row white">
            <ul id="event-grid">     
                { filteredData && filteredData.length > 0 ? (
                    filteredData.map(singleEvent =>
                        <EventsTile key={singleEvent.EventsID} Event={singleEvent}/>
                    )

                ) : 
                
            filteredData ? <NoResults/> :
                data.map(singleEvent =>
                    <EventsTile key={singleEvent.EventsID} Event={singleEvent}/>
                )  }
                
            </ul>
    </div>
 </div>
         ) 
}



export default EventsAndOpportunities;