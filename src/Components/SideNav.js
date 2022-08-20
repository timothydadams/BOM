import React, { useEffect , useState} from "react"
import {Link, NavLink, useLocation} from "react-router-dom"
import { useUser } from "../Hooks/useUser"
//import { useToken } from "../Hooks/useToken"


import logo from "../static/images/baptists-on-mission-logo.png";

function CheckPermissions(roles, module){
    let passedChecks = false;
    console.log("CHECKING ROLES: ", roles, module);
    //admin role checks so auto pass for any module
    if(roles?.find(role => role === 8) || roles?.find(role => role === 33) || roles?.find(role => role === 32)) 
    {
        console.log("admin check passed")
       return passedChecks = true;
    }
    //event admin
    else if(roles?.find(role => role === 35))
    {
      //compare path
      return module.includes("events") || module.includes("orders") || module.includes("users") ? passedChecks = true : passedChecks = false;
    }
    //checkin admin
    else if(roles?.find(role => role === 38))
    {
      return module.includes("checkin") || module.includes("events") || module.includes("orders") ? passedChecks = true : passedChecks = false;
    }
    
    //finance role???
    
}


const AdminDashboardLinks = (props) => (
    <div>
        <div className="sb-sidenav-menu-heading">
            Administration
        </div>
        <Link className={props.location === '/admin' ? 'nav-link active' : 'nav-link'} to="/admin">
            <div className="sb-nav-link-icon"></div>
            Admin Dashboard 
        </Link> 
    </div>
);


/*

        <Link className={props.location === '/events' ? 'nav-link active' : 'nav-link'} to="/events">
            <div className="sb-nav-link-icon"></div>
            Events and Opportunities
        </Link>


*/

const SideBarLink = ({item}) => {
    const loc = useLocation();
    return (
    <Link to={item.path} className={loc.pathname === item.path ?'nav-link active':'nav-link' }>
        <div className="sb-nav-link-icon"></div>
        {item.label}
    </Link>
    );
}

const AdminLinks = ({ roles }) => {
    
    const links = [
        {label:"Admin Dashboard",path:"/admin", allowedRoles: [8]},
        {label:"Add/Edit Events",path:"/admin/events",allowedRoles: [8]},
        {label:"Add/Edit Users",path:"/admin/users",allowedRoles: [8]},
        {label:"Add/Edit Certifications",path:"/admin/certifications",allowedRoles: [8]},
        {label:"Add/Edit Orders",path:"/admin/finances",allowedRoles: [8]},
        {label:"Admin Reporting",path:"/admin/reporting",allowedRoles: [8]},
        {label:"Add/Edit Roles",path:"/admin/roles",allowedRoles: [8]},
        {label:"Admin Settings",path:"/admin/settings",allowedRoles: [8]},
        {label:"Admin Check In",path:"/admin/checkin",allowedRoles: [24]},
    ];
    
    return (
    <div>

        <div className="sb-sidenav-menu-heading">
           Administration
        </div>

        {links.map(i => {
            return roles.find(x => i.allowedRoles?.includes(x)) 
                ?  <SideBarLink item={i} /> 
                : null;
         })} 

    </div>
)
};









const UserLinks = (props) => {
    
    const links = [
        {label:"Events and Opportunities",path:"/events"},
        {label:"Reserved/Attending",path:"/myreserved"},
        {label:"Certifications",path:"/mycertifications"},
        {label:"Account Information",path:"/profile"},
        {label:"Event Check In",path:"/checkin"},
    ];
    
    return (
        <div>
            <div className="sb-sidenav-menu-heading">
                User
            </div>
            {links.map(i => <SideBarLink item={i} />)} 
        </div>
    )   
};


const SideNav = ({user}) => {
    const location = useLocation();
    //const user = useUser();
    const roles = user?.roles != null ? user.roles : [];

    const adminRolesList = [8,33,32,35,38];

    return (
        
        <span>
            <nav className="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion">
                
                <div className="sb-sidenav-menu">
                    <div className="site-brand"> 
                        <NavLink to="/events">
                            <img src={logo} alt="Baptists On Mission" />
                        </NavLink>
                    </div>
                    <div className="nav">
                        
                        {roles?.find(x => adminRolesList.includes(x)) && 
                            <AdminLinks roles={roles} />
                        }

                        <UserLinks />

                     </div>
                </div>        
            { user !== null && user.User && ( 
                <div className="sb-sidenav-footer">
                        <div className="profile-wrapper">
                            <div className="profile-img" data-initials={`${user.User.FirstName.charAt(0)} ${user.User.LastName.charAt(0)}`}></div>
                            <div className="profile-name">{`${user.User.FirstName} ${user.User.LastName}`}</div>
                        </div>
                </div> 
            )}
            </nav>
        </span>
    )
}

export default SideNav;