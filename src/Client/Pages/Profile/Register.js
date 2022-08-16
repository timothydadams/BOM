import React, {useState,useEffect} from "react";
import axios from "axios"
import { useHistory, useParams } from 'react-router-dom';
import EventsTile from './EventsTile'
import { useSnackbar } from 'notistack';
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'
import DatePicker from '@mui/lab/DatePicker'
import {useUser} from '../../../Components/Hooks/useUser'


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
  const detailsState = history.location.state;
  const quantity = props.quantity;

  console.log(detailsState);

  const [readyForSignUp, setReadyForSignUp] = useState(false);
  //const testProfileSections = "General,";

  //set and used when team is specified for registration selected
  const [team, setTeam] = useState({
    BPEventID: eventid,
    BPGroupName:'',
    BPGroupSize:0,
    ReturnDate: Date.now,
    DepartureDate:Date.now,
  });

  const oldUserData = useUser();

  const [user, setUser] = useState({
    UserName:oldUserData.User.UserName,
    FirstName:oldUserData.User.FirstName,
    LastName:oldUserData.User.LastName,
    MiddleName:oldUserData.User.MiddleName,
    UserGender:oldUserData.User.UserGender,
    BP_DOB:oldUserData.User.BP_DOB,
    BP_G_Mob_Phone:oldUserData.User.BP_G_Mob_Phone,
    BP_P_Number:oldUserData.User.BP_P_Number,
    BP_P_GivenName:oldUserData.User.BP_P_GivenName,
    BP_P_Nationality:oldUserData.User.BP_P_Nationality,
    BP_P_Surname:oldUserData.User.BP_P_Surname,
    BP_P_DOB:oldUserData.User.BP_P_DOB,
    BP_P_POB:oldUserData.User.BP_P_POB,
    BP_P_Gender:oldUserData.User.BP_P_Gender,
    BP_P_Date_Issued:oldUserData.User.BP_P_Date_Issued,
    BP_P_Date_Exp:oldUserData.User.BP_P_Date_Exp,
    BP_P_Airport:oldUserData.User.BP_P_Airport,
    BP_P_AirportName:oldUserData.User.BP_P_AirportName,
    BP_P_Profession:oldUserData.User.BP_P_Profession,
    BP_C_ChurchName:oldUserData.User.BP_C_ChurchName,
    BP_C_ChurchCity:oldUserData.User.BP_C_ChurchCity,
    BP_C_ChurchState:oldUserData.User.BP_C_ChurchState,
    BP_C_ChurchPhone:oldUserData.User.BP_C_ChurchPhone,
    
  });
  
  const [attendee, setAttendee] = useState({
    BPEventID: 0,
    BPAttendeeFN: '',
    BPAttendeeLN:'',
    BPAttendeeEmail:'',
    BPAttendeePhone:'',
    BPAttendeeAddress:'',
    BPAttendeeAddress2:'',
    BPAttendeeCity:'',
    BPAttendeeState:'',
    BPAttendeeZip:'',
  });


  useEffect(() => {
    const setData = async () => {
      if(oldUserData.User){
        console.log('User Data from UseEffect:', oldUserData.User)
        setUser(oldUserData.User);  
        setContentLoaded(true);
      } 
    };

    //if(!contentLoaded){
      setData();      
    //}
}, []);
  
  async function CheckTeamExists(){
    const result = await axios({
      method: 'post',
      url: 'https://bomreactapi.azurewebsites.net/api/events/checkteamexists',
      data: {
        eventid: eventid
      }
    });
    setTeam(result.data);
    
  }

  async function JoinTeam(){
    const result = await axios({
      method: 'post',
      url: 'https://bomreactapi.azurewebsites.net/api/events/getgroup',
      data: {
          EventID: eventid,
          TeamName: team.BPGroupName, // This is the body part
      }
    });
    if(result.data)
    {
      setTeam(result.data);
      setReadyForSignUp(true);
      console.log(result.data);
      enqueueSnackbar('Team Found');
    }
    else{
      enqueueSnackbar('Your Team Name did not match what we have in our system.');
    }
  }

  async function CreateTeam(){
    console.log(team);
    const result = await axios({
      method: 'post',
      url: 'https://bomreactapi.azurewebsites.net/api/events/creategroup',
      data: {
          Group: team, // This is the body part
      }
    });
    if(result.data){
    setTeam(result.data);
    setReadyForSignUp(true);
    console.log(JSON.stringify(result.data));
    enqueueSnackbar('Team Created');
    }
    else{
      enqueueSnackbar('Something went wrong');
    }
  }

  async function CreateAttendeeFromProfileSections(user){
    const result = await axios({
      method: 'post',
      url: 'https://bomreactapi.azurewebsites.net/api/events/createattendeefromprofile',
      data: {
          eventid: eventid,
          user: user, // This is the body part
      }
    });
    setUser(result.data);
    console.log(result.data);
    enqueueSnackbar('Attendee created added to event');
  }

  async function CreateAttendees(){
    //get registrationForms and loop through to create attendees
    const result = await axios({
      method: 'post',
      url: 'https://bomreactapi.azurewebsites.net/api/events/createattendees',
      data: {
          eventid: eventid,
          attendee: attendee, // This is the body part
      }
    });
    setAttendee(result.data);
    console.log(result.data);
    enqueueSnackbar('Attendee Added to event');
    //history.push('/events/register/thanks/' + eventid, )
  }

  function handleTeamInputChange(input){
    const target = input.target;
    const value = target.value;
    const name = target.id;
    setTeam({...team, [name]: value});
  }

  function handleAttendeeInputChange(input){
    const target = input.target;
    const value = target.value;
    const name = target.id;
    setAttendee({...attendee, [name]: value});
  }

  function handleCheckboxChange(input){
    const target = input.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.id;
      console.log(name,value);
      setUser({...user,
        [name]: value
      });
  }

  function handleDepartureDateChange(value){
    setTeam({...team, DepartureDate: value});
  }

  function handleReturnDateChange(value){
    setTeam({...team, ReturnDate: value});
  }

   //handlefieldchange
   function handleFieldChange(input){
    const target = input.target;
    const value = target.value;
    const name = target.id;
    console.log(name,value);
    setUser({...user,
      [name]: value
    });
}

  return (
<div id="">
  { !detailsState.Registration.AllowGroups && !readyForSignUp ? 
    detailsState.Event.BP_Reserved ? 
    <div className="full-row white">
        <div className="container-fluid">
          <div className="row mt-5">
            <div className="col-md-12">
              <h3>Team Information</h3>
              <p>Please enter the Team name below in order to join the Team.</p>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="required-caption"><span className="required-field">*</span>Team Name</label>
                <input type="text" maxLength="200" className="form-control" placeholder="Enter team name" value={team.BPGroupName} onChange={setTeam()}/>
                <small className="form-text text-muted">Enter a one word team name. For example, your last name, your church name, etc.</small> </div>
            </div>
            <div className="col-md-12">
              <input type="submit" className="btn btn-primary" onClick={JoinTeam} value="Join Team"/>
              </div>
            </div>
        </div>
    </div> : 
    <div className="full-row white">
        <div className="container-fluid">
          <div className="row mt-5">
            <div className="col-md-12">
              <h3>Team Information</h3>
              <p>Please complete the following fields to set up your team.</p>
            </div>
           
      <div className="col-md-6">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        renderInput={(props) => <TextField id='DepartureDate' {...props} />}
        label="Depature Date/Time"
        value={team.DepartureDate}
        onChange={handleDepartureDateChange}
      />
    </LocalizationProvider>
    <small className="form-text text-muted">Enter your team's departure date.</small> 
    </div>
            
    <div className="col-md-6">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        renderInput={(props) => <TextField id='ReturnDate' {...props} />}
        label="Return Date/Time"
        value={team.ReturnDate}
        onChange={handleReturnDateChange}
      />
    </LocalizationProvider>
    <small className="form-text text-muted">Enter your team's return date.</small> 
    </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="required-caption"><span className="required-field">*</span>Team Name</label>
                <input type="text" id='BPGroupName' maxLength="200" className="form-control" placeholder="Enter team name" value={team.BPGroupName} onChange={handleTeamInputChange} />
                <small className="form-text text-muted">Enter a one word team name. For example, your last name, your church name, etc. Your team members will need this team name in order to register.</small> </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="required-caption"><span className="required-field">*</span>Team Size</label>
                <input type="text" id='BPGroupSize' maxLength="200" className="form-control" placeholder="Enter team size" value={team.BPGroupSize} onChange={handleTeamInputChange} />
              </div>
            </div>
            <div className="col-md-12">
              <input type="submit" className="btn btn-primary" onClick={CreateTeam} value="Create Team"/>
              </div>
            </div>
        </div>
    </div>
     : "" }
     { (readyForSignUp)  ? 
    <div className="full-row white">
        <div className="container-fluid">
           {/* handle profile sections if 1, else handle registration fields*/}
           {console.log('Registration Type: ',detailsState.Registration.RegistrationType)}
            { detailsState.Registration.RegistrationType == 1 ? 
            <div className="profileSectionsForm">
              { detailsState.Registration.ProfileSections? 
              <div className="profileSection">
                <p>Please update your profile information using the form below.</p>
                { detailsState.Registration.ProfileSections.includes("General") ?
                  <div className="General">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>First Name</label>
                        <input id="FirstName" type="text" className="form-control" value={user.FirstName} onChange={handleFieldChange} placeholder="Enter First Name"/></div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group">
                          <label>Middle Name</label>
                        <input id="MiddleName" type="text" className="form-control" value={user.MiddleName} onChange={handleFieldChange} placeholder="Enter Middle Name"/></div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group">
                          <label>Last Name</label>
                        <input id="LastName" type="text" className="form-control" value={user.LastName} onChange={handleFieldChange} placeholder="Enter Last Name"/></div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group">
                          <label>Mobile Phone</label>
                        <input id="BP_G_Mob_Phone" type="text" className="form-control" value={user.BP_G_Mob_Phone} onChange={handleFieldChange} placeholder="Enter Phone Number"/></div>
                      </div>
                  </div>
                : ""}

              { detailsState.Registration.ProfileSections.includes("Health") ?
                  <div className="Health">
                    
                  </div>
                : ""}

              { detailsState.Registration.ProfileSections.includes("Insurance") ?
                  <div className="Insurance">
                    
                  </div>
                : ""}

              { detailsState.Registration.ProfileSections.includes("Passport") ?
                  <div className="Passport">
                    <div className="col-md-6">
                        <div className="form-group">
                          <label>Passport Number</label>
                        <input id="BP_P_Number" type="text" className="form-control" value={user.BP_P_Number} onChange={handleFieldChange} placeholder="Enter Passport Number"/></div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group">
                          <label>Given Name</label>
                        <input id="BP_P_GivenName" type="text" className="form-control" value={user.BP_P_GivenName} onChange={handleFieldChange} placeholder="Enter Given Name"/></div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group">
                          <label>Surname</label>
                        <input id="BP_P_Surname" type="text" className="form-control" value={user.BP_P_Surname} onChange={handleFieldChange} placeholder="Enter Surname"/></div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group">
                          <label>Nationality</label>
                        <input id="BP_P_Nationality" type="text" className="form-control" value={user.BP_P_Nationality} onChange={handleFieldChange} placeholder="Enter Nationality"/></div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group">
                          <label>Date of Birth</label>
                        <input id="BP_P_DOB" type="text" className="form-control" value={user.BP_P_DOB} onChange={handleFieldChange} placeholder="Enter Date of Birth"/></div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group">
                          <label>Place of Birth</label>
                        <input id="BP_P_POB" type="text" className="form-control" value={user.BP_P_POB} onChange={handleFieldChange} placeholder="Enter Place of Birth"/></div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group">
                          <label>Gender</label>
                        <input id="BP_P_Gender" type="text" className="form-control" value={user.BP_P_Gender} onChange={handleFieldChange} /></div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group">
                          <label>Date Issued</label>
                        <input id="BP_P_Date_Issued" type="text" className="form-control" value={user.BP_P_Date_Issued} onChange={handleFieldChange} placeholder="Enter Date Issued"/></div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group">
                          <label>Expiration Date</label>
                        <input id="BP_P_Date_Exp" type="text" className="form-control" value={user.BP_P_Date_Exp} onChange={handleFieldChange} placeholder="Enter Expiraton Date"/></div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group">
                          <label>Church Name</label>
                        <input id="BP_P_GivenName" type="text" className="form-control" value={user.BP_P_GivenName} onChange={handleFieldChange} placeholder="Enter Given Name"/></div>
                      </div>
                  </div>
                : ""}

              { detailsState.Registration.ProfileSections.includes("Church") ?
                  <div className="Church">
                    <div className="col-md-6">
                        <div className="form-group">
                          <label>I attend a NC Baptist Church</label>
                        <input id="BP_C_Baptist" type="checkbox" className="form-control" value={user.BP_C_Baptist} onChange={handleCheckboxChange}/></div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group">
                          <label>Church Name</label>
                        <input id="BP_C_ChurchName" type="text" className="form-control" value={user.BP_C_ChurchName} onChange={handleFieldChange} placeholder="Enter Church Name"/></div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group">
                          <label>Church Phone</label>
                        <input id="BP_C_ChurchPhone" type="text" className="form-control" value={user.BP_C_ChurchPhone} onChange={handleFieldChange} placeholder="Enter Church Phone Number"/></div>
                      </div>
                  </div>
                : ""}

                </div>
            :
            
            ""}

            { (readyForSignUp || !detailsState.Registration.AllowGroups) ? 
            <div className="col-md-12">
              <input type="submit" className="btn btn-primary" onClick={CreateAttendeeFromProfileSections} value="Update Info and Sign Up"/>
            </div>
            : ""}


            </div>
            
            
            : <div className="registrationsFields">
                {detailsState.Registration.RegistrationFields?
                  <div className="registrationForms">
                    {/*form goes here*/}
                    { detailsState.Registration.RegistrationFields.includes('BPAttendeeFN') ?
                    <div className="col-md-6">
                      <div className="form-group">
                          <label>First Name</label>
                        <input id="BPAttendeeFN" type="text" className="form-control" value={attendee.BPAttendeeFN} onChange={handleAttendeeInputChange} placeholder="Enter First Name"/></div>
                      </div> 
                      : "" }
                      { detailsState.Registration.RegistrationFields.includes('BPAttendeeLN') ?
                      <div className="col-md-6">
                      <div className="form-group">
                          <label>Last Name</label>
                        <input id="BPAttendeeLN" type="text" className="form-control" value={attendee.BPAttendeeLN} onChange={handleAttendeeInputChange} placeholder="Enter Last Name"/></div>
                      </div>
                      : "" }
                      { detailsState.Registration.RegistrationFields.includes('BPAttendeeEmail') ?
                      <div className="col-md-6">
                      <div className="form-group">
                          <label>Email</label>
                        <input id="BPAttendeeEmail" type="text" className="form-control" value={attendee.BPAttendeeEmail} onChange={handleAttendeeInputChange} placeholder="Enter Email"/></div>
                      </div>
                      : "" }
                      { detailsState.Registration.RegistrationFields.includes('BPAttendeePhone') ?
                      <div className="col-md-6">
                      <div className="form-group">
                          <label>Phone</label>
                        <input id="BPAttendeePhone" type="text" className="form-control" value={attendee.BPAttendeePhone} onChange={handleAttendeeInputChange} placeholder="Enter Phone Number"/></div>
                      </div>
                      : "" }
                      { detailsState.Registration.RegistrationFields.includes('BPAttendeeAddress') ?
                      <div className="col-md-6">
                      <div className="form-group">
                          <label>Address</label>
                        <input id="BPAttendeeAddress" type="text" className="form-control" value={attendee.BPAttendeeAddress} onChange={handleAttendeeInputChange} placeholder="Enter Address"/></div>
                      </div>
                      : "" }
                      { detailsState.Registration.RegistrationFields.includes('BPAttendeeAddress2') ?
                      <div className="col-md-6">
                      <div className="form-group">
                          <label>Address Line 2</label>
                        <input id="BPAttendeeAddress2" type="text" className="form-control" value={attendee.BPAttendeeAddress2} onChange={handleAttendeeInputChange} placeholder="Enter Address Line 2"/></div>
                      </div>
                      : "" }
                      { detailsState.Registration.RegistrationFields.includes('BPAttendeeCity') ?
                      <div className="col-md-6">
                      <div className="form-group">
                          <label>City</label>
                        <input id="BPAttendeeCity" type="text" className="form-control" value={attendee.BPAttendeeCity} onChange={handleAttendeeInputChange} placeholder="Enter City"/></div>
                      </div> 
                      : "" }
                      { detailsState.Registration.RegistrationFields.includes('BPAttendeeState') ?
                      <div className="col-md-6">
                      <div className="form-group">
                          <label>State</label>
                        <input id="BPAttendeeState" type="text" className="form-control" value={attendee.BPAttendeeState} onChange={handleAttendeeInputChange} placeholder="Enter State"/></div>
                      </div> 
                      : "" }
                      { detailsState.Registration.RegistrationFields.includes('BPAttendeeZip') ?
                      <div className="col-md-6">
                      <div className="form-group">
                          <label>Zip</label>
                        <input id="BPAttendeeZip" type="text" className="form-control" value={attendee.BPAttendeeZip} onChange={handleAttendeeInputChange} placeholder="Enter Zip Code"/></div>
                      </div>
                      : "" }
                  <div className="col-md-12">
                    <input type="submit" className="btn btn-primary" onClick={CreateAttendees} value="Sign Up"/>
                  </div>
                  </div>
                : ""}
                
              </div>
              }
        </div>
  </div> : ""}
  </div>
         ) 
}



export default Register;