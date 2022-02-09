import React, { useState, useEffect } from "react"
import { useSnackbar } from 'notistack';
import useFormFields from "../../../Components/Hooks/useFormFields"
import Select from 'react-select'
import axios from "axios"
import EventTabs from "../../Events/EventTabs";
import {useParams , NavLink} from "react-router-dom"

export default function RegistrationForm(){
  const [fields, handleFieldChange] = useFormFields({
    Registration : {
    RegistrationName: '',
    RegistrationCost: '',
    RequireSignIn: '',
    RequireBGCheck:'',
    RequireApproval:'',
    AllowGroups:'',
    MaxGroupSize:'',
    SectionLabel:'',
    RegistrationType:0,
    RegistrationFields:0,
    ProfileSections:'',
    RegistrationAllowDeposits:'No Restrictions',
    RegistrationDepositAmount:'',
    RegistrationSKU:'',
    RegistrationCapacity:'',
    RegistrationAllowOverCapacity: '',
    RegistrationDescription:'',
    HasDependencies: false,
    Dependency: 0,
    RequireSupplementalInsurance: false,
    BGCheckType: 0,
    RequireSignature: false,
    ProjectRegistrationType: '',
    RegistrationEnabled: false,
    SupplementalInsuranceType: '',
    HasMembership: false,
    AssociatedMembership: '',
    RegistrationHasDates: false,
    RegistrationStartDate: '',
    RegistrationEndDate: '',
    RegistrationRequiredCost: false,
    RegistrationRequiredCostName: '',
    RegistrationRequiredPrice: 0,
    RegistrationRequiredDescription:'',
    WaiverDR: false,
    RegistrationIninerary:'',
    RegistrationRequiredCostDeposit: 0,
    RegistrationOrder: 0,
    }
  });

  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const eventid = params.eventid;
  console.log(params.eventid);

    
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
    const handleSubmit = async e => {
    e.preventDefault();

    alert(JSON.stringify(fields));

    //send save request to api
    fetch('https://bomreactapi.azurewebsites.net/events/saveregistration', {
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
    {EventTabs.map(d => (<li className="nav-item"><NavLink className="nav-link" to={eventid != undefined ? d.title + '/' + eventid : ''}>{d.title}</NavLink></li> ))}  
  </ul>
  </div>
<div className="full-row white">
<div className="container-fluid">
  <div className="row mt-5">
    <div className="col-md-6">
      <div className="form-group">
        <label id="lblRegistrationOrder" className="required-caption" htmlFor="m_c_ctl02_BP_Title_txtText">Registration Order</label>
        <input name="m$c$ctl02$BP_Title$txtText" type="text" maxLength="200" id="RegistrationOrder" className="form-control" placeholder="Registration Order" value={fields.RegistrationOrder} onChange={handleFieldChange} />
        <small className="form-text text-muted">This will control the order that this registration shows up.</small> 
      </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label id="SectionLabel" className="required-caption" htmlFor="m_c_ctl02_BP_Title_txtText">Section Label</label>
        <input name="m$c$ctl02$BP_Title$txtText" type="text" maxLength="200" id="SectionLabel" className="form-control" placeholder="Section Label" value={fields.SectionLabel} onChange={handleFieldChange} />
        <small className="form-text text-muted">This field will show as the header of the registration form.</small> 
      </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label id="lblRegistrationName" className="required-caption" htmlFor="m_c_ctl02_BP_Title_txtText">Name</label>
        <input name="m$c$ctl02$BP_Title$txtText" type="text" maxLength="200" id="RegistrationName" className="form-control" placeholder="Section Label" value={fields.RegistrationName} onChange={handleFieldChange} />
        <small className="form-text text-muted">Registration title that will be displayed on registration page.</small> 
      </div>
    </div>
    <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Allows Registration</label>
      <div className="form-check">
        <input id="RegistrationEnabled" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={fields.RegistrationEnabled} onChange={handleFieldChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, this registration type will be displayed and collect registrations.</small> </div>
      <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Has Associated Membership</label>
      <div className="form-check">
        <input id="HasMembership" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={fields.HasMembership} onChange={handleFieldChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, the registration can be associated to a membership.</small> </div>
      <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Additional Required Cost</label>
      <div className="form-check">
        <input id="RegistrationRequiredCost" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={fields.RegistrationRequiredCost} onChange={handleFieldChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, a Team Cost or other required cost can be added to the current registration.</small> </div>
      <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Date of Registration is Different than Main Event</label>
      <div className="form-check">
        <input id="RegistrationHasDates" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={fields.RegistrationHasDates} onChange={handleFieldChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, the registration can have different dates than the event itself.</small> </div>
      <div className="col-md-6">
      <div className="form-group">
        <label id="lblRegistrationName" className="required-caption" htmlFor="m_c_ctl02_BP_Title_txtText">Cost</label>
        <input name="m$c$ctl02$BP_Title$txtText" type="text" maxLength="200" id="RegistrationCost" className="form-control" placeholder="Enter Price" value={fields.RegistrationCost} onChange={handleFieldChange} />
        <small className="form-text text-muted">Event display title. Cannot contain any special characters.</small> 
      </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label id="lblRegistrationName" className="required-caption" htmlFor="m_c_ctl02_BP_Title_txtText">Description</label>
        <input name="m$c$ctl02$BP_Title$txtText" type="text" maxLength="200" id="RegistrationDescription" className="form-control" placeholder="Enter Description" value={fields.RegistrationDescription} onChange={handleFieldChange} />
        <small className="form-text text-muted">Event display title. Cannot contain any special characters.</small> 
      </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label id="lblRegistrationName" className="required-caption" htmlFor="m_c_ctl02_BP_Title_txtText">Capacity</label>
        <input name="m$c$ctl02$BP_Title$txtText" type="text" maxLength="200" id="RegistrationCapacity" className="form-control" placeholder="Enter Capacity" value={fields.RegistrationCapacity} onChange={handleFieldChange} />
        <small className="form-text text-muted">Number of attendees allowed to register for this registration type.</small> 
      </div>
    </div>
    <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Allows Over Capacity</label>
      <div className="form-check">
        <input id="RegistrationAllowsOverCapacity" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={fields.RegistrationAllowOverCapacity} onChange={handleFieldChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, attendees can still register despite reaching the capacity limit.</small> </div>
    <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Allows Deposit</label>
      <div className="form-check">
        <input id="RegistrationAllowDeposits" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={fields.RegistrationAllowDeposits} onChange={handleFieldChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, the user will be able to pay the full amount or just a partial amount.</small> </div>
      <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Are there Dependencies</label>
      <div className="form-check">
        <input id="HasDependencies" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={fields.HasDependencies} onChange={handleFieldChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, the date will only be shown.</small> </div>
      <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Supplemental Insurance Required</label>
      <div className="form-check">
        <input id="RequireSupplementalInsurance" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={fields.RequireSupplementalInsurance} onChange={handleFieldChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, the date will only be shown.</small> </div>
      <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Background Check</label>
      <div className="form-check">
        <input id="RequireBGCheck" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={fields.RequireBGCheck} onChange={handleFieldChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, the date will only be shown.</small> </div>
      <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Require Waiver for Disaster Relief</label>
      <div className="form-check">
        <input id="WaiverDR" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={fields.WaiverDR} onChange={handleFieldChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, the date will only be shown.</small> </div>

    
    
    <div className="col-md-12">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Address_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_Address_txtText">Document Upload</label>
        <input name="m$c$ctl02$BP_Address$txtText" type="file" id="RegistrationIninerary" className="form-control controls BPAddressControl pac-target-input" value={fields.RegistrationIninerary} onChange={handleFieldChange}/>
        <small className="form-text text-muted">Provide event location.</small> </div>
    </div>
    
    <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Require Approval</label>
      <div className="form-check">
        <input id="RequireApproval" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={fields.RequireApproval} onChange={handleFieldChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, the date will only be shown.</small> </div>
    <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowEndTime_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowEndTime_checkbox">Allow Groups/Teams</label>
      <div className="form-check">
        <input id="AllowGroups" type="checkbox" name="m$c$ctl02$BP_ShowEndTime$checkbox" value={fields.AllowGroups} onChange={handleFieldChange}/>
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, the end date will show to users.</small> </div>
    <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_DatesFlexible_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_DatesFlexible_checkbox">Require Sign In</label>
      <div className="form-check">
        <input id="RequireSignIn" type="checkbox" name="m$c$ctl02$BP_DatesFlexible$checkbox" value={fields.RequireSignIn} onChange={handleFieldChange}/>
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, allows attendee to select dates.</small> </div>
    <div className="col-md-6 mt-3">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Overnight_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_Overnight_dropDownList">Registration Type</label>
        <select name="m$c$ctl02$BP_Overnight$dropDownList" id="RegistrationType" className="DropDownField form-control" value={fields.RegistrationType} onChange={handleFieldChange}>
          <option value="(none)">(none)</option>
          <option value="Profile Sections">Profile Sections</option>
          <option value="Registration Fields">Registration Fields</option>
        </select>
        <small className="form-text text-muted">If selected, this choice will display under the event details.</small> </div>
    </div>

  </div>
</div>
<input type="submit" value="Submit" />
</div>

</form>
    );
  }


