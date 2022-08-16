import React, { useState, useEffect, Component } from "react"
import { useSnackbar } from 'notistack';
import useFormFields from "../../../Components/Hooks/useFormFields"
import Select from 'react-select'
import axios from "axios"
import {useParams, NavLink} from "react-router-dom"
import ReactInputDateMask from 'react-input-date-mask';
//import { authHeader } from '../../Components/Authentication/authHeader'
//import { arrayExpression } from "@babel/types";

export default function OptionalCostsForm(){
  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [bomEvent, setFields] = useState({
    EventsID: 0,
    BP_Title: '',
    BP_Partnership: '',
    BP_AccountingCode: '',
    BP_Categories:null,
    BP_Address:'',
    BP_StartDate:'',
    BP_EndDate:'',
    BP_ShowDateOnly:false,
    BP_ShowEndTime:false,
    BP_DatesFlexible:false,
    BP_Overnight:'',
    BP_Gender:'No Restrictions',
    BP_AgeGradeRestrictions:'',
    BP_AgeGrade:'',
    BP_Description:''
  });

  const params = useParams();
  const [contentLoaded, setContentLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const eventid = params.eventid;
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try{
            const result = await axios(
              'https://bomreactapi.azurewebsites.net/api/events/geteventsinfo?eventid=' + eventid,
            );
          //alert(JSON.stringify(fields));
          //console.log(JSON.stringify(result.data));
          if(result.data)
          {
            setFields(result.data);
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
    const categoriesList = [{ value: 68, label: "Adult Co-ed Program" }, { value:65,label:"Adult Events"}];
    const partnershipsList = [{ value: "Agriculture", label: "Agriculture" }, { value:"Alaska",label:"Alaska"}];
    const accountingCodesList = [{ value: "Guatemala", label: "Guatemala" }, { value:"Alaska",label:"Alaska"}];
    const eventTabs = [{title: 'General', value: 'General'}, {title:'Registration', value: 'Registration'}, {title:'Optional Costs', value: 'Optional Costs'}, {title:'Status', value: 'Status'}];
  

    const handleCategoriesChange = option => {
     console.log(option);
     setFields({...bomEvent, BP_Categories: option});
     console.log(JSON.stringify(bomEvent.BP_Categories));
    }
    
    const handlePartnershipsChange = input => {
      console.log(input);
      setFields({...bomEvent, BP_Partnership: input.value});
      //setFields({ ['BP_Partnership']: input.value});
    }

    const handleAccountingCodesChange = input => {
      console.log(input);
      setFields({...bomEvent, BP_AccountingCode: input.value});
      //setFields({ ['BP_AccountingCode']: input.value});
    }

    function handleCheckboxChange(input){
      const target = input.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;
        console.log(name,value);
        setFields({...bomEvent,
          [name]: value
        });
    }

    //handlefieldchange
    function handleFieldChange(input){
        const target = input.target;
        const value = target.value;
        const name = target.id;
        console.log(name,value);
        setFields({...bomEvent,
          [name]: value
        });
    }

    const handleCancel = async e => {
      console.log('cancel');

    }
  
    const handleSubmit = async e => {
        e.preventDefault();

        console.log(JSON.stringify(bomEvent));

        let response = await axios.post('https://bomreactapi.azurewebsites.net/api/events/save', bomEvent )
        
        if (response) {
          //get new token stuff
          enqueueSnackbar("Event Saved");
        } else {
          enqueueSnackbar(error.message);
        }

  }


return (
<form onSubmit={handleSubmit}>
{console.log(bomEvent.BP_StartDate)}
{console.log(bomEvent.BP_EndDate)}
<div className="full-row white">
<div className="container-fluid">
<div className="row">
  <div className="eventTabs">  
  <ul className="nav nav-pills" > 
    {eventTabs.map(d => (<li className="nav-item"><NavLink className="nav-link" to={ eventid != undefined ? d.title + '/' + eventid : ''}>{d.title}</NavLink></li> ))}  
  </ul>
  </div>
  </div>
  </div>
  </div>
  <div className="full-row gray">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 text-white py-1"><a className="button-default button-green" onClick={handleSubmit}>Save</a><a className="button-default button-gray mx-3" href='/events' >Cancel</a></div>
      </div>
    </div>
  </div>
<div className="full-row white">
<div className="container-fluid">
  <div className="row mt-5">
    <div className="col-md-6">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Title_lb" className="required-caption" htmlFor="m_c_ctl02_BP_Title_txtText">Title</label>
        <input name="m$c$ctl02$BP_Title$txtText" type="text" maxLength="200" id="BP_Title" className="form-control" placeholder="Title" value={bomEvent.BP_Title} onChange={handleFieldChange} />
        <small className="form-text text-muted">Event display title. Cannot contain any special characters.</small> 
      </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Partnership_lb" className="required-caption" htmlFor="m_c_ctl02_BP_Partnership_drpSingleSelect">Partnership</label>
        <Select placeholder="Select Partnership" options={partnershipsList} name="m$c$ctl02$BP_Partnership$drpSingleSelect" id="BP_Partnership" className="DropDownField" value={partnershipsList.find(item => item.value === bomEvent.BP_Partnership)} onChange={handlePartnershipsChange} />
        <small className="form-text text-muted">Select partnership if event is associated with one.</small> </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label id="m_c_ctl02_BP_AccountingCode_lb" className="required-caption" htmlFor="m_c_ctl02_BP_AccountingCode_dropDownList">Accounting Code</label>
        <Select placeholder="Select Accounting Code" options={accountingCodesList} name="m$c$ctl02$BP_AccountingCode$dropDownList" id="BP_AccountingCode" className="DropDownField" value={accountingCodesList.find(item => item.value === bomEvent.BP_AccountingCode)} onChange={handleAccountingCodesChange} />
        <small className="form-text text-muted">This is used for accounts receivables to apply the money to this event.</small> </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Categories_lb" className="control-label editing-form-label" htmlFor="">Categories</label>
        <Select name="BP_Categories" placeholder="Select Categories" options={categoriesList} isMulti id="BP_Categories" value={bomEvent.BP_Categories} onChange={handleCategoriesChange}/>
        <small className="form-text text-muted">Select one or more categories.</small> </div>
    </div>
    <div className="col-md-12">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Address_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_Address_txtText">Address</label>
        <input name="m$c$ctl02$BP_Address$txtText" type="text" id="BP_Address" className="form-control controls BPAddressControl pac-target-input" value={bomEvent.BP_Address} onChange={handleFieldChange}/>
        <small className="form-text text-muted">Provide event location.</small> </div>
    </div>
    <div className="col-md-6">
      <label id="m_c_ctl02_BP_StartDate_lb" className="required-caption" htmlFor="m_c_ctl02_BP_StartDate_timePicker_txtDateTime">Event Start Date/Time</label>
      <ReactInputDateMask className="form-control" id="BP_StartDate" mask='dd/mm/yyyy' showMaskOnHover={false} value={bomEvent.BP_StartDate} onChange={handleFieldChange}/>
      <small className="form-text text-muted">Enter the event start date/time.</small> </div>
    <div className="col-md-6">
      <label id="m_c_ctl02_BP_EndDate_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_EndDate_timePicker_txtDateTime">Event End Date/Time</label>
      <ReactInputDateMask className="form-control" id="BP_EndDate" mask='dd/mm/yyyy' showMaskOnHover={false} value={bomEvent.BP_EndDate} onChange={handleFieldChange}/>
      <small className="form-text text-muted">Enter the event end date/time.</small> </div>
    <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Show Date Only</label>
      <div className="form-check">
        <input id="BP_ShowDateOnly" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={bomEvent.BP_ShowDateOnly}  onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, the date will only be shown.</small> </div>
    <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowEndTime_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowEndTime_checkbox">Show End Date</label>
      <div className="form-check">
        <input id="BP_ShowEndTime" type="checkbox" name="m$c$ctl02$BP_ShowEndTime$checkbox" value={bomEvent.BP_ShowEndTime}  onChange={handleCheckboxChange}/>
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, the end date will show to users.</small> </div>
    <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_DatesFlexible_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_DatesFlexible_checkbox">Dates Flexible</label>
      <div className="form-check">
        <input id="BP_DatesFlexible" type="checkbox" name="m$c$ctl02$BP_DatesFlexible$checkbox" value={bomEvent.BP_DatesFlexible}  onChange={handleCheckboxChange}/>
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, allows attendee to select dates.</small> </div>
    <div className="col-md-6 mt-3">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Overnight_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_Overnight_dropDownList">Overnight</label>
        <select name="m$c$ctl02$BP_Overnight$dropDownList" id="BP_Overnight" className="DropDownField form-control" value={bomEvent.BP_Overnight} onChange={handleCheckboxChange}>
          <option value="(none)">(none)</option>
          <option value="Overnight">Overnight</option>
          <option value="Day">Day</option>
        </select>
        <small className="form-text text-muted">If selected, this choice will display under the event details.</small> </div>
    </div>
    <div className="col-md-6 mt-3">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Gender_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_Gender_dropDownList">Gender Restrictions:</label>
        <select name="m$c$ctl02$BP_Gender$dropDownList" id="BP_Gender" className="DropDownField form-control" value={bomEvent.BP_Gender} onChange={handleFieldChange}>
          <option value="(none)">(none)</option>
          <option value="No Restrictions">No Restrictions</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <small className="form-text text-muted">If selected, this restriction will display under the event details.</small> </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label id="m_c_ctl02_BP_AgeGradeRestrictions_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_AgeGradeRestrictions_txtBetween">Range for Valid Ages or Grades</label>
        <div className="row">
          <div className="col-5">
            <input name="m$c$ctl02$BP_AgeGradeRestrictions$txtBetween" type="text" id="BP_AgeGradeRestrictions" className="form-control" value={bomEvent.BP_AgeGradeRestrictions} onChange={handleFieldChange}/>
          </div>
          <div className="col-2 text-center">to</div>
          <div className="col-5">
            <input name="m$c$ctl02$BP_AgeGradeRestrictions$txtDays" type="text" id="BP_AgeGrade" className="form-control" value={bomEvent.BP_AgeGrade} onChange={handleFieldChange}/>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-12">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Description_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_Description_editor">Event Description:</label>
        <textarea id="BP_Description" value={bomEvent.BP_Description} onChange={handleFieldChange}></textarea>
        <small className="form-text text-muted">Enter a short description/overview for this event.</small> 
      </div>
    </div>
  </div>
</div>
</div>

</form>
    );
  }


