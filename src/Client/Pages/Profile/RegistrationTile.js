import React, {useState,useEffect} from "react"
import {Link} from "react-router-dom"
import dateFormat from 'dateformat';
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import dompurify from 'dompurify'
import Registration from "../../../Admin/Events/Registration";

function RegistrationTile(props){
    const [selectedRegistrationQuantity, setSelectedRegistrationQuantity] = useState(0);

    const handleRegistrationChange = e => {
        setSelectedRegistrationQuantity(e.target.value);
        console.log('User Selected for registrationid:' + props.Registration.RegistrationID + ' quantity of:' + e.target.value);
    }

    if(props.Registration.RegistrationEnabled)
    {
      return(
         
          <div className="row align-items-center light-gray p-4 pb-3 mb-5">
            <div className="col-md-8 col-12">
              <p><strong>{props.Registration.RegistrationName}</strong></p>
              {<div dangerouslySetInnerHTML={{ __html: dompurify.sanitize(props.Registration.RegistrationDescription) }} /> }  
            </div>
            <div className="col-md-2 col-6">
              <div className="form-group">
                <label id="" className="control-label editing-form-label" htmlFor="">Quantity</label>
                <select name="" id={props.Registration.RegistrationID} className="DropDownField form-control" onChange={handleRegistrationChange} value={selectedRegistrationQuantity}>
                  <option value="0">0</option>
                  <option value="1">1</option>
                </select>
              </div>
            </div>
            <div className="col-md-2 col-6"> <Link className="button-default" to={{pathname: "/events/register/" + props.Registration.BPEventID, state:{Event: props.Event, Registration: props.Registration, Quantity: selectedRegistrationQuantity}}}>Register</Link> </div>
          </div>
         
     )
  }
  else return (<div></div>)
}

export default RegistrationTile;