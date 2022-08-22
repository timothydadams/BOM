import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useData from './useData';

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useData();

    useEffect(() => {
        const reqIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.token}`;
                }
                return config;
            }, error => Promise.reject(error)
        )

        const resIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevReq = error?.config;
                if (error?.response?.status === 403 && !prevReq?.sent) {
                    prevReq.sent = true;
                    const newToken = await refresh();
                    prevReq.headers['Authorization'] = `Bearer ${newToken.token}`;
                    return axiosPrivate(prevReq);
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(reqIntercept);
            axiosPrivate.interceptors.response.eject(resIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;