import React, { useState , useEffect } from "react"
import  useData  from '../Hooks/useData';
//import { useToken } from "../Hooks/useToken"
import { Link, useNavigate } from "react-router-dom";
//import DataContext from "../context/DataContext";

export const NavBar = ({user}) => {
    const navigate = useNavigate();
    //const {auth} = useData();
    //console.log('my user in navBar from layout', user);
    //console.log('my user in navBar', auth);

    const logout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }

    return user !== null && user?.User?.FirstName ? (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-blue">
        <div className="d-sm-block d-xs-block d-md-block d-lg-none">
            <a id="sidebarToggle">
            <div> 
                <span className="top"></span> 
                <span className="middle"></span> 
                <span className="bottom"></span> 
            </div>
            </a>
        </div>
        <div className="tag d-none d-lg-block d-xl-block">Sharing God's Love in Word and Deed</div>
            <div className="log-out">
                
                    <button onClick={logout}>Log Out {user?.User?.FirstName}</button> 
                    
                
            </div>
    </nav>
    ) : (
<nav className="sb-topnav navbar navbar-expand navbar-dark bg-blue">
        <div className="d-sm-block d-xs-block d-md-block d-lg-none">
            <a id="sidebarToggle">
            <div> 
                <span className="top"></span> 
                <span className="middle"></span> 
                <span className="bottom"></span> 
            </div>
            </a>
        </div>
        <div className="tag d-none d-lg-block d-xl-block">Sharing God's Love in Word and Deed</div>
            <div className="log-out">
                
                    
                    <Link to='/login'>Sign In</Link>
                
            </div>
    </nav>


    );
    
}


