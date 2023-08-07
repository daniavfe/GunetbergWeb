import { AxiosResponse } from "axios";
import AuthorizationRequest from "../model/authorization/authorizationRequest";
import { apiClient } from "./apiClient";

const authorize = (authorizationRequest: AuthorizationRequest): Promise<AxiosResponse<string>> => {
    return apiClient.post<string>("/auth", authorizationRequest);
}

const validateToken = (): Promise<AxiosResponse> => {
    return apiClient.get("/auth/validate");
}


export const authApiClient = {
    authorize: authorize,
    validateToken: validateToken
}