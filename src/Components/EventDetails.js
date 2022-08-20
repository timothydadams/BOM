import React, {useState,useEffect} from "react";
import axios from "../api/axios";
import { useNavigate, useParams, Link } from 'react-router-dom';
import RegistrationTile from './profile/RegistrationTile';
import { useSnackbar } from 'notistack';
import dateFormat from 'dateformat';
import dompurify from 'dompurify';


const EventDetails = (props) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [bomEvent, setbomEvent] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  //console.log(JSON.stringify(props));
  const params = useParams();
  const [contentLoaded, setContentLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const eventid = params.eventid;
  
  const navigate = useNavigate();
 

  useEffect(() => {
    const fetchData = async () => {
      try{
      setIsLoading(true);
      const response = await axios.all([
          axios.get('/events/geteventsinfo?eventid=' + eventid),
          axios.get('/events/getregistrations?eventid=' + eventid)
      ]);
          setbomEvent(response[0].data);
          setRegistrations(response[1].data);
          enqueueSnackbar('Event fetch success');
          setIsLoading(false);
          setContentLoaded(true);
    
          
    } catch(error){
        setError(true);
        setContentLoaded(false);
        enqueueSnackbar('Event fetch failed');
      }        
    };

    if(!contentLoaded){
      
      fetchData();
      setContentLoaded(true);        
      setIsLoading(false);
    }
}, []);

const bgImageStyle = {
    background: `url("/Images/eventBanner.jpg") no-repeat center center`,
    backgroundSize: 'cover'
}


  return (
<div id="">
    <div id="banner" className="full-row" style={bgImageStyle}>
        <div className="overlay"></div>
        <div className="banner-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 text-white">
                        <h1 className="text-uppercase">{bomEvent.BP_Title}</h1>
                        {/*<p>{bomEvent.BP_Description}</p>*/}
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* this is the blue banner bar */}
    <div className="full-row light-blue">
        <div className="container-fluid">
          <div className="row text-white pt-3 mb-0 event-highlights">
            <div className="col-md-4 col pt-3 pb-2 right-divide">
              <h6>Location</h6>
              <p>{bomEvent.BP_Address}</p>
            </div>
            <div className="col-md-4 col pt-3 pb-2 right-divide">
              <h6>Dates</h6>
              { bomEvent.BP_ShowDateOnly ? 
              <p>{dateFormat(bomEvent.BP_StartDate, "dddd, mmmm dS, yyyy") + " - " + dateFormat(bomEvent.BP_EndDate, "dddd, mmmm dS, yyyy")}</p>
              :
              <p>{dateFormat(bomEvent.BP_StartDate, "dddd, mmmm dS, yyyy, h:MM:ss TT") + " - " + dateFormat(bomEvent.BP_EndDate, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</p>}
            </div>
            <div className="col-md-4 col pt-3 pb-2 right-divide">
              <h6> Costs</h6>
              <p>Travel, Vehicle Rental and Some Food Costs</p>
            </div>
          </div>
        </div>
      </div>
      {/* End Blue Banner Bar*/}
      {/* White Banner Bar */}
      <div className="full-row white">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12"> 
            { bomEvent.BP_Reserved ? 
            <div>
                <span className="reserved-label">Reserved</span><span className="reserved-copy">{bomEvent.BP_ReservedText}</span>
            </div>
            : 
            <div>

            </div> }
              
            </div>
          </div>
        </div>
      </div>
      {/* End White Banner Bar*/}
      {/* Event Details Desc*/}
      <div className="full-row white">
        <div className="container-fluid">
          <div className="row justify-content-between pt-4 pb-4">
            <div className="col-md-8 pb-3">
            {<div dangerouslySetInnerHTML={{ __html: dompurify.sanitize(bomEvent?.BP_Description) }} /> }
            </div>
            <div className="col-md-3 pb-3">
                { bomEvent.BP_NCBMManaged ? 
              <div><h6>Contact</h6>
              <p>{bomEvent.BP_Coordinator}<br/>
                { bomEvent.ShowCoordinatorEmail ? <Link to="mailto:mabernathy@ncbaptist.org">mabernathy@ncbaptist.org</Link> : "" } <br/>
                { bomEvent.ShowCoordinatorPhone ? "(919) 459-5607" : "" } </p>
              <p>{bomEvent.BP_Administrator}<br/>
                {bomEvent.BP_ShowAdministratorEmail ? <Link to="mailto:mcrawford@ncbaptist.org">mcrawford@ncbaptist.org</Link> : "" }
                {bomEvent.BP_ShowAdministratorPhone ? "Admin Phone Number" : "" }</p>
                </div>
                :
                <div><h6>Contact</h6>
              <p>{bomEvent.BP_ContactName}<br/>
                <Link to={"mailto:" + bomEvent.BP_ContactEmail}>{bomEvent.BP_ContactEmail}</Link><br/>
                {bomEvent.BP_ContactPhone} </p>
                <small>This event is not managed by NCBM.  If you have any questions please contact the email address or phone number above.</small>
                </div> }
            </div>
          </div>
        </div>
      </div>
      {/* End Event Details Desc*/}
    <div className="container-fluid">
      { registrations.map(reg =>
                    <RegistrationTile key={reg.RegistrationID} Registration={reg} Event={bomEvent}/>
                )}
    </div>
  </div>
         ) 
}



export default EventDetails;