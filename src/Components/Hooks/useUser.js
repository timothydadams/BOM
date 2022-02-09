import React, {useState, useEffect} from 'react'
import {useToken} from './useToken'
import {Buffer} from 'buffer'

export const useUser = () => {
    const [token] = useToken();

    const getPayloadFromToken = token => {
        if (!token) return null;
        const encodedPayload = token.split('.')[1];
        return JSON.parse(Buffer.from(encodedPayload, 'base64'));
    };

    const [user, setUser] = useState(()=>{
        if (!token) return null;
        return getPayloadFromToken(token);
    });

    useEffect(()=>{
        if (!token) {
            setUser(null);
        } else {
            //console.log('TESTING USER USEFFECT')
            setUser(getPayloadFromToken(token));
        }
    }, [token]);

    return user;
}