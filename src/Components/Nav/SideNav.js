import React from "react"
import {Link} from "react-router-dom"
import { useUser } from "../Hooks/useUser"
import { useLocation } from "react-router-dom"


import logo from "../img/baptists-on-mission-logo.png"


const AdminLinks = (props) => (
    <div>
        <div className="sb-sidenav-menu-heading">
            Administration
        </div>
        <Link className={props.location === '/admin' ? 'nav-link active' : 'nav-link'} to="/admin">
            <div className="sb-nav-link-icon"></div>
            Admin Dashboard 
        </Link> 
        <Link className={props.location === '/admin/users'? 'nav-link active' : 'nav-link'} to="/admin/users">
            <div className="sb-nav-link-icon"></div>
            Add/Edit Users
        </Link> 
        <Link className={props.location === '/admin/events' ? 'nav-link active' : 'nav-link'} to="/admin/events">
            <div className="sb-nav-link-icon"></div>
            Add/Edit Events
        </Link> 
        <Link className={props.location === '/admin/certifications' ? 'nav-link active' : 'nav-link'} to="/admin/certifications">
            <div className="sb-nav-link-icon"></div>
            Add/Edit Certifications
        </Link> 
        <Link className={props.location === '/admin/finances' ? 'nav-link active' : 'nav-link'} to="/admin/finances">
            <div className="sb-nav-link-icon"></div>
            Add/Edit Orders
        </Link> 
        <Link className={props.location === '/admin/reporting' ? 'nav-link active' : 'nav-link'} to="/admin/reporting">
            <div className="sb-nav-link-icon"></div>
           Admin Reporting
        </Link> 
        <Link className={props.location === '/admin/roles' ? 'nav-link active' : 'nav-link'} to="/admin/roles">
            <div className="sb-nav-link-icon"></div>
            Add/Edit Roles
        </Link> 
        <Link className={props.location === '/admin/settings' ? 'nav-link active' : 'nav-link'} to="/admin/settings">
            <div className="sb-nav-link-icon"></div>
            Admin Settings
        </Link> 
        <Link className={props.location === '/admin/checkin' ? 'nav-link active' : 'nav-link'} to="/admin/checkin">
            <div className="sb-nav-link-icon"></div>
           Admin Check In
        </Link>
    </div>
);


const UserLinks = (props) => (
    <div>
        <div className="sb-sidenav-menu-heading">
           User
        </div>
        <Link className={props.location === '/events' ? 'nav-link active' : 'nav-link'} to="/events">
            <div className="sb-nav-link-icon"></div>
            Events and Opportunities
        </Link> 
        <Link className={props.location === '/myreserved' ? 'nav-link active' : 'nav-link'} to="/myreserved">
            <div className="sb-nav-link-icon"></div>
            Reserved/Attending
        </Link> 
        <Link className={props.location === '/mycertifications' ? 'nav-link active' : 'nav-link'} to="/mycertifications">
            <div className="sb-nav-link-icon"></div>
            Certifications
        </Link> 
        <Link className={props.location === '/myprofile' ? 'nav-link active' : 'nav-link'} to="/myprofile">
            <div className="sb-nav-link-icon"></div>
            Account Information
        </Link> 
        <Link className={props.location === '/checkin' ? 'nav-link active' : 'nav-link'} to="/checkin">
            <div className="sb-nav-link-icon"></div>
            Event Check In
        </Link>
    </div>
);


function SideNav(){
    const location = useLocation();
    const user = useUser();
    let roles;
    let userParsed;
    let userInitials;
    let fullName;
    let adminRole;

    try{
     userParsed = JSON.parse(user["User"]);
     roles = JSON.parse(user["Roles"]);
     adminRole = roles.find(role => role.RoleDisplayName === 'CMS Desk Administrators');
    }
    catch(ex){
        console.log(ex);
    }
    
    if(userParsed)
    {
        userInitials = userParsed.FirstName.charAt(0) + userParsed.LastName.charAt(0);
        fullName = userParsed.FirstName + " " + userParsed.LastName
    }
    return (
        
        <div>
            <nav className="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="site-brand"> 
                        <a href="/">
                            <img src={logo} alt="Baptists On Mission" />
                        </a>
                    </div>
                    <div className="nav">
                        
                    { adminRole ? 
                    <AdminLinks location={location.pathname}/> 
                    : null }
                        

                        <UserLinks location={location.pathname} />


                        { user ? ( 
                        <div className="sb-sidenav-footer">
                            <div className="profile-wrapper">
                                <div className="profile-img" data-initials={userInitials}></div>
                                <div className="profile-name">{fullName}</div>
                            </div>
                        </div> ) : ""}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default SideNav;