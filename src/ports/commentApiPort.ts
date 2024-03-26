import CreateCommentRequest from "../domain/comment/createCommentRequest";
import GetCommentsRequest from "../domain/comment/getCommentsRequest";
import PaginatedResponse from "../domain/common/paginatedResponse";
import Comment from "../domain/comment/comment";
import GetCommentRequest from "../domain/comment/getCommentRequest";
import { ApiResponse } from "../domain/common/apiResponse";

export default interface CommentApiPort {
    createComment(
        createCommentRequest: CreateCommentRequest,
    ): Promise<ApiResponse<string>>;

    getComments(
        getCommentsRequest: GetCommentsRequest,
    ): Promise<ApiResponse<PaginatedResponse<Comment>>>;

    getComment(
        getCommentRequest: GetCommentRequest,
    ): Promise<ApiResponse<Comment>>;
}
