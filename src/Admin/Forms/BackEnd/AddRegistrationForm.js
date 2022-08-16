import React, { useState, useEffect } from "react"
import { useSnackbar } from 'notistack';
//import useFormFields from "../../../Components/Hooks/useFormFields"
import Select from 'react-select'
import axios from "axios"
import EventTabs from "../../Events/EventTabs";
import {useParams , NavLink} from "react-router-dom"

export default function AddRegistrationForm(){
  const [registration, setFields] = useState({
      BPEventID:0,
      RegistrationName: '',
      RegistrationCost: 0,
      RequireSignIn: false,
      RequireBGCheck:false,
      RequireApproval:false,
      AllowGroups:false,
      MaxGroupSize:0,
      SectionLabel:'',
      RegistrationType:'',
      RegistrationFields:'BPAttendeeFN,BPAttendeeLN,BPAttendeeEmail,BPAttendeePhone',
      ProfileSections:'"General,Passport,Church"',
      RegistrationAllowDeposits:'No Restrictions',
      RegistrationDepositAmount:'',
      RegistrationSKU:0,
      RegistrationCapacity:0,
      RegistrationAllowOverCapacity: false,
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
      RegistrationOrder: 0
  });

  const [contentLoaded, setContentLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  let { eventid } = useParams();
  console.log('eventid from useParams in AddRegistrationForm: ',eventid);
  
  
  const registrationFields = [{name:'First Name', value:'BPAttendeeFN'}, {name:'Last Name', value:'BPAttendeeLN'},{name:'Email', value:'BPAttendeeEmail'},{name:'Phone', value:'BPAttendeePhone'},{name:'Address', value:'BPAttendeeAddress'},{name:'Address 2', value:'BPAttendeeAddress2'},{name:'City', value:'BPAttendeeCity'},{name:'State', value:'BPAttendeeState'},{name:'Zip', value:'BPAttendeeZip'}];
  const [membershipList, setMembershipList] = useState([]);
  const [profileSectionsList, setProfileSectionsList] = useState([]);
  const [selectedProfileSections, setSelectedProfileSections] = React.useState([profileSectionsList[0], profileSectionsList[1]]);
  const [selectedRegFields, setSelectedRegFields] = React.useState([registrationFields[0], registrationFields[1]]);
  //console.log(params.registrationid);
  
  useEffect(() => {
    if(!contentLoaded){     
        getSupportingLists();
        setContentLoaded(true);  
        setFields({...registration,
          BPEventID: Number(eventid)
        });  
    }   
  });



function getSupportingLists(){
  axios.all([
    //axios.get('https://bomreactapi.azurewebsites.net/users/getcerts'),
    axios.get('https://bomreactapi.azurewebsites.net/api/events/getprofilesections')
  ]).then(responseArr => {
    //setMembershipList(responseArr[0].data);
    setProfileSectionsList(responseArr[0].data);
   });
}

const handleSelectedProfileSectionsChange = (selectedOption) => {
  setSelectedProfileSections(selectedOption);
  const values = selectedOption.map(opt => opt.value).join(',')
  alert(values)
  console.log(values)
};

const handleSelectedRegFieldsChange = (selectedOption) => {
  setSelectedRegFields(selectedOption);
  const values = selectedOption.map(opt => opt.value).join(',')
  alert(values)
  console.log(values)
};

const handleRegistrationFieldsChange = option => {
  setFields({...registration, RegistrationFields : option});
  console.log(registration.RegistrationFields);
 }

 const handleProfileSectionsChange = option => {
  setFields({...registration, ProfileSections : option});
  console.log(registration.ProfileSections);
 }
 
 

 function handleCheckboxChange(input){
   const target = input.target;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const name = target.id;
     console.log(name,value);
     setFields({...registration,
       [name]: value
     });
 }

 //handlefieldchange
 function handleFieldChange(input){
     const target = input.target;
     const value = target.value;
     const name = target.id;
     console.log(name,value);
     setFields({...registration,
       [name]: value
     });
 }

    
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleSubmit = async e => {
      e.preventDefault();
       //handle new events and setting event id
       console.log('Event ID from params from url: ', eventid)
        setFields({...registration,
          BPEventID: Number(eventid)
        });
      
      //registration.RegistrationFields = "BPAttendeeFN,BPAttendeeLN";
      if(registration.RegistrationType == 2){
      //let regArr = registration.RegistrationFields?.map((item) => item.value);
      //let strRegVal = regArr.join(';');
      //console.log(strRegVal);
      setFields({...registration,
        RegistrationFields: selectedRegFields
      });  
      console.log('reg fields before POST: ', registration.RegistrationFields);
      }

      if(registration.RegistrationType == 1){
      //let profArr = registration.ProfileSections?.map((item) => item.BP_SectionName);
      //let strProfVal = profArr.join(';');
      //console.log(strProfVal);
      setFields({...registration,
        ProfileSections: selectedProfileSections
      });
      console.log('prof sections before POST: ', registration.ProfileSections);

      
  
      }

      console.log(JSON.stringify(registration));

      let response = await axios.post('https://bomreactapi.azurewebsites.net/api/events/saveregistration', registration )
      
      if (response) {
        //get new token stuff
        if(response.data.includes('Validation failed'))
        {
          console.log(response.data);
          enqueueSnackbar(response.data);
        }
        else{
          console.log(response);
          enqueueSnackbar("Registration Saved");
        }
        
      } else {
        enqueueSnackbar(error.message);
      }

}
  
  


return (

<form onSubmit={handleSubmit}>
  <div className="eventTabs">  
  <ul className="nav nav-pills"> 
    {EventTabs?.map(d => (<li className="nav-item"><NavLink className="nav-link" to={eventid != undefined ? '/admin/events/' + d.name + '/' + eventid : ''}>{d.name}</NavLink></li> ))}  
  </ul>
  </div>
  <div className="full-row gray">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 text-white py-1"><a className="button-default button-green" onClick={handleSubmit}>Save</a><NavLink className="button-default button-gray mx-3" to='/admin/events'>Cancel</NavLink></div>
      </div>
    </div>
  </div>
<div className="full-row white">
<div className="container-fluid">
  <div className="row mt-5">
    <div className="col-md-6">
      <div className="form-group">
        <label id="lblRegistrationOrder" className="required-caption" htmlFor="m_c_ctl02_BP_Title_txtText">Registration Order</label>
        <input name="m$c$ctl02$BP_Title$txtText" type="number" maxLength="200" id="RegistrationOrder" className="form-control" placeholder="Registration Order" value={registration.RegistrationOrder} onChange={handleFieldChange} />
        <small className="form-text text-muted">This will control the order that this registration shows up.</small> 
      </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label id="SectionLabel" className="required-caption" htmlFor="m_c_ctl02_BP_Title_txtText">Section Label</label>
        <input name="m$c$ctl02$BP_Title$txtText" type="text" maxLength="200" id="SectionLabel" className="form-control" placeholder="Section Label" value={registration.SectionLabel} onChange={handleFieldChange} />
        <small className="form-text text-muted">This field will show as the header of the registration form.</small> 
      </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label id="lblRegistrationName" className="required-caption" htmlFor="m_c_ctl02_BP_Title_txtText">Name</label>
        <input name="m$c$ctl02$BP_Title$txtText" type="text" maxLength="200" id="RegistrationName" className="form-control" placeholder="Section Label" value={registration.RegistrationName} onChange={handleFieldChange} />
        <small className="form-text text-muted">Registration title that will be displayed on registration page.</small> 
      </div>
    </div>
    <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Allows Registration</label>
      <div className="form-check">
        <input id="RegistrationEnabled" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={registration.RegistrationEnabled} checked={registration.RegistrationEnabled} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, this registration type will be displayed and collect registrations.</small> </div>
      <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Has Associated Membership</label>
      <div className="form-check">
        <input id="HasMembership" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={registration.HasMembership} checked={registration.HasMembership} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, the registration can be associated to a membership.</small> </div>
      {
        registration.HasMembership ? 
          <div className="col-md-4 mt-3">
            <Select options={membershipList} value={registration.AssociatedMembership} getOptionLabel={options=>options["Name"]} getOptionValue={options=>options["ItemID"]}></Select>
          </div> 
         : ""
      }
      <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Additional Required Cost</label>
      <div className="form-check">
        <input id="RegistrationRequiredCost" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={registration.RegistrationRequiredCost} checked={registration.RegistrationRequiredCost} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, a Team Cost or other required cost can be added to the current registration.</small> 
      </div>
     
      { 
        registration.RegistrationRequiredCost ? 
          <div><div className="col-md-4 mt-3"><div className="form-group">
            <label id="lblRegistrationName" className="required-caption" htmlFor="m_c_ctl02_BP_Title_txtText">Name</label>
            <input name="m$c$ctl02$BP_Title$txtText" type="text" maxLength="200" id="RegistrationRequiredCostName" className="form-control" placeholder="Cost Name" value={registration.RegistrationRequiredCostName} onChange={handleFieldChange} />
            <small className="form-text text-muted">Name that will show up on the front end to users.</small> 
        </div></div> 
         <div className="col-md-4 mt-3"><div className="form-group">
         <label id="lblRegistrationPrice" className="required-caption" htmlFor="m_c_ctl02_BP_Title_txtText">Price</label>
         <input name="m$c$ctl02$BP_Title$txtText" type="number" maxLength="200" id="RegistrationRequiredCostPrice" className="form-control" placeholder="Price" value={registration.RegistrationRequiredPrice} onChange={handleFieldChange} />
         <small className="form-text text-muted">Additional Cost Amount.</small> 
     </div></div> 
     <div className="col-md-4 mt-3"><div className="form-group">
         <label id="lblRegistrationPrice" className="required-caption" htmlFor="m_c_ctl02_BP_Title_txtText">Required Cost Deposit</label>
         <input name="m$c$ctl02$BP_Title$txtText" type="number" maxLength="200" id="RegistrationRequiredCostPrice" className="form-control" placeholder="Deposit" value={registration.RegistrationRequiredCostDeposit} onChange={handleFieldChange} />
         <small className="form-text text-muted">Additional Cost Deposit Amount.</small> 
     </div></div> 
     <div className="col-md-4 mt-3"><div className="form-group">
         <label id="lblRegistrationPrice" className="required-caption" htmlFor="m_c_ctl02_BP_Title_txtText">Description</label>
         <input name="m$c$ctl02$BP_Title$txtText" type="text" maxLength="200" id="RegistrationRequiredDescription" className="form-control" placeholder="Description" value={registration.RegistrationRequiredDescription} onChange={handleFieldChange} />
         <small className="form-text text-muted">Additional Cost Description.</small> 
     </div></div> 
     </div>
      : ""}

      <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Date of Registration is Different than Main Event</label>
      <div className="form-check">
        <input id="RegistrationHasDates" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={registration.RegistrationHasDates} checked={registration.RegistrationHasDates} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, the registration can have different dates than the event itself.</small> 
      </div>
      <div className="col-md-6">
      <div className="form-group">
        <label id="lblRegistrationName" className="required-caption" htmlFor="m_c_ctl02_BP_Title_txtText">Cost</label>
        <input name="m$c$ctl02$BP_Title$txtText" type="text" maxLength="200" id="RegistrationCost" className="form-control" placeholder="Enter Price" value={registration.RegistrationCost} onChange={handleFieldChange} />
        <small className="form-text text-muted">Event display title. Cannot contain any special characters.</small> 
      </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label id="lblRegistrationName" className="required-caption" htmlFor="m_c_ctl02_BP_Title_txtText">Description</label>
        <input name="m$c$ctl02$BP_Title$txtText" type="text" maxLength="200" id="RegistrationDescription" className="form-control" placeholder="Enter Description" value={registration.RegistrationDescription} onChange={handleFieldChange} />
        <small className="form-text text-muted">Event display title. Cannot contain any special characters.</small> 
      </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label id="lblRegistrationName" className="required-caption" htmlFor="m_c_ctl02_BP_Title_txtText">Capacity</label>
        <input name="m$c$ctl02$BP_Title$txtText" type="text" maxLength="200" id="RegistrationCapacity" className="form-control" placeholder="Enter Capacity" value={registration.RegistrationCapacity} onChange={handleFieldChange} />
        <small className="form-text text-muted">Number of attendees allowed to register for this registration type.</small> 
      </div>
    </div>
    <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Allows Over Capacity</label>
      <div className="form-check">
        <input id="RegistrationAllowsOverCapacity" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={registration.RegistrationAllowOverCapacity} checked={registration.RegistrationAllowOverCapacity} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, attendees can still register despite reaching the capacity limit.</small> </div>
    <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Allows Deposit</label>
      <div className="form-check">
        <input id="RegistrationAllowDeposits" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={registration.RegistrationAllowDeposits} checked={registration.RegistrationAllowDeposits} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted">If checked, the user will be able to pay the full amount or just a partial amount.</small> </div>
      { registration.RegistrationAllowDeposits ?
      <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Deposit Amount</label>
      <div className="form-check">
        <input id="RegistrationDepositAmount" type="number" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={registration.RegistrationDepositAmount} onChange={handleFieldChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted"></small> </div>
      : "" }
      <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Are there Dependencies</label>
      <div className="form-check">
        <input id="HasDependencies" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={registration.HasDependencies} checked={registration.HasDependencies} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted"></small> </div>
      <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Supplemental Insurance Required</label>
      <div className="form-check">
        <input id="RequireSupplementalInsurance" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={registration.RequireSupplementalInsurance} checked={registration.RequireSupplementalInsurance} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted"></small> </div>
      <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Background Check</label>
      <div className="form-check">
        <input id="RequireBGCheck" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={registration.RequireBGCheck} checked={registration.RequireBGCheck} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted"></small> </div>
      <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Require Waiver for Disaster Relief</label>
      <div className="form-check">
        <input id="WaiverDR" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={registration.WaiverDR} checked={registration.WaiverDR} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted"></small> </div>

    
    
    <div className="col-md-12">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Address_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_Address_txtText">Document Upload</label>
        <input name="m$c$ctl02$BP_Address$txtText" type="file" id="RegistrationIninerary" className="form-control controls BPAddressControl pac-target-input" value={registration.RegistrationIninerary} onChange={handleFieldChange}/>
        <small className="form-text text-muted"></small> </div>
    </div>
    
    <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowDateOnly_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowDateOnly_checkbox">Require Approval</label>
      <div className="form-check">
        <input id="RequireApproval" type="checkbox" name="m$c$ctl02$BP_ShowDateOnly$checkbox" value={registration.RequireApproval} checked={registration.RequireApproval} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted"></small> 
    </div>
    <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_ShowEndTime_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_ShowEndTime_checkbox">Allow Groups/Teams</label>
      <div className="form-check">
        <input id="AllowGroups" type="checkbox" name="m$c$ctl02$BP_ShowEndTime$checkbox" value={registration.AllowGroups} checked={registration.AllowGroups} onChange={handleCheckboxChange}/>
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted"></small> 
    </div>
    <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_DatesFlexible_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_DatesFlexible_checkbox">Require Sign In</label>
      <div className="form-check">
        <input id="RequireSignIn" type="checkbox" name="m$c$ctl02$BP_DatesFlexible$checkbox" value={registration.RequireSignIn} checked={registration.RequireSignIn} onChange={handleCheckboxChange}/>
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted"></small> 
    </div>
    <div className="col-md-6 mt-3">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Overnight_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_Overnight_dropDownList">Registration Type</label>
        <select name="m$c$ctl02$BP_Overnight$dropDownList" id="RegistrationType" className="DropDownField form-control" value={registration.RegistrationType} onChange={handleFieldChange}>
          <option value="0">(none)</option>
          <option value="1">Profile Sections</option>
          <option value="2">Registration Fields</option>
        </select>
        <small className="form-text text-muted">If selected, this choice will display under the event details.</small> </div>
    </div>
    { registration.RegistrationType === "1" ? 
    <div className="col-md-6 mt-3"> 
    <div className="form-group">
    <label id="m_c_ctl02_BP_Overnight_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_Overnight_dropDownList">Choose Profile Sections</label>
    <Select isMulti options={profileSectionsList} getOptionLabel={options=>options["BP_SectionName"]} getOptionValue={options=>options["BP_SectionName"]} value={selectedProfileSections}  onChange={handleSelectedProfileSectionsChange} /></div> </div>
    : 
    
    registration.RegistrationType === "2" ?
    <div className="col-md-6 mt-3"> 
    <div className="form-group">
    <label id="m_c_ctl02_BP_Overnight_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_Overnight_dropDownList">Choose Registration Fields</label>
    <Select isMulti options={registrationFields} getOptionLabel={options=>options["name"]} getOptionValue={options=>options["value"]} value={selectedRegFields} onChange={handleSelectedRegFieldsChange} /></div> </div>
    : "" 
  }

  </div>
</div>
</div>

</form>
    );
  }


