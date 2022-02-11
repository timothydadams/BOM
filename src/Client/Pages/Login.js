import React, { useState } from "react"
import { useSnackbar } from 'notistack';
import { useHistory, NavLink , useParams } from "react-router-dom";
import {useToken} from '../../Components/Hooks/useToken'
//import bomLogo from "../Pages/img/baptists-on-mission-logo.png"
//import signInImg from "../Pages/img/sign-in-page-image.jpg"
import axios from 'axios'




export default function Login(){
    const params = useParams();
    const [username, setUserName]= useState();
    const [password, setPassword] = useState();
    const [token, setToken] = useToken();
    const history = useHistory();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    
    
    const handleSubmit = async e => {
        e.preventDefault();
        var isValid = (username != undefined || password !=undefined) ? true : false;
        if(!isValid)
        {
          enqueueSnackbar('Please fill out the username and password')
          return;
        }
        else{
          let response = await axios.post("https://bomreactapi.azurewebsites.net/login/authenticate",{username, password});

          //console.log('This is back from server', typeof response);
          if(response && response.data !== undefined)
          {
            //console.log('After response', response.data);
            setToken(response.data);
            enqueueSnackbar("Login Successful");
            //have a redirect url
            if(params){
              let redirectUrl = params.redirectUrl;
              redirectUrl ? history.push(redirectUrl) : history.push('/events');
            }
            else{
            history.push('/events');
            }
          }
          else{
            enqueueSnackbar("Whoops, something happened.  Please try again")
            return;
          }
         
        }
    }

   async function loginUser(username, password){
      
       axios.post("https://bomreactapi.azurewebsites.net/login/authenticate?" + "username=" + username + "&password=" + password)
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
    <div>
    <section className="b-login-holder">
      <div className="content">
        <div className="page-login">
          
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
          <p className="mb-5">Don't have an account? <NavLink to="/createaccount">Create Account</NavLink></p>
        </div>
      </div>
    </section>
    </div>
  </div>
    )
}
