/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */
import type { AdminPostDtoSearchResultDto } from '../models/AdminPostDtoSearchResultDto';
import type { CompletePostDto } from '../models/CompletePostDto';
import type { CreatePostRequestDto } from '../models/CreatePostRequestDto';
import type { PostFilterRequestDtoSearchRequestDto } from '../models/PostFilterRequestDtoSearchRequestDto';
import type { SummaryPostDtoSearchResultDto } from '../models/SummaryPostDtoSearchResultDto';
import type { UpdatePostDto } from '../models/UpdatePostDto';
import type { UpdatePostRequestDto } from '../models/UpdatePostRequestDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PostService {

    /**
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public static deletePosts(
id: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/posts/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static putPosts(
id: string,
requestBody?: UpdatePostRequestDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/posts/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns UpdatePostDto Success
     * @throws ApiError
     */
    public static getPosts(
id: string,
): CancelablePromise<UpdatePostDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/posts/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns string Success
     * @throws ApiError
     */
    public static postPosts(
requestBody?: CreatePostRequestDto,
): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/posts',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param title 
     * @returns CompletePostDto Success
     * @throws ApiError
     */
    public static getPosts1(
title?: string,
): CancelablePromise<CompletePostDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/posts',
            query: {
                'title': title,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns SummaryPostDtoSearchResultDto Success
     * @throws ApiError
     */
    public static postPostsSearch(
requestBody?: PostFilterRequestDtoSearchRequestDto,
): CancelablePromise<SummaryPostDtoSearchResultDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/posts/search',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns AdminPostDtoSearchResultDto Success
     * @throws ApiError
     */
    public static postPostsAdminSearch(
requestBody?: PostFilterRequestDtoSearchRequestDto,
): CancelablePromise<AdminPostDtoSearchResultDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/posts/admin/search',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
