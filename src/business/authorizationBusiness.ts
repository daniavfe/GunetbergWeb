import AuthorizationRequest from "../domain/authorization/authorizationRequest";
import AuthorizationResponse from "../domain/authorization/authorizationResponse";
import ErrorCode from "../domain/error/errorCode";
import AuthorizationApiPort from "../ports/authorizationApiPort";
import AuthorizationRequestValidator from "./validators/authorizationRequestValidator";

export default class AuthorizationBusiness {
    private authorizationApi: AuthorizationApiPort;

    constructor(authorizationApi: AuthorizationApiPort) {
        this.authorizationApi = authorizationApi;
    }

    async attemptAuthorization(
        authorizationRequest: AuthorizationRequest,
    ): Promise<[AuthorizationResponse?, Set<ErrorCode>?]> {
        const validator = new AuthorizationRequestValidator();
        const validationErrors = validator.validateModel(authorizationRequest);

        if (validationErrors.size > 0) {
            return [, validationErrors];
        }

        return await this.authorizationApi.auth(authorizationRequest);
    }
}
