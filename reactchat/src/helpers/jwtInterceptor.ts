import axios, { AxiosInstance } from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

const API_BASE_URL = BASE_URL

const useAxiosWithInterceptor = (): AxiosInstance => {
    const jwtAxios = axios.create({ baseURL: API_BASE_URL})
    const navigate = useNavigate()

    jwtAxios.interceptors.response.use(
        (response) => {
            return response;
        },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 403) {
            const goRoot = () => navigate("/test")
            goRoot();
        }
        throw error;
    }
    )
    return jwtAxios;
}

export default useAxiosWithInterceptor