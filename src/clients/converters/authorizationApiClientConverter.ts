import {
    AuthorizationRequestDto,
    AuthorizationResponseDto,
} from "@gunetberg/gunetberg-client";
import AuthorizationRequest from "../../domain/authorization/authorizationRequest";
import AuthorizationResponse from "../../domain/authorization/authorizationResponse";

export default class AuthorizationApiClientConverter {
    toAuthorizationResponse(
        authorizationResponseDto: AuthorizationResponseDto,
    ): AuthorizationResponse {
        return new AuthorizationResponse(authorizationResponseDto.accessToken);
    }

    toAuthorizationRequestDto(
        authorizationRequest: AuthorizationRequest,
    ): AuthorizationRequestDto {
        return {
            email: authorizationRequest.email,
            password: authorizationRequest.password,
        };
    }
}
