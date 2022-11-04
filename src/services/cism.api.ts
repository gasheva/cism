import axios from 'axios';
import store from '@/store';
import {RejectedRequest} from '@/interfaces/rejectedRequest';

const cism = axios.create({
    baseURL: process.env.VUE_APP_CISM_SERVER
});

cism.interceptors.request.use(config => {
    const token = store.getters.getToken;
    if (config.headers) config.headers.token = token ? token : '';
    return config;
});

cism.interceptors.response.use(config => config, error => {
    const errorMsg = error.response?.data?.message || error.message;
    return Promise.reject({error: errorMsg, failed: true, code: error.code} as RejectedRequest);
});

export default cism;