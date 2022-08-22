import  {Outlet} from 'react-router-dom';
import {useState, useEffect} from 'react';
import useRefreshToken from '../Hooks/useRefreshToken';
import useData from '../Hooks/useData';

const PersistLogin = () => {
    const [isLoading, setIsLoading] =useState(true);
    const refresh = useRefreshToken();
    const { auth } = useData();

    useEffect(()=>{
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {

            } finally {
                setIsLoading(false);
            }
        }

        !auth?.token ? verifyRefreshToken() : setIsLoading(false);

    },[])


    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`authToken: ${JSON.stringify(auth?.token)}`)
    }, [isLoading])

    return (
        <>
        {isLoading 
            ? <p>Loading...</p>
            : <Outlet />
        }
        </>
    )
}

export default PersistLogin;