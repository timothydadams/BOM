import { createContext, useState, useEffect } from 'react';
//import { useUser } from '../Components/Hooks/useUser';

const DataContext = createContext({});

export const DataProvider =({ children }) => {
    //const user = useUser();
    //const roles = user?.roles || [];
    //const userInfo = user?.User || {};
    const [auth, setAuth] = useState({})

    return (
        <DataContext.Provider value={{
            auth, setAuth,
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;