import axios from 'axios';

const BASE_URL = 'https://bomreactapi.azurewebsites.net/api';

export default axios.create({
    baseURL:BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL:BASE_URL,
    headers: {'Content-Type':'application/json'},
    withCredentials:true
})