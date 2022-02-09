import React from "react"
import {Link} from "react-router-dom"
import dateFormat from 'dateformat';
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { NavLink } from "react-router-dom";
import dompurify from 'dompurify'
import Register from './Register'

function EventsTile(props){

return(
  <li className="event-wrapper light-gray">
      <Accordion>
        <AccordionSummary aria-controls={props.Event.EventsID + '-content'}
          id={props.Event.EventsID + '-header'} >
        <div className="row no-gutter align-items-center mt-4">
                <div className="col-lg-2 col-12">
                  <div className="event-date">{dateFormat(props.Event.BP_StartDate, "mmm dS, yyyy")}</div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="event-name">{props.Event.BP_Title}</div>
                    </div>
                    <div className="col-md-12">
                      <div className="event-category-wrapper">
                        <ul className="event-categories">
                          <li>United States Missions</li>
                          <li>Construction Ministry</li>
                          <li>National Projects</li>
                          <li>Wyoming</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-6"><a role="button" aria-controls={props.Event.EventsID + '-content'} className="collapsed view-details-link">View Details <i className="fa" aria-hidden="true"></i></a></div>
                <div className="col-lg-2 col-6">{props.Event.BP_Reserved ? <NavLink to={"/events/register/" + props.Event.EventsID} className="event-button reserved">Reserved <i className="fas fa-check"></i></NavLink> : <NavLink to={"/events/register/" + props.Event.EventsID} className="event-button">Register <i className="fas fa-chevron-right"></i></NavLink> }</div>
              </div>
        </AccordionSummary>
        <AccordionDetails>
        <div className="row no-gutters">
                <div className="col-md-12">
                  <div id={"#" + props.Event.EventsID + '-content'}>
                    <div className="">
                      <div className="row justify-content-between">
                        <div className="col-md-8">
                          <h6>Overview</h6>
                          {<div dangerouslySetInnerHTML={{ __html: dompurify.sanitize(props.Event.BP_Description) }} /> }
                        </div>
                        <div className="col-md-3 event-contacts">
                          <h6>Contact</h6>
                          <p>Mark Abernathy<br/>
                            <a href="mailto:mabernathy@ncbaptist.org">mabernathy@ncbaptist.org</a><br/>
                            (919) 459-5607</p>
                          <p>Melanie Crawford<br/>
                            <a href="mailto:mcrawford@ncbaptist.org">mcrawford@ncbaptist.org</a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </AccordionDetails>
      </Accordion>
 </li>
        )
}

export default EventsTile;
