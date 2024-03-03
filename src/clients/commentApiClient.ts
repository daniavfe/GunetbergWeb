import { CommentApi } from "@gunetberg/gunetberg-client";
import CommentApiPort from "../ports/commentApiPort";
import CommentApiClientConverter from "./converters/commentApiClientConverter";
import CreateCommentRequest from "../domain/comment/createCommentRequest";
import GetCommentsRequest from "../domain/comment/getCommentsRequest";
import PaginatedResponse from "../domain/common/paginatedResponse";
import Comment from "../domain/comment/comment";

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
    ): Promise<string> {
        const result = await this.commentApi.createComment(
            createCommentRequest.postId,
            createCommentRequest.commentId,
            this.commentApiClientConverter.toCreateCommentRequestDto(
                createCommentRequest,
            ),
        );

        return result.data;
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
}
