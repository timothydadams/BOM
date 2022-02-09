import React, { useState } from "react"
import PropTypes from "prop-types"
import { useSnackbar } from 'notistack';
import Select from 'react-select'
import {useToken}  from '../../Components/Hooks/useToken'
import bomLogo from "../Pages/img/baptists-on-mission-logo.png"
import createAccountLogo from "../Pages/img/create-account-page-image.jpg"




async function loginUser(credentials){
    return fetch("https://bomreactapi.azurewebsites.net/login/login",
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(credentials)
    })
    .then(data => data.json())
}

export default function CreateAccount(){
    const [username, setUserName]= useState();
    const [password, setPassword] = useState();
    const [firstname, setFirstName] = useState();
    const [lastname, setLastName] = useState();
    const [gender, setGender] = useState();
    const [verifypassword, setVerifyPassword] = useState();
    const [dob, setDOB] = useState();
    const [message, setMessage] = useState();
    const [successful, setSuccessful] = useState();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    //const {user, setUser} = useState();
    const [token, setToken] = useToken();

    const gendersList = [{ value: "Select", label:"Select"}, {value:'Male', label:"Male"}, {value:'Female', label:"Female"}, {value:'Matt Kustka', label:"Matt Kustka"}];

    const handleSubmit = async e => {
        e.preventDefault();
        var isValid = ValidateForm();
        //alert(isValid);
        if(!isValid)
        {
          enqueueSnackbar('Please fill out all fields in the form to submit.'); 
          return;
        }

        if(password != verifypassword)
        {
           enqueueSnackbar('Passwords do not match');
           return;
        }

       
        //first create account and then login using credentials assuming no error
        CreateAccount(username, password, firstname, lastname,dob);
       token = await loginUser({
            username,
            password
        });
   // console.log(token);
      setToken(token);
   // localStorage.setItem('user', JSON.stringify(token.user));
   // localStorage.setItem('roles', JSON.stringify(token.roles));
   // enqueueSnackbar('Account Creation Success'); 
   // window.location = '/';
    }

    function ValidateForm(){
      //alert("username: " + username + ", Name: " + firstname + " " + lastname + ", Gender: "+ gender);
      if(username != undefined || firstname != undefined || lastname !=undefined || password !=undefined|| gender !=undefined)
      {
        //validated
        return true;
      }
      else{
        return false;
      }
    }



    function CreateAccount(username, password, firstname, lastname, dob){
        var data = {UserName: username,
        UserPassword: password,
        FirstName: firstname,
        LastName: lastname,
        DateOfBirth: dob,
        Gender: gender
    }
        return fetch("https://bomreactapi.azurewebsites.net/login/createaccount",
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    })
    .then(data => data.json())
    }

    return(
        <div className="wrapper">
<nav className="sb-topnav navbar navbar-expand navbar-dark bg-blue">
  <div className="tag d-none d-lg-block d-xl-block">Sharing God's Love in Word and Deed</div>
</nav>
<div id="app" className="b-app-structure">
  <div className="b-app-structure-main">
    <section className="b-login-holder">
      <div className="content">
        <div className="page-login">
          <div className="site-brand"> <a href="https://www.baptistsonmission.org"><img src={bomLogo} alt="Baptists On Mission" /></a> </div>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>First Name</label>
                <input type="text" className="form-control" id="firstname" placeholder="First Name" value={firstname} onChange={e=> setFirstName(e.target.value)} />
              </div>
              <div class="form-group col-md-6">
                <label>Last Name</label>
                <input type="text" className="form-control" id="lastname" placeholder="Last Name" value={lastname} onChange={e=> setLastName(e.target.value)} />
              </div>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email Address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email Address" value={username} onChange={e=> setUserName(e.target.value)} />
              <small id="emailHelp" className="form-text text-muted">Must be a valid email address and will be your username. </small> </div>
            <div className="form-group">
              <label id="" className="control-label editing-form-label" for="">Date of Birth</label>
              <input type="text" className="form-control datetimepicker-input" id="dob" data-toggle="datetimepicker" data-target="#datetimepicker1" value={dob} onChange={e=> setDOB(e.target.value)} />
            </div>
            <div className="form-group">
              <label id="" className="required-caption" for="">Gender</label>
              <Select name="genderselect" options={gendersList} id="gender" className="DropDownField" value={gender} onChange={setGender}>
              </Select>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={e=> setPassword(e.target.value)} />
            </div>
            <div class="form-group">
              <label for="verifypassword">Verify Password</label>
              <input type="password" className="form-control" id="verifypassword" placeholder="Verify Password" value={verifypassword} onChange={e=> setVerifyPassword(e.target.value)} />
            </div>
            <button type="submit" className="button-default button-full-width" >Create Account</button>
          </form>
          <p className="problem-text">If you have any problems creating an account, please contact us at (800) 395-5102 ext 5596</p>
          <hr/>
          <p className="mb-5">Already have an account? <a href="/login">Sign In</a></p>
        </div>
      </div>
    </section>
  </div>
  <div className="b-app-structure-secondary" style={{
  backgroundImage: 'url(' + createAccountLogo + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover'
}}>
</div>
</div>
</div>

        
    )
}





            