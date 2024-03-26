import AuthorizationRequest from "../domain/authorization/authorizationRequest";
import AuthorizationResponse from "../domain/authorization/authorizationResponse";
import { ApiResponse } from "../domain/common/apiResponse";

export default interface AuthorizationApiPort {
    auth(
        authorizationRquest: AuthorizationRequest,
    ): Promise<ApiResponse<AuthorizationResponse>>;
}
