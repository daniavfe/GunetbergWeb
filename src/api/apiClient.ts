import axios, { AxiosError, AxiosResponse } from "axios";

export const apiClient = axios.create({
        baseURL: "https://localhost:7029/",
        timeout: 31000,
});


