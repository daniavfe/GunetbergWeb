import { AuthorizationApi } from "@gunetberg/gunetberg-client";
import AuthorizationApiPort from "../ports/authorizationApiPort";
import AuthorizationApiClientConverter from "./converters/authorizationApiClientConverter";
import AuthorizationRequest from "../domain/authorization/authorizationRequest";
import AuthorizationResponse from "../domain/authorization/authorizationResponse";
import handleResponse from "./utils/httpUtils";
import { ApiResponse } from "../domain/common/apiResponse";

export default class AuthorizationApiClient implements AuthorizationApiPort {
    readonly authorizationApi: AuthorizationApi;
    readonly authorizationApiClientConverter: AuthorizationApiClientConverter;

    constructor(
        authorizationApi: AuthorizationApi,
        authorizationApiClientConverter: AuthorizationApiClientConverter,
    ) {
        this.authorizationApi = authorizationApi;
        this.authorizationApiClientConverter = authorizationApiClientConverter;
    }

    async auth(
        authorizationRequest: AuthorizationRequest,
    ): Promise<ApiResponse<AuthorizationResponse>> {
        return await handleResponse(
            this.authorizationApi.auth(
                this.authorizationApiClientConverter.toAuthorizationRequestDto(
                    authorizationRequest,
                ),
            ),
            this.authorizationApiClientConverter.toAuthorizationResponse.bind(this.authorizationApiClientConverter),
        );
    }
}
