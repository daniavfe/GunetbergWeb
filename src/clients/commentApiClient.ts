import { CommentApi } from "@gunetberg/gunetberg-client";
import CommentApiPort from "../ports/commentApiPort";
import CommentApiClientConverter from "./converters/commentApiClientConverter";
import CreateCommentRequest from "../domain/comment/createCommentRequest";
import GetCommentsRequest from "../domain/comment/getCommentsRequest";
import PaginatedResponse from "../domain/common/paginatedResponse";
import Comment from "../domain/comment/comment";
import ErrorCode from "../domain/error/errorCode";
import handleResponse from "./utils/httpUtils";
import GetCommentRequest from "../domain/comment/getCommentRequest";
import { ApiResponse } from "../domain/common/apiResponse";

export default class CommentApiClient implements CommentApiPort {
    readonly commentApi: CommentApi;
    readonly commentApiClientConverter: CommentApiClientConverter;

    constructor(
        commentApi: CommentApi,
        commentApiClientConverter: CommentApiClientConverter,
    ) {
        this.commentApi = commentApi;
        this.commentApiClientConverter = commentApiClientConverter;
    }

    async createComment(
        createCommentRequest: CreateCommentRequest,
    ): Promise<ApiResponse<string>> {
        return await handleResponse(
            this.commentApi.createComment(
                createCommentRequest.postId,
                createCommentRequest.commentId,
                this.commentApiClientConverter.toCreateCommentRequestDto(
                    createCommentRequest,
                ),
            ),
            (x) => x,
        );
    }

    async getComments(
        getCommentsRequest: GetCommentsRequest,
    ): Promise<ApiResponse<PaginatedResponse<Comment>>> {
        return await handleResponse(
            this.commentApi.getComments(
                getCommentsRequest.postId,
                getCommentsRequest.commentId,
                getCommentsRequest.page,
                getCommentsRequest.itemsPerPage,
            ),
            this.commentApiClientConverter.toCommentPaginatedResponse.bind(this.commentApiClientConverter),
        );
    }

    async getComment(
        getCommentRequest: GetCommentRequest,
    ): Promise<ApiResponse<Comment>> {
        return await handleResponse(
            this.commentApi.getComment(
                getCommentRequest.postId,
                getCommentRequest.commentId,
            ),
            this.commentApiClientConverter.toComment.bind(this.commentApiClientConverter),
        );
    }
}
