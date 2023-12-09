/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ErrorService {

    /**
     * @returns string Success
     * @throws ApiError
     */
    public static postError(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/error',
        });
    }

    /**
     * @returns string Success
     * @throws ApiError
     */
    public static getError(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/error',
        });
    }

}
