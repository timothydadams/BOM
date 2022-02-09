import React from "react"
import { useUser } from '../Hooks/useUser'
import { NavLink, useHistory } from "react-router-dom"

export const NavBar = () => {
    const history = useHistory();
    const user = useUser();
    let userParsed;
    try{
        userParsed = JSON.parse(user["User"]);
       }
       catch(ex){
           console.log(ex);
       }
    let firstName = '';
    //console.log('user from navbar component',userParsed);
    if(userParsed)
    { 
        firstName = userParsed.FirstName;
    } 

    function logout(){
        localStorage.removeItem('token');
        history.push("/login");
    }
    return(
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-blue">
            <div className="d-sm-block d-xs-block d-md-block d-lg-none"><a id="sidebarToggle">
            <div> <span className="top"></span> <span className="middle"></span> <span className="bottom"></span> </div>
            </a></div>
            <div className="tag d-none d-lg-block d-xl-block">Sharing God's Love in Word and Deed</div>
            <div className="log-out">{ userParsed? <NavLink to='/login' onClick={logout}>Log Out {firstName}</NavLink> : ''}</div>
        </nav>
    )
}


