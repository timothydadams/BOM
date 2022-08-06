import React from "react";
import { NavLink , useLocation, useHistory, useParams} from "react-router-dom";

const ProfileTabs = () => {

return(
    <ul className="tabs clearfix" data-tabgroup="first-tab-group">
        <li><NavLink exact to="#tab1" activeClassName="active">General</NavLink></li>
        <li><NavLink exact to="#tab2" activeClassName="active">Skills</NavLink></li>
        <li><NavLink exact to="#tab3" activeClassName="active">Education</NavLink></li>
        <li><NavLink exact to="#tab4" activeClassName="active">References</NavLink></li>
        <li><NavLink exact to="#tab5" activeClassName="active">Contacts</NavLink></li>
        <li><NavLink exact to="#tab6" activeClassName="active">Health</NavLink></li>
        <li><NavLink exact to="#tab7" activeClassName="active">Insurance</NavLink></li>
        <li><NavLink exact to="#tab8" activeClassName="active">Passport</NavLink></li>
        <li><NavLink exact to="#tab9" activeClassName="active">Church</NavLink></li>
      </ul>
)
}

export default ProfileTabs;