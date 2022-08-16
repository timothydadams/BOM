import React, { useState, useEffect, Component } from "react"
import { useSnackbar } from 'notistack';
import useFormFields from "../../../Components/Hooks/useFormFields"
import Select from 'react-select'
import axios from "axios"
import {useParams} from "react-router-dom"
import ReactInputDateMask from 'react-input-date-mask';
//import { arrayExpression } from "@babel/types";

export default function EventsEditForm(){
  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [bomUser, setFields] = useState({
    UserID: 0,
    UserName: '',
    FirstName: '',
    LastName: '',
    Email:'',
    Phone:'',
    UserLastModified:'',
    MiddleName:'',
    FullName:'',
    UserEnabled:true,
    BP_DOB:'',
    BP_SubscribeNews:false,
    BP_SubscribeMag:false,
    UserIsEditor:false,
    UserIsGlobalAdministrator:false,
    UserCreated:'',
    UserGUID:'',
    Privilege:0,
  });

  const params = useParams();
  const [contentLoaded, setContentLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const userid = params.userid;
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try{
            const result = await axios(
              'https://bomreactapi.azurewebsites.net/api/users/getusersinfo?userid=' + userid,
            );
          //alert(JSON.stringify(fields));
          //console.log(JSON.stringify(result.data));
          if(result.data)
          {
            setFields(result.data);
          }
          //alert(JSON.stringify(fields));
          enqueueSnackbar('User fetch success');
        }
          catch(error){
          setError(true)
          enqueueSnackbar('User fetch failed');
        }        
      };

      if(!contentLoaded){
        getSupportingLists();
        fetchData();
        setContentLoaded(true);        
        setIsLoading(false);
      }
  }, []);

  
     //getSupporting lists for Categories,Partnerships, and Accounting Codes
     function getSupportingLists(){
        // execute simultaneous requests 
        axios.all([
          axios.get('https://api.github.com/users/mapbox'),
          axios.get('https://api.github.com/users/phantomjs'),
          axios.get('https://api.github.com/users/phantomjs')
        ])
        .then(responseArr => {
          //this will be executed only when all requests are complete
          console.log('Date created: ', responseArr[0].data.created_at);
          console.log('Date created: ', responseArr[1].data.created_at);
          console.log('Date created: ', responseArr[2].data.created_at);
        });
     }
   
    //68;65;19;44
    //build lists for dropdown selects
    const privilegeLevelList = [{ value: 0, label: "Normal User" }, { value:1,label:"Editor"}, { value:2, label:"Administrator"}, { value:3, label:"Global Administrator"}];
    const userTabs = [{title: 'General', value: 'General'}, {title:'Settings', value: 'Settings'}, {title:'Roles', value: 'Roles'}, ];

    function handleCheckboxChange(input){
      const target = input.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;
        console.log(name,value);
        setFields({...bomUser,
          [name]: value
        });
    }

    //handlefieldchange
    function handleFieldChange(input){
        const target = input.target;
        const value = target.value;
        const name = target.id;
        console.log(name,value);
        setFields({...bomUser,
          [name]: value
        });
    }

    function handlePrivilegeLevelChange(input){
        console.log(input);
        setFields({...bomUser, Privilege: input.value});
    }

    const handleCancel = async e => {
      console.log('cancel');
      
    }
  
    const handleSubmit = async e => {
        e.preventDefault();

        console.log(JSON.stringify(bomUser));

        axios.post('https://bomreactapi.azurewebsites.net/api/users/save', bomUser)
        //.then(response => console.log(response))
        .then(response => {
          console.log(response);
          enqueueSnackbar("User Saved");
        })
        .catch(error => {
            console.log(error.message);
            enqueueSnackbar(error.message);
        });
  }


return (
<form onSubmit={handleSubmit}>
<div className="full-row white">
<div className="container-fluid">
<div className="row">
  <div className="eventTabs">  
  <ul className="nav nav-pills" > 
    {userTabs.map(d => (<li className="nav-item"><a className="nav-link" href={ userid != undefined ? d.title + '/' + userid : ''}>{d.title}</a></li> ))}  
  </ul>
  </div>
  </div>
  </div>
  </div>
  <div className="full-row gray">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 text-white py-1"><a className="button-default button-green" onClick={handleSubmit}>Save</a><a className="button-default button-gray mx-3" onClick={handleCancel} >Cancel</a></div>
      </div>
    </div>
  </div>
<div className="full-row white">
<div className="container-fluid">
  <div className="row mt-5">
    <div className="col-md-6">
      <div className="form-group">
        <label id="lblUserName" className="required-caption" htmlFor="UserName">User Name</label>
        <input name="UserName" type="email" maxLength="200" id="UserName" className="form-control" placeholder="User Name" value={bomUser.UserName} onChange={handleFieldChange} />
        <small className="form-text text-muted">User Name: must be an email address</small> 
      </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label id="lblFirstName" className="required-caption" htmlFor="FirstName">First Name</label>
        <input type='text' placeholder="First Name" name="FirstName" id="FirstName" className="form-control" value={bomUser.FirstName} onChange={handleFieldChange} />
        <small className="form-text text-muted"></small> </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label id="lblMiddleName" className="required-caption" htmlFor="MiddleName">Middle Name</label>
        <input type='text' placeholder="Middle Name" name="MiddleName" id="MiddleName" className="form-control" value={bomUser.MiddleName} onChange={handleFieldChange} />
        <small className="form-text text-muted"></small> </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
      <label id="lblLastName" className="required-caption" htmlFor="LastName">Last Name</label>
        <input type='text' placeholder="Last Name" name="LastName" id="LastName" className="form-control" value={bomUser.LastName} onChange={handleFieldChange} />
        <small className="form-text text-muted"></small> </div>
    </div>
    <div className="col-md-12">
      <div className="form-group">
      <label id="lblFullName" className="required-caption" htmlFor="FullName">Full Name</label>
        <input type='text' placeholder="Full Name" name="FullName" id="FullName" className="form-control" value={bomUser.FullName} onChange={handleFieldChange} />
        <small className="form-text text-muted"></small> </div>
    </div>
    <div className="col-md-6">
      <label id="lblBP_DOB" className="required-caption" htmlFor="BP_DOB">Date of Birth</label>
      <ReactInputDateMask className="form-control" id="BP_DOB" mask='dd/mm/yyyy' showMaskOnHover={false} value={bomUser.BP_DOB} onChange={handleFieldChange}/>
      <small className="form-text text-muted">Enter the users birth date</small> </div>
    <div className="col-md-6">
      <label id="lblUserLastModified" className="control-label editing-form-label" htmlFor="UserLastModified">User Last Modified</label>
      <ReactInputDateMask className="form-control" id="UserLastModified" mask='dd/mm/yyyy' readOnly={true} showMaskOnHover={false} value={bomUser.UserLastModified} onChange={handleFieldChange}/>
      <small className="form-text text-muted">Last time user was modified</small> </div>
    <div className="col-md-4 mt-3">
      <label id="lblUserEnabled" className="control-label editing-form-label" htmlFor="UserEnabled">User Enabled</label>
      <div className="form-check">
        <input id="UserEnabled" type="checkbox" name="UserEnabled" value={bomUser.UserEnabled}  onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If user is not enabled they won't be able to use the website.</small> </div>
    <div className="col-md-4 mt-3">
      <label id="lblBP_SubscribeNews" className="control-label editing-form-label" htmlFor="BP_SubscribeNews">Subscribed to Newsletter</label>
      <div className="form-check">
        <input id="BP_SubscribeNews" type="checkbox" name="BP_SubscribeNews" value={bomUser.BP_SubscribeNews}  onChange={handleCheckboxChange}/>
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, the user is subscribed to the newsletter</small> </div>
    <div className="col-md-4 mt-3">
      <label id="lblBP_SubscribeMag" className="control-label editing-form-label" htmlFor="BP_SubscribeMag">Subscribed to Magazine</label>
      <div className="form-check">
        <input id="BP_SubscribeMag" type="checkbox" name="BP_SubscribeMag" value={bomUser.BP_SubscribeMag}  onChange={handleCheckboxChange}/>
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, allows attendee to select dates.</small> </div>
      <div className="col-md-6">
      <div className="form-group">
        <label id="lblPrivilege" className="required-caption" htmlFor="Privilege">Privilege Level</label>
        <Select placeholder="Select Privilege Level" options={privilegeLevelList} name="Privilege" id="Privilege" className="DropDownField" value={privilegeLevelList.find(item => item.value === bomUser.Privilege)} onChange={handlePrivilegeLevelChange} />
        <small className="form-text text-muted">Select privilege level for user. This determines what they can access or edit in the site</small> </div>
    </div>
  </div>
</div>
</div>

</form>
    );
  }


