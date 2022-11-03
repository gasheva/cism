import axios from 'axios';

const cism = axios.create({
    baseURL: process.env.VUE_APP_CISM_SERVER_API
});

cism.interceptors.request.use(config=>{
    return config;
})

cism.interceptors.response.use(config=>config, error=>{
    console.warn(error);
})

export default cism;