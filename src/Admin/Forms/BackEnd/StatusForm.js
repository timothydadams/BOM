import React, { useState, useEffect } from "react"
import { useSnackbar } from 'notistack';
import useFormFields from "../../../Components/Hooks/useFormFields"
import Select from 'react-select'
import axios from "axios"
import {useParams} from "react-router-dom"

export default function StatusForm(){
  const [fields, handleFieldChange] = useFormFields({
    title: '',
    partnership: '',
    accountingcode: '',
    categories:'',
    address:'',
    startdate:'',
    enddate:'',
    showdate:0,
    showendtime:0,
    datesflexible:0,
    overnight:'',
    genderrestrictions:'No Restrictions',
    agerestrictionsbetween:'',
    agerestrictionsdays:'',
    description:''
  });

  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const eventid = params.eventid;
  console.log(params.eventid);
    // const [title, setTitle]= useState();
  const [partnership, setPartnership]= useState();
  const [accountingcode, setAccountingCode]= useState();
  const [categories, setCategories]= useState();
    // const [address, setAddress]= useState();
    // const [startdate, setStartDate]= useState();
    // const [enddate, setEndDate]= useState();
    // const [showdate, setShowDate]= useState();
    // const [showendtime, setShowEndTime]= useState();
    // const [dateflexible, setDatesFlexible]= useState();
    // const [overnight, setOvernight]= useState();
    // const [genderrestrictions, setGenderRestrictions]= useState();
    // const [agerestrictionsbetween, setAgeRestrictionsBetween]= useState();
    // const [agerestrictionsdays, setAgeRestrictionsDays]= useState();
    // const [description, setDescription]= useState();

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try{
            const result = await axios(
              'https://bomreactapi.azurewebsites.net/events/geteventinfo/' + eventid,
            );
          //setFieldsData(result.data);
          enqueueSnackbar('Events fetch success');
        }
          catch(error){
          setError(true)
          //enqueueSnackbar('Event fetch failed');
        }
   
        
        setIsLoading(false);
        //console.log(data);
      };

      fetchData();
  }, []);

  //setFieldsData(data){
    
  //}
      //function setFieldsData(data){
        //set data in form
      //}

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
    //build lists for dropdown selects
    const categoriesList = [{ value: "Adult Co-ed Program", label: "Adult Co-ed Program" }, { value:"Adult Events",label:"Adult Events"}];
    const partnershipsList = [{ value: "Agriculture", label: "Agriculture" }, { value:"Alaska",label:"Alaska"}];
    const accountingCodesList = [{ value: "Agriculture", label: "Agriculture" }, { value:"Alaska",label:"Alaska"}];
    const eventTabs = [{title: 'General', value: 'General'}, {title:'Registration', value: 'Registration'}, {title:'Optional Costs', value: 'Optional Costs'}, {title:'Status', value: 'Status'}];
  
  
    const handleSubmit = async e => {
    e.preventDefault();
    
    //had to set fields to individual fields for value because they don't work without that
    fields.accountingcode = accountingcode;
    fields.partnership = partnership;
    fields.categories = categories;
    alert(JSON.stringify(fields));

    //send save request to api
    fetch('https://bomreactapi.azurewebsites.net/events/saveevent', {
        method: 'POST',
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(fields)
      }).then(function(response) {
        console.log(response);
        enqueueSnackbar('Event Saved');
        return response.json();
      });
  }


return (
<form onSubmit={handleSubmit}>
  <div className="eventTabs">  
  <ul className="nav nav-pills"> 
    {eventTabs.map(d => (<li className="nav-item"><a className="nav-link" href={d.title}>{d.title}</a></li> ))}  
  </ul>
  </div>
<div className="full-row white">
<div className="container-fluid">
  <div className="row mt-5">
    <div className="col-md-6">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Title_lb" className="required-caption" htmlFor="m_c_ctl02_BP_Title_txtText">Title</label>
        <input name="m$c$ctl02$BP_Title$txtText" type="text" maxLength="200" id="title" className="form-control" placeholder="Title" value={fields.title} onChange={handleFieldChange} />
        <small className="form-text text-muted">Event display title. Cannot contain any special characters.</small> 
      </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Partnership_lb" className="required-caption" htmlFor="m_c_ctl02_BP_Partnership_drpSingleSelect">Partnership</label>
        <Select placeholder="Select Partnership" options={partnershipsList} name="m$c$ctl02$BP_Partnership$drpSingleSelect" id="partnership" className="DropDownField" value={partnership} onChange={setPartnership} />
        <small className="form-text text-muted">Select partnership if event is associated with one.</small> </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label id="m_c_ctl02_BP_AccountingCode_lb" className="required-caption" htmlFor="m_c_ctl02_BP_AccountingCode_dropDownList">Accounting Code</label>
        <Select placeholder="Select Accounting Code" options={accountingCodesList} name="m$c$ctl02$BP_AccountingCode$dropDownList" id="accountingcode" className="DropDownField" value={accountingcode} onChange={setAccountingCode} />
        <small className="form-text text-muted">This is used for accounts receivables to apply the money to this event.</small> </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Categories_lb" className="control-label editing-form-label" htmlFor="">Categories</label>
        <Select placeholder="Select Categories" options={categoriesList} isMulti id="categories" value={categories} onChange={setCategories}/>
        <small className="form-text text-muted">Select one or more categories.</small> </div>
    </div>
    <div className="col-md-12">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Address_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_Address_txtText">Address</label>
        <input name="m$c$ctl02$BP_Address$txtText" type="text" id="address" className="form-control controls BPAddressControl pac-target-input" value={fields.address} onChange={handleFieldChange}/>
        <small className="form-text text-muted">Provide event location.</small> </div>
    </div>
    <div className="col-md-6">
      <label id="m_c_ctl02_BP_StartDate_lb" className="required-caption" htmlFor="m_c_ctl02_BP_StartDate_timePicker_txtDateTime">Event Start Date/Time</label>
      <input type="text" className="form-control datetimepicker-input" id="startdate" data-toggle="datetimepicker" data-target="#datetimepicker1" value={fields.startdate} onChange={handleFieldChange}/>
      <small className="form-text text-muted">Enter the event start date/time.</small> </div>
    <div className="col-md-6">
      <label id="m_c_ctl02_BP_EndDate_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_EndDate_timePicker_txtDateTime">Event End Date/Time</label>
      <input type="text" className="form-control datetimepicker-input" id="enddate" data-toggle="datetimepicker" data-target="#datetimepicker2" value={fields.enddate} onChange={handleFieldChange}/>
      <small className="form-text text-muted">Enter the event end date/time.</small> </div>
    <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Show Date Only</label>
      <div className="form-check">
        <input id="showdate" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={fields.showdate} onChange={handleFieldChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, the date will only be shown.</small> </div>
    <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowEndTime_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowEndTime_checkbox">Show End Date</label>
      <div className="form-check">
        <input id="showendtime" type="checkbox" name="m$c$ctl02$BP_ShowEndTime$checkbox" value={fields.showendtime} onChange={handleFieldChange}/>
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, the end date will show to users.</small> </div>
    <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_DatesFlexible_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_DatesFlexible_checkbox">Dates Flexible</label>
      <div className="form-check">
        <input id="datesflexible" type="checkbox" name="m$c$ctl02$BP_DatesFlexible$checkbox" value={fields.datesflexible} onChange={handleFieldChange}/>
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, allows attendee to select dates.</small> </div>
    <div className="col-md-6 mt-3">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Overnight_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_Overnight_dropDownList">Overnight</label>
        <select name="m$c$ctl02$BP_Overnight$dropDownList" id="overnight" className="DropDownField form-control" value={fields.overnight} onChange={handleFieldChange}>
          <option value="(none)">(none)</option>
          <option value="Overnight">Overnight</option>
          <option value="Day">Day</option>
        </select>
        <small className="form-text text-muted">If selected, this choice will display under the event details.</small> </div>
    </div>
    <div className="col-md-6 mt-3">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Gender_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_Gender_dropDownList">Gender Restrictions:</label>
        <select name="m$c$ctl02$BP_Gender$dropDownList" id="genderrestrictions" className="DropDownField form-control" value={fields.genderrestrictions} onChange={handleFieldChange}>
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
            <input name="m$c$ctl02$BP_AgeGradeRestrictions$txtBetween" type="text" id="agerestrictionsbetween" className="form-control" value={fields.agerestrictionsbetween} onChange={handleFieldChange}/>
          </div>
          <div className="col-2 text-center">to</div>
          <div className="col-5">
            <input name="m$c$ctl02$BP_AgeGradeRestrictions$txtDays" type="text" id="agerestrictionsdays" className="form-control" value={fields.agerestrictionsdays} onChange={handleFieldChange}/>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-12">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Description_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_Description_editor">Event Description:</label>
        <textarea id="description" value={fields.description} onChange={handleFieldChange}></textarea>
        <small className="form-text text-muted">Enter a short description/overview for this event.</small> </div>
    </div>
  </div>
</div>
<input type="submit" value="Submit" />
</div>

</form>
    );
  }


