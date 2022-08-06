import React, { useState, useEffect, useRef } from "react"
import { useSnackbar } from 'notistack'
import Select from 'react-select'
import axios from "axios"
import {useParams , NavLink} from "react-router-dom"
import EventTabs from "../../Events/EventTabs"
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'
import DatePicker from '@mui/lab/DatePicker'
import JoditEditor from "jodit-react"


export default function EventsCreateForm(){
  const editor = useRef(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [categoriesList, setCategoriesList] = useState([]);
  const [partnershipsList, setPartnershipsList] = useState([]);
  const [accountingCodesList, setAccountingCodesList] = useState([]);

  const [bomEvent, setFields] = useState({
    EventsID: 0,
    BP_Title: '',
    BP_Partnership: [partnershipsList[0], partnershipsList[1]],
    BP_AccountingCode: [accountingCodesList[0], accountingCodesList[1]],
    BP_Categories:[categoriesList[0], categoriesList[1]],
    BP_Address:'',
    BP_StartDate:'',
    BP_EndDate:'',
    BP_ShowDateOnly:false,
    BP_ShowEndTime:false,
    BP_DatesFlexible:false,
    BP_Overnight:'',
    BP_Gender:'',
    BP_AgeGradeRestrictions:'',
    BP_AgeGrade:'',
    BP_Description:'',
    BP_NCBMManaged:false,
    BP_ContactName:'',
    BP_ContactEmail:'',
    BP_SendContactAdminEmail:false,
    BP_ContactPhone:'',
    BP_Coordinator:'',
    BP_ShowCoordinatorPhone:false,
    BP_ShowCoordinatorEmail:false,
    BP_SendCoordinatorEmail:false,
    BP_Administrator:'',
    BP_ShowAdministratorPhone:false,
    BP_ShowAdministratorEmail:false,
    BP_SendAdministratorEmail:false,
    BP_ButtonText:'',
    BP_ThankYouMessage:'', 
    BP_PendingApprovalMessage:'',
    BP_ApprovalMessage:'',
    BP_DeniedApprovalMessage:'',
    BP_BGCheckMessage:'',
    BP_RequiredShots:false, 
    BP_Private:false, 
    BP_PrivateURL:'',
    BP_RequireCheckin:false, 
    BP_RequireCheckinPhoto:false,
  });

  const params = useParams();
  const [contentLoaded, setContentLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const eventid = params.eventid;

  const ageGradeRestrictionsList = [{name:"No Restrictions", value:"(none)" }, {name:"Age", value:"Age"}, {name:"Grade", value:"Grade"}]
  const [eventCoordinators, setEventCoordinators] = useState([]);


    useEffect(() => {
      const fetchData = async () => {
        getSupportingLists();
        setIsLoading(true);
      };

      if(!contentLoaded){
        fetchData();
        setContentLoaded(true);        
        setIsLoading(false);
        
      }
      
  }, []);

  
     //getSupporting lists for Categories,Partnerships, and Accounting Codes
     function getSupportingLists(){
        // execute simultaneous requests 
        axios.all([
          axios.get('https://bomreactapi.azurewebsites.net/events/getcategories'),
          axios.get('https://bomreactapi.azurewebsites.net/events/getpartnerships'),
          axios.get('https://bomreactapi.azurewebsites.net/events/getaccountingcodes'),
         // axios.get('https://bomreactapi.azurewebsites.net/events/getcoordinators')
        ])
        .then(responseArr => {
          //this will be executed only when all requests are complete
          setCategoriesList(responseArr[0].data);
          setPartnershipsList(responseArr[1].data);
          setAccountingCodesList(responseArr[2].data);
          //setEventCoordinators(responseArr[3].data);
        });
     }
  

    const handleCategoriesChange = selectedOption => {
      setFields({...bomEvent, BP_Categories : selectedOption });
      const values = selectedOption.map(opt => opt.value).join(',')
      console.log(values)
    }
    
    const handlePartnershipsChange = selectedOption => {
      setFields({...bomEvent, BP_Partnership : selectedOption });
    }

    const handleAccountingCodesChange = selectedOption => {
      setFields({...bomEvent, BP_AccountingCode : selectedOption });
    }

    const handleAgeGradeRestrictionsChange = input=>{
      setFields({...bomEvent, BP_AgeGradeRestrictions: input.value});
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

    function handleStartDateChange(value){
      setFields({...bomEvent, BP_StartDate: value});
    }

    function handleEndDateChange(value){
      setFields({...bomEvent, BP_EndDate: value});
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

    function handleBlurChange(newContent){
      console.log('Content From Description: ', newContent);
      setFields({...bomEvent, BP_Description: newContent});
    }

    const handleCancel = async e => {
      console.log('cancel');

    }
  
    const handleSubmit = async e => {
        e.preventDefault();
        console.log(bomEvent);
        axios.post('https://bomreactapi.azurewebsites.net/events/save', bomEvent )
        .then(response => {
          console.log(response);
          enqueueSnackbar("Event Saved");
        }).catch(err => {
          console.log(err);
          enqueueSnackbar(error.message);
        })
  }


return (
<form onSubmit={handleSubmit}>
<div className="full-row white">
<div className="container-fluid">
<div className="row">
  <div className="eventTabs">  
  <ul className="nav nav-pills" > 
    {EventTabs?.map(d => (<li className="nav-item"><NavLink className="nav-link" to={ eventid != undefined ? '/admin/events/' + d.name + '/' + eventid : ''}>{d.name}</NavLink></li> ))}  
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
        <Select placeholder="Select Partnership" options={partnershipsList} getOptionLabel={options=>options["Name"]} getOptionValue={options=>options["ItemID"]} name="m$c$ctl02$BP_Partnership$drpSingleSelect" id="BP_Partnership" className="DropDownField" value={partnershipsList.find(item => item.value == bomEvent.BP_Partnership)} onChange={handlePartnershipsChange} />
        <small className="form-text text-muted">Select partnership if event is associated with one.</small> </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label id="m_c_ctl02_BP_AccountingCode_lb" className="required-caption" htmlFor="m_c_ctl02_BP_AccountingCode_dropDownList">Accounting Code</label> 
        <Select placeholder="Select Accounting Code" options={accountingCodesList} getOptionLabel={options=>options["Name"]} getOptionValue={options=>options["ItemID"]} name="m$c$ctl02$BP_AccountingCode$dropDownList" id="BP_AccountingCode" className="DropDownField" value={accountingCodesList.find(item => item.value == bomEvent.BP_AccountingCode)} onChange={handleAccountingCodesChange} />
        <small className="form-text text-muted">This is used for accounts receivables to apply the money to this event.</small> </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Categories_lb" className="control-label editing-form-label" htmlFor="">Categories</label>
        <Select name="BP_Categories" placeholder="Select Categories" getOptionLabel={options=>options["CategoryDisplayName"]} getOptionValue={options=>options["CategoryID"]} options={categoriesList} isMulti id="BP_Categories" value={bomEvent.BP_Categories} onChange={handleCategoriesChange}/>
        <small className="form-text text-muted">Select one or more categories.</small> </div>
    </div>
    <div className="col-md-12">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Address_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_Address_txtText">Address</label>
        <input name="m$c$ctl02$BP_Address$txtText" type="text" id="BP_Address" className="form-control controls BPAddressControl pac-target-input" value={bomEvent.BP_Address} onChange={handleFieldChange}/>
        <small className="form-text text-muted">Provide event location.</small> </div>
    </div>

    <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Show Date Only</label>
      <div className="form-check">
        <input id="BP_ShowDateOnly" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={bomEvent.BP_ShowDateOnly} checked={bomEvent.BP_ShowDateOnly}  onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, the date will only be shown.</small> </div>
   
      { bomEvent.BP_ShowDateOnly === true ? 
      <div className='row'>
       <div className="col-md-6">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        renderInput={(props) => <TextField id='BP_StartDate' {...props} />}
        label="Event Start Date/Time"
        value={bomEvent.BP_StartDate}
        onChange={handleStartDateChange}
      />
    </LocalizationProvider>
    <small className="form-text text-muted">Enter the event start date/time.</small> </div>
  <div className="col-md-6">
  <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        renderInput={(props) => <TextField id='BP_EndDate' {...props} />}
        label="Event End Date/Time"
        value={bomEvent.BP_EndDate}
        onChange={handleEndDateChange}
      />
    </LocalizationProvider>
    <small className="form-text text-muted">Enter the event end date/time.</small> </div>
    </div>
     : 
     <div className='row'>
     <div className="col-md-6">
     <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => <TextField id='BP_StartDate' {...props} />}
          label="Event Start Date/Time"
          value={bomEvent.BP_StartDate}
          onChange={handleStartDateChange}
        />
      </LocalizationProvider>
      <small className="form-text text-muted">Enter the event start date/time.</small> </div>
    <div className="col-md-6">
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => <TextField id='BP_EndDate' {...props} />}
          label="Event End Date/Time"
          value={bomEvent.BP_EndDate}
          onChange={handleEndDateChange}
        />
      </LocalizationProvider>
      <small className="form-text text-muted">Enter the event end date/time.</small> </div>
      </div>
     }
      
    <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowEndTime_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowEndTime_checkbox">Show End Date</label>
      <div className="form-check">
        <input id="BP_ShowEndTime" type="checkbox" name="m$c$ctl02$BP_ShowEndTime$checkbox" value={bomEvent.BP_ShowEndTime} checked={bomEvent.BP_ShowEndTime}  onChange={handleCheckboxChange}/>
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, the end date will show to users.</small> </div>
    <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_DatesFlexible_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_DatesFlexible_checkbox">Dates Flexible</label>
      <div className="form-check">
        <input id="BP_DatesFlexible" type="checkbox" name="m$c$ctl02$BP_DatesFlexible$checkbox" value={bomEvent.BP_DatesFlexible} checked={bomEvent.BP_DatesFlexible}  onChange={handleCheckboxChange}/>
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
      <label>Age or Grade Restrictions</label>
      <Select options={ageGradeRestrictionsList} onChange={handleAgeGradeRestrictionsChange} getOptionLabel={options=>options["name"]} getOptionValue={options=>options["value"]} className="DropDownField" value={bomEvent.BP_AgeGradeRestrictions} />
    </div>
    { bomEvent.BP_AgeGradeRestrictions !== '(none)' ? 
    <div className="col-md-6">
      <div className="form-group">
        <label id="m_c_ctl02_BP_AgeGradeRestrictions_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_AgeGradeRestrictions_txtBetween">Range for Valid Ages or Grades</label>
        <div className="row">
          <div className="col-5">
            <input name="m$c$ctl02$BP_AgeGradeRestrictions$txtBetween" type="text" id="BP_AgeGradeRestrictions" className="form-control" value={bomEvent.BP_AgeGrade} onChange={handleFieldChange}/>
          </div>
          <div className="col-2 text-center">to</div>
          <div className="col-5">
            <input name="m$c$ctl02$BP_AgeGradeRestrictions$txtDays" type="text" id="BP_AgeGrade" className="form-control" value={bomEvent.BP_AgeGrade} onChange={handleFieldChange}/>
          </div>
        </div>
      </div>
    </div> : ""}
    <div className="col-md-12">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Description_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_Description_editor">Event Description:</label>
        <JoditEditor id="BP_Description" ref={editor} onChange={handleBlurChange} value={bomEvent.BP_Description} />
        <small className="form-text text-muted">Enter a short description/overview for this event.</small> 
      </div>
    </div>
    <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">NCBM Managed</label>
      <div className="form-check">
        <input id="BP_NCBMManaged" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={bomEvent.BP_NCBMManaged} checked={bomEvent.BP_NCBMManaged}   onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, this event will be managed by NCBM.</small> 
    </div>
    { 
    bomEvent.BP_NCBMManaged ? 
    <div>
      <div className="col-md-6 mt-3">
        <label>NCBM Coordinator</label>
        <Select options={eventCoordinators} />
      </div>
      <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Show Coordinator Email</label>
      <div className="form-check">
        <input id="BP_ShowCoordinatorEmail" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={bomEvent.BP_ShowCoordinatorEmail}  checked={bomEvent.BP_ShowCoordinatorEmail} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, the coordinators email will show up for front end users.</small> 
    </div>
    <div className="col-md-4 mt-3">
    <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Show Coordinator Phone</label>
    <div className="form-check">
      <input id="BP_ShowCoordinatorPhone" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={bomEvent.BP_ShowCoordinatorPhone} checked={bomEvent.BP_ShowCoordinatorPhone}  onChange={handleCheckboxChange} />
      <label className="form-check-label" htmlFor="gridCheck1"></label>
    </div>
    <small className="form-text text-muted">If checked, the coordinators phone number will show up for front end users.</small> 
  </div>
  <div className="col-md-4 mt-3">
  <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Send Coordinator Email</label>
  <div className="form-check">
    <input id="BP_SendCoordinatorEmail" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={bomEvent.BP_SendCoordinatorEmail} checked={bomEvent.BP_SendCoordinatorEmail} onChange={handleCheckboxChange} />
    <label className="form-check-label" htmlFor="gridCheck1"></label>
  </div>
  <small className="form-text text-muted">If checked, emails will be sent to the coordinator when users sign up.</small> 
</div>
<div className="col-md-4 mt-3">
        <label>NCBM Adminstrator</label>
        <Select options={eventCoordinators} />
  </div>    
  <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Show Administrator Email</label>
      <div className="form-check">
        <input id="BP_ShowAdministratorEmail" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={bomEvent.BP_ShowAdministratorEmail} checked={bomEvent.BP_ShowAdministratorEmail}  onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, the administrators email will show up for front end users.</small> 
    </div>
    <div className="col-md-4 mt-3">
    <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Show Administrator Phone</label>
    <div className="form-check">
      <input id="BP_ShowAdministratorPhone" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={bomEvent.BP_ShowAdministratorPhone} checked={bomEvent.BP_ShowAdministratorPhone}  onChange={handleCheckboxChange} />
      <label className="form-check-label" htmlFor="gridCheck1"></label>
    </div>
    <small className="form-text text-muted">If checked, the administrators phone number will show up for front end users.</small> 
  </div>
  <div className="col-md-4 mt-3">
  <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Send Administrator Email</label>
  <div className="form-check">
    <input id="BP_SendAdministratorEmail" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={bomEvent.BP_SendAdministratorEmail} checked={bomEvent.BP_SendAdministratorEmail}  onChange={handleCheckboxChange} />
    <label className="form-check-label" htmlFor="gridCheck1"></label>
  </div>
  <small className="form-text text-muted">If checked, emails will be sent to the administrator when users sign up.</small> 
</div>
</div>
    : 
    <div>
      <div className="col-md-4 mt-3">
        <div className="form-group">
        <label id="m_c_ctl02_BP_Address_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_Address_txtText">Contact Name</label>
        <input name="m$c$ctl02$BP_Address$txtText" type="text" id="BP_ContactName" className="form-control controls BPAddressControl pac-target-input" value={bomEvent.BP_ContactName} onChange={handleFieldChange}/>
        <small className="form-text text-muted">Provide contact name.</small> </div>
      </div>
      <div className="col-md-4 mt-3">
        <div className="form-group">
        <label id="m_c_ctl02_BP_Address_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_Address_txtText">Contact Phone</label>
        <input name="m$c$ctl02$BP_Address$txtText" type="text" id="BP_ContactPhone" className="form-control controls BPAddressControl pac-target-input" value={bomEvent.BP_ContactPhone} onChange={handleFieldChange}/>
        <small className="form-text text-muted">Provide contact phone number.</small> </div>
      </div>
      <div className="col-md-4 mt-3">
        <div className="form-group">
        <label id="m_c_ctl02_BP_Address_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_Address_txtText">Contact Email</label>
        <input name="m$c$ctl02$BP_Address$txtText" type="text" id="BP_ContactEmail" className="form-control controls BPAddressControl pac-target-input" value={bomEvent.BP_ContactEmail} onChange={handleFieldChange}/>
        <small className="form-text text-muted">Provide contact email.</small> </div>
      </div>
      <div className="col-md-4 mt-3">
        <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Send Contact Admin Email</label>
        <div className="form-check">
          <input id="BP_SendContactAdminEmail" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={bomEvent.BP_SendContactAdminEmail} checked={bomEvent.BP_SendContactAdminEmail}  onChange={handleCheckboxChange} />
          <label className="form-check-label" htmlFor="gridCheck1"></label>
        </div>
        <small className="form-text text-muted">If checked, emails will be sent to the contact administrator for this event.</small> 
      </div>
    </div>
    }
  </div>
</div>
</div>

</form>
    );
  }


