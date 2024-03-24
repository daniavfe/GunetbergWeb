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
    ): Promise<[string?, Set<ErrorCode>?]>{
        return await handleResponse(
            this.commentApi.createComment(
                createCommentRequest.postId,
                createCommentRequest.commentId,
                this.commentApiClientConverter.toCreateCommentRequestDto(
                    createCommentRequest,
                )
            ), 
            (x)=>x
        );
    }

    async getComments(
        getCommentsRequest: GetCommentsRequest,
    ): Promise<PaginatedResponse<Comment>> {
        const result = await this.commentApi.getComments(
            getCommentsRequest.postId,
            getCommentsRequest.commentId,
            getCommentsRequest.page,
            getCommentsRequest.itemsPerPage,
        );

        return this.commentApiClientConverter.toCommentPaginatedResponse(
            result.data,
        );
    }
    
    async getComment(getCommentRequest: GetCommentRequest): Promise<Comment> {
        const result = await this.commentApi.getComment(getCommentRequest.postId, getCommentRequest.commentId);
        return this.commentApiClientConverter.toComment(result.data);
    }
}
