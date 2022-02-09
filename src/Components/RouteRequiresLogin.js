import React, { memo } from "react";
import { Redirect, Route } from "react-router-dom";
import { useUser } from './Hooks/useUser'
import Login from './../Client/Pages/Login'

function RouteRequiresLogin({ component: Component, ...restOfProps }) {
  const user = useUser();
   
  return user 
    ? <Route {...restOfProps} render={(props) => <Component {...props} /> } />
    : <Redirect to={"/login?redirectUrl=" + restOfProps.path } />;
}

export default memo(RouteRequiresLogin);