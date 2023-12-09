/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */
import type { CreateTagRequestDto } from '../models/CreateTagRequestDto';
import type { SimpleTagDto } from '../models/SimpleTagDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TagService {

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postTags(
requestBody?: Array<CreateTagRequestDto>,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tags',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns SimpleTagDto Success
     * @throws ApiError
     */
    public static getTags(): CancelablePromise<Array<SimpleTagDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tags',
        });
    }

}
