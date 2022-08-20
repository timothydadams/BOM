import React, {useState, useEffect} from 'react'
import {useToken} from './useToken';
import {Buffer} from 'buffer';

export const useUser = () => {
    const [token] = useToken();

    const getPayloadFromToken = token => {
        //if (!token) return null;
        const encodedPayload = token.split('.')[1];
        const parsed = JSON.parse(Buffer.from(encodedPayload, 'base64'));

        for (const key in parsed) {
            try {
                let val = parsed[key];
                parsed[key] = JSON.parse(val);
                if (key === "Roles") {
                    let rolesArray = parsed[key];
                    parsed["roles"] = rolesArray.map(x=>x.RoleID);
                }
            } catch (e) {
                continue;
            }
            
        }
        //console.log('my parsed user info:', parsed);
        return parsed;
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