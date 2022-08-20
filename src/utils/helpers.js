import {Buffer} from 'buffer';


export const getPayloadFromToken = token => {
    if (!token || token === '') return {};
  
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
    parsed['token'] = token;
    return parsed;
};

export const uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}