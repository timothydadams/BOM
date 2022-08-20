import React, { useState } from 'react';

export const useToken = () => {
    const [token, setTokenInternal] = useState(() => {
        return localStorage.getItem('token');
    });

    const setToken = newToken => {
        //console.log('im the token getting set in the hook', newToken);
        localStorage.setItem('token', newToken);
        setTokenInternal(newToken);
    }

    return [token, setToken];
}
