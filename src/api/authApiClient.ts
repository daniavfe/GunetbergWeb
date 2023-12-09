import { type AxiosResponse } from "axios";
import type AuthorizationRequest from "../model/authorization/authorizationRequest";
import { apiClient } from "./apiClient";

const authorize = async (authorizationRequest: AuthorizationRequest): Promise<AxiosResponse<string>> => {
	return await apiClient.post<string>("/auth", authorizationRequest);
};

const validateToken = async (): Promise<AxiosResponse> => {
	return await apiClient.get("/auth/validate");
};

export const authApiClient = {
	authorize,
	validateToken
};
