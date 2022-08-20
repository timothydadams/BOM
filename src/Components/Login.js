import React, { useState, useContext, useRef, useEffect } from "react"
import { useSnackbar } from 'notistack';
import { useNavigate, Link , useLocation } from "react-router-dom";
//import {useToken} from '../../Components/Hooks/useToken';
//import DataContext from "../../context/DataProvider";
import useData from "../Hooks/useData";

//import bomLogo from "../Pages/img/baptists-on-mission-logo.png"
//import signInImg from "../Pages/img/sign-in-page-image.jpg"
import axios from '../api/axios';
import { getPayloadFromToken } from '../utils/helpers';

const LOGIN_PATH = '/login/authenticate';


const Login = () => {
  const { setAuth } = useData();
  const userRef = useRef();
  const errorRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/events";

  //console.log('next url:', from);

  const [username, setUsername]= useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
    
  useEffect(()=>{
      userRef.current.focus();
  },[])

  useEffect(() => {
      setErrorMsg('');
  },[username, password])
    
  const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await axios.post(LOGIN_PATH,
            {username, password},
            {
              header:{'Content-Type':'application/json'},
              withCredentials:true,
            }
          );
  
          const payload = getPayloadFromToken(response?.data);   
          setAuth(payload);
          navigate(from, { replace: true });
        } catch (err) {
          setErrorMsg('Login failed');
          errorRef.current.focus();
        }
  }



    return(
        <div className="col-md-12">
    <div>
    <section className="b-login-holder">
      <div className="content">
        <div className="page-login">
          <p ref={errorRef} className={errorMsg ? 'errormsg' : 'offscreen'} aria-live="assertive">
            {errorMsg}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email"
                    ref={userRef} 
                    className="form-control" 
                    id="email"
                    placeholder="Email Address" 
                    autoComplete="off"
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                    required
              />
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password</label>
              <input type="password" 
                className="form-control" 
                id="pwd" 
                placeholder="Password" 
                onChange={e=> setPassword(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="button-default button-full-width" disabled={(username !== '' && password !== '') ? false: true }>Sign In</button>
          </form>
          <p className="problem-text">If you have any problems signing in, please contact us at (800) 395-5102 ext 5596</p>
          <hr/>
          <p className="mb-5">
            Don't have an account? 
            <Link to="/createaccount">Create Account</Link>
          </p>
        </div>
      </div>
    </section>
    </div>
  </div>
    )
}

export default Login;