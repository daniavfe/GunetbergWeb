import { AxiosResponse } from "axios";
import ApiClient from "./apiClient";
import AuthorizationRequest from "../model/authorization/authorizationRequest";

export default class AuthApiClient extends ApiClient{
    
    authorize(authorizationRequest: AuthorizationRequest): Promise<AxiosResponse<string>> {
        return this.getClient().post<string>("/auth", authorizationRequest);
    }

    validateToken(): Promise<AxiosResponse> {
        return this.getClient().get("/auth/validate");
    }
}