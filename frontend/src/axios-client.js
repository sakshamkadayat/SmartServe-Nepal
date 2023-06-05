import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/`,
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

axiosClient.interceptors.request.use((config)=>{
    const token  = sessionStorage.getItem('access_token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use((response)=>{
    return response;
}
, (error)=>{
    try{
        if(error.response.status === 401){
            sessionStorage.removeItem('access_token');
        }
    }catch(e){
        console.log(e);
    }
    throw error;
});

export default axiosClient;