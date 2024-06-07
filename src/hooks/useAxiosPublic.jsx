import axios from "axios";
import { Navigate } from "react-router-dom";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000/'
})

const useAxiosPublic = () => {


    axiosPublic.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    axiosPublic.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
            Navigate('/login');
        }
        return Promise.reject(error);
    })

    return axiosPublic;
};

export default useAxiosPublic;