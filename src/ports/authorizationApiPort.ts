import AuthorizationRequest from "../domain/authorization/authorizationRequest";
import AuthorizationResponse from "../domain/authorization/authorizationResponse";
import ErrorCode from "../domain/error/errorCode";

export default interface AuthorizationApiPort {
    auth(
        authorizationRquest: AuthorizationRequest,
    ): Promise<[AuthorizationResponse?, Set<ErrorCode>?]>;
}
