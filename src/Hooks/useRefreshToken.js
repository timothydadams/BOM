import axios from '../api/axios';
import { getPayloadFromToken } from '../utils/helpers';
import useData from './useData';

const useRefreshToken = () => {
    const { setAuth }= useData();

    const refresh = async () => {
        const response = await axios.get('/refresh',{
            withCredentials:true
        });
        setAuth(prev => {
            console.log('prev:',JSON.stringify(prev));
            console.log('current:',response.data);
            return {...prev,
                ...getPayloadFromToken(response.data)
            }
        });
        return response.data;
    }
    return refresh;
}

export default useRefreshToken;