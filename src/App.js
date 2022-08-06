import React, {useState} from 'react';
import {BrowserRouter, useLocation} from "react-router-dom"
//import Login from "./Components/Pages/Login"
import { NavBar} from "./Components/Nav/NavBar"
import SideNav from "./Components/Nav/SideNav"
import Footer from "./Components/Nav/Footer"
import Routes from "./Components/Routes"
import Banner from './Banner'
//import AppendHead from 'react-append-head'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


export default function App() {

  return(  
  <BrowserRouter>
      <NavBar/>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <SideNav/> 
        </div>
      <div id="layoutSidenav_content">
        <main>
          <Banner/>
          <Routes/> 
        </main>
        <Footer/>
      </div>
    </div> 
  </BrowserRouter>
  )
}


