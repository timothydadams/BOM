import React from "react";
import { NavLink , useLocation, useParams} from "react-router-dom";

const ProfileTabs = () => {
    const loc = useLocation();
    console.log(loc.hash);
return (
    <ul className="tabs clearfix" data-tabgroup="first-tab-group">
        <li><NavLink to="#tab1" className={ (loc.hash === "#tab1" || loc.hash === "")  ? "active" : ""}>General</NavLink></li>
        <li><NavLink to="#tab2" className={ loc.hash === "#tab2" ? "active" : ""}>Skills</NavLink></li>
        <li><NavLink to="#tab3" className={ loc.hash === "#tab3" ? "active" : ""}>Education</NavLink></li>
        <li><NavLink to="#tab4" className={ loc.hash === "#tab4" ? "active" : ""}>References</NavLink></li>
        <li><NavLink to="#tab5" className={ loc.hash === "#tab5" ? "active" : ""}>Contacts</NavLink></li>
        <li><NavLink to="#tab6" className={ loc.hash === "#tab6" ? "active" : ""}>Health</NavLink></li>
        <li><NavLink to="#tab7" className={ loc.hash === "#tab7" ? "active" : ""}>Insurance</NavLink></li>
        <li><NavLink to="#tab8" className={ loc.hash === "#tab8" ? "active" : ""}>Passport</NavLink></li>
        <li><NavLink to="#tab9" className={ loc.hash === "#tab9" ? "active" : ""}>Church</NavLink></li>
      </ul>
)
}

export default ProfileTabs;