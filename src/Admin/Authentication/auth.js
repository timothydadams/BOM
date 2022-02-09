import React from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../Components/Hooks/useUser';
import Routes from '../../Components/Routes';

export const AuthRequired = ({children}) => {
  const user = useUser();
  

  //find admin role
  //determine admin roles for permissions
  //const location = useLocation();
  console.log('User in auth required using useUser:',user);
  return (  
     user? (
        console.log("User has permissions for current element")
     ) : (
        window.location = "/login"
     )
  )
};
