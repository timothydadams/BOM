import React, { useState } from "react"
import PropTypes from "prop-types"
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import {useToken} from '../../Components/Hooks/useToken'
import bomLogo from "../Pages/img/baptists-on-mission-logo.png"
import signInImg from "../Pages/img/sign-in-page-image.jpg"
import axios from 'axios'


export default function AdminLogin(){
    const [username, setUserName]= useState();
    const [password, setPassword] = useState();
    const [token, setToken] = useToken();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const history = useHistory();
    
    const handleSubmit = async e => {
        e.preventDefault();
        var isValid = (username != undefined || password !=undefined) ? true : false;
        if(!isValid)
        {
          enqueueSnackbar('Please fill out the username and password')
          return;
        }
        else{
          let response = await axios.post("https://bomreactapi.azurewebsites.net/api/login/authenticate",{username, password});

          //console.log('This is back from server', typeof response);
          if(response && response.data !== undefined)
          {
            console.log('After response', response.data);
            setToken(response.data);
            enqueueSnackbar("Login Successful");

            history.push('/admin');
          }
          else{
            enqueueSnackbar("Whoops, something happened.  Please try again")
            return;
          }
         
        }
    }

   async function loginUser(username, password){
      
       axios.post("https://bomreactapi.azurewebsites.net/api/login/authenticate?" + "username=" + username + "&password=" + password)
        .then(data => {
          //console.log('Server response with token:', data);
          return data;
        })
        .catch(function(err){
          return err;
        })
    }

    return(
      <div className="col-md-12">
<nav className="sb-topnav navbar navbar-expand navbar-dark bg-blue">
  <div className="tag d-none d-lg-block d-xl-block">Sharing God's Love in Word and Deed</div>
</nav>
    <div>
    <section className="b-login-holder">
      <div className="content">
        <div className="page-login">
          <div className="site-brand"> <a href="https://www.baptistsonmission.org"><img src={bomLogo} alt="Baptists On Mission"/></a> </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email Address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Address" onChange={e=> setUserName(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={e=> setPassword(e.target.value)} />
            </div>
            <button type="submit" className="button-default button-full-width" href="#">Sign In</button>
          </form>
          <p className="problem-text">If you have any problems signing in, please contact us at (800) 395-5102 ext 5596</p>
          <hr/>
          <p className="mb-5">Don't have an account? <a href="/createaccount">Create Account</a></p>
        </div>
      </div>
    </section>
    </div>
  </div>
    )
}
