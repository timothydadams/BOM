import React from 'react';
import { useToken } from '../../Components/Hooks/useToken';


export const AuthHeader = () => {
    const [token] = useToken();
      return token ? { Authorization: `Bearer ${token}`} : null;
}