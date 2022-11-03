import axios from 'axios';

const cism = axios.create({
    baseURL: process.env.VUE_APP_CISM_SERVER
});

cism.interceptors.request.use(config => {
    return config;
});

cism.interceptors.response.use(config => config, error => {
    const errorMsg = error.response?.data?.message || error.message;
    return Promise.reject({error: errorMsg, failed: true, code: error.code});
});

export default cism;