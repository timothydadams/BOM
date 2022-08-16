import React, { useEffect , useState} from "react"
import {Link, NavLink, useLocation} from "react-router-dom"
import { useUser } from "../Hooks/useUser"
import { useToken } from "../Hooks/useToken"


import logo from "../img/baptists-on-mission-logo.png"

function CheckPermissions(roles, module){
    let passedChecks = false;
    //console.log(module);
    //admin role checks so auto pass for any module
    if(roles?.find(role => role.RoleID === 8) || roles?.find(role => role.RoleID === 33) || roles?.find(role => role.RoleID === 32)) 
    {
       return passedChecks = true;
    }
    //event admin
    else if(roles?.find(role => role.RoleID === 35))
    {
      //compare path
      return module.includes("events") || module.includes("orders") || module.includes("users") ? passedChecks = true : passedChecks = false;
    }
    //checkin admin
    else if(roles?.find(role => role.RoleID === 38))
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

const AdminEventLinks = (props) => (
    <Link className={props.location === '/admin/events' ? 'nav-link active' : 'nav-link'} to="/admin/events">
     <div className="sb-nav-link-icon"></div>
        Add/Edit Events
    </Link> 

)

const AdminUserLinks = (props) => (
    <Link className={props.location === '/admin/users'? 'nav-link active' : 'nav-link'} to="/admin/users">
            <div className="sb-nav-link-icon"></div>
            Add/Edit Users
    </Link> 
)

const AdminCertificationLinks = (props) =>(
    <Link className={props.location === '/admin/certifications' ? 'nav-link active' : 'nav-link'} to="/admin/certifications">
        <div className="sb-nav-link-icon"></div>
        Add/Edit Certifications
    </Link> 
)

const AdminFinanceLinks = (props) => (
    <Link className={props.location === '/admin/finances' ? 'nav-link active' : 'nav-link'} to="/admin/finances">
        <div className="sb-nav-link-icon"></div>
        Add/Edit Orders
    </Link>     
)

const AdminReportingLinks = (props) => (
    <Link className={props.location === '/admin/reporting' ? 'nav-link active' : 'nav-link'} to="/admin/reporting">
        <div className="sb-nav-link-icon"></div>
        Admin Reporting
    </Link>     
)

const AdminRolesLinks = (props) => (
    <Link className={props.location === '/admin/roles' ? 'nav-link active' : 'nav-link'} to="/admin/roles">
        <div className="sb-nav-link-icon"></div>
        Add/Edit Roles
    </Link> 
)

const AdminSettingsLinks = (props) => (
    <Link className={props.location === '/admin/settings' ? 'nav-link active' : 'nav-link'} to="/admin/settings">
        <div className="sb-nav-link-icon"></div>
        Admin Settings
    </Link> 
)

const AdminCheckInLinks = (props) => (
    <Link className={props.location === '/admin/checkin' ? 'nav-link active' : 'nav-link'} to="/admin/checkin">
        <div className="sb-nav-link-icon"></div>
        Admin Check In
    </Link>
)




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
        <Link className={props.location === '/profile' ? 'nav-link active' : 'nav-link'} to="/profile">
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
    const token = useToken();
    const [isLoggedIn, setIsLoggedIn] = useState([]);
    let roles;
    let userParsed;
    let userInitials;
    let fullName;

    //attempt to reload page in order to show admin bar after login
    useEffect(()=> {
        token ? setIsLoggedIn(true) : setIsLoggedIn(false);
        console.log('State Variable for Is Logged In: ', isLoggedIn)
    }, []);


    try{
     userParsed = JSON.parse(user["User"]);
     roles = JSON.parse(user["Roles"]);
    }
    catch(ex){
        
    }
    
    if(userParsed)
    {
        userInitials = userParsed.FirstName.charAt(0) + userParsed.LastName.charAt(0);
        fullName = userParsed.FirstName + " " + userParsed.LastName
    }
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
                        
                    { CheckPermissions(roles, 'dashboard') ? 
                    <AdminDashboardLinks location={location.pathname}/> 
                    : null }

                    { CheckPermissions(roles, 'users') ? 
                    <AdminUserLinks location={location.pathname}/> 
                    : null }

                    { CheckPermissions(roles, 'events') ? 
                    <AdminEventLinks location={location.pathname}/> 
                    : null }

                    { CheckPermissions(roles, 'certifications') ? 
                    <AdminCertificationLinks location={location.pathname}/> 
                    : null }

                    { CheckPermissions(roles, 'orders') ? 
                    <AdminFinanceLinks location={location.pathname}/> 
                    : null }

                    { CheckPermissions(roles, 'reporting') ? 
                    <AdminReportingLinks location={location.pathname}/> 
                    : null }

                    { CheckPermissions(roles, 'roles') ? 
                    <AdminRolesLinks location={location.pathname}/> 
                    : null }

                    { CheckPermissions(roles, 'settings') ? 
                    <AdminSettingsLinks location={location.pathname}/> 
                    : null }

                    { CheckPermissions(roles, 'checkin') ? 
                    <AdminCheckInLinks location={location.pathname}/> 
                    : null }


                    <UserLinks location={location.pathname} />

                     </div>
                </div>        
            { user ? ( 
                <div className="sb-sidenav-footer">
                        <div className="profile-wrapper">
                            <div className="profile-img" data-initials={userInitials}></div>
                            <div className="profile-name">{fullName}</div>
                        </div>
                </div> ) 
            : ""}
            </nav>
        </span>
    )
}

export default SideNav;