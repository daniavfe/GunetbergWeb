/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */
import type { CommentDtoPaginationResultDto } from '../models/CommentDtoPaginationResultDto';
import type { CreateCommentRequestDto } from '../models/CreateCommentRequestDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CommentService {

    /**
     * @param postId 
     * @param commentId 
     * @param requestBody 
     * @returns string Success
     * @throws ApiError
     */
    public static postPostsComments(
postId: string,
commentId?: string,
requestBody?: CreateCommentRequestDto,
): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/posts/{postId}/comments',
            path: {
                'postId': postId,
            },
            query: {
                'commentId': commentId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param postId 
     * @param commentId 
     * @param page 
     * @param itemsPerPage 
     * @returns CommentDtoPaginationResultDto Success
     * @throws ApiError
     */
    public static getPostsComments(
postId: string,
commentId?: string,
page?: number,
itemsPerPage?: number,
): CancelablePromise<CommentDtoPaginationResultDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/posts/{postId}/comments',
            path: {
                'postId': postId,
            },
            query: {
                'commentId': commentId,
                'page': page,
                'itemsPerPage': itemsPerPage,
            },
        });
    }

}
