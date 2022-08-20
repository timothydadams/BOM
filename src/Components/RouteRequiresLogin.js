import React from "react";
import { useLocation,Navigate,Outlet } from "react-router-dom";
import useData from '../Hooks/useData';


const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useData();
  const roles = auth?.roles != null ? auth.roles : [];
  const user = auth?.User != null ? auth.User : null;
  const location = useLocation();

  console.log('REQUIRE AUTH', user, roles, allowedRoles); 

  return (
    roles?.find(x => allowedRoles?.includes(x)) 
      ? <Outlet />
      : user && allowedRoles.length == 0
        ? <Outlet />
        : auth
          ? <Navigate to="/unauthorized" state={{from: location}} replace />
          : <Navigate to="/login" state={{from: location}} replace />
  );
}

export default RequireAuth;
