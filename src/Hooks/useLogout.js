import axios from "../api/axios";
import useData from "./useData";

const useLogout = () => {
    const { setAuth } = useData();

    const logout = async () => {
        setAuth({});
        try {
            const res = await axios('/logout',{
                withCredentials:true,
            })
        } catch (err) {

        }
    }

    return logout;
}

export default useLogout;