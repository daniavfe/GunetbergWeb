/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */
import type { AuthorizationRequestDto } from '../models/AuthorizationRequestDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthorizationService {

    /**
     * @param requestBody 
     * @returns string Success
     * @throws ApiError
     */
    public static postAuth(
requestBody?: AuthorizationRequestDto,
): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static getAuthValidate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/validate',
        });
    }

}
