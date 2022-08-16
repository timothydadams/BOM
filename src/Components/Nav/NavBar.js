import React, { useState , useEffect } from "react"
import { useUser } from '../Hooks/useUser'
import { useToken } from "../Hooks/useToken"
import { NavLink, useHistory } from "react-router-dom"

export const NavBar = () => {
    const history = useHistory();
    const user = useUser();
    const [isLoggedIn, setIsLoggedIn] = useState([]);
    const token = useToken();
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

     //attempt to reload page in order to show admin bar after login
     useEffect(()=> {
        console.log('State Variable for Is Logged In: ', isLoggedIn)
    }, []);

    function logout(){
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        history.push("/login");
    }
    return(
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-blue">
            <div className="d-sm-block d-xs-block d-md-block d-lg-none"><a id="sidebarToggle">
            <div> <span className="top"></span> <span className="middle"></span> <span className="bottom"></span> </div>
            </a></div>
            <div className="tag d-none d-lg-block d-xl-block">Sharing God's Love in Word and Deed</div>
            <div className="log-out">{ userParsed? <NavLink to='/login' onClick={logout}>Log Out {firstName}</NavLink> : <NavLink to='/login'>Sign In</NavLink>}</div>
        </nav>
    )
}


