/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */
import type { CreateUserRequestDto } from '../models/CreateUserRequestDto';
import type { PublicUserDto } from '../models/PublicUserDto';
import type { UpdateUserRequestDto } from '../models/UpdateUserRequestDto';
import type { UserDto } from '../models/UserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * @param requestBody 
     * @returns string Success
     * @throws ApiError
     */
    public static postUsers(
requestBody?: CreateUserRequestDto,
): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static putUsers(
requestBody?: UpdateUserRequestDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/users',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns UserDto Success
     * @throws ApiError
     */
    public static getUsersMe(): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me',
        });
    }

    /**
     * @param userId 
     * @returns PublicUserDto Success
     * @throws ApiError
     */
    public static getUsersPublic(
userId: string,
): CancelablePromise<PublicUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/public/{userId}',
            path: {
                'userId': userId,
            },
        });
    }

}
