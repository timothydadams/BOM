import React, { memo } from "react";
import { Redirect, Route } from "react-router-dom";
import { useUser } from './Hooks/useUser'
import AdminLogin from './../Admin/Pages/Login'

//loop through users current assigned roles and match to modules
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
    return module.includes("/admin/events") ? passedChecks = true : passedChecks = false;
  }
  //checkin admin
  else if(roles?.find(role => role.RoleID === 38))
  {
    return module.includes("/admin/checkin") ? passedChecks = true : passedChecks = false;
  }
  //finance role???
  
}

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const user = useUser();
  let roles;
  //console.log(user.Roles);
  let isAuthorized = false;
  //check roles against user
  roles = user ? JSON.parse(user["Roles"]) : null;
  isAuthorized = CheckPermissions(roles, restOfProps.path);
  

  return isAuthorized ?
    <Route
      {...restOfProps}
      render={(props) =>
        <Component {...props} /> 
      }
    /> : <Redirect to="/admin/login?unauthorized=true" component={<AdminLogin/>} />
}

export default memo(ProtectedRoute);