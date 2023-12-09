import axios, { AxiosError, AxiosResponse } from "axios";

export const apiClient = axios.create({
	baseURL: "http://localhost:8080",
	timeout: 31000
});
