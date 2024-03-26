import AuthorizationRequest from "../domain/authorization/authorizationRequest";
import AuthorizationResponse from "../domain/authorization/authorizationResponse";
import { ApiResponse } from "../domain/common/apiResponse";

import AuthorizationApiPort from "../ports/authorizationApiPort";
import AuthorizationRequestValidator from "./validators/authorizationRequestValidator";

export default class AuthorizationBusiness {
    private authorizationApi: AuthorizationApiPort;

    constructor(authorizationApi: AuthorizationApiPort) {
        this.authorizationApi = authorizationApi;
    }

    async attemptAuthorization(
        authorizationRequest: AuthorizationRequest,
    ): Promise<ApiResponse<AuthorizationResponse>> {
        const validator = new AuthorizationRequestValidator();
        const validationErrors = validator.validateModel(authorizationRequest);

        if (validationErrors.size > 0) {
            return new ApiResponse<AuthorizationResponse>(
                undefined,
                validationErrors,
            );
        }

        return await this.authorizationApi.auth(authorizationRequest);
    }
}
