import CreateCommentRequest from "../domain/comment/createCommentRequest";
import GetCommentsRequest from "../domain/comment/getCommentsRequest";
import PaginatedResponse from "../domain/common/paginatedResponse";
import Comment from "../domain/comment/comment";
import ErrorCode from "../domain/error/errorCode";
import GetCommentRequest from "../domain/comment/getCommentRequest";

export default interface CommentApiPort {
    createComment(createCommentRequest: CreateCommentRequest): Promise<[string?, Set<ErrorCode>?]>;

    getComments(
        getCommentsRequest: GetCommentsRequest,
    ): Promise<PaginatedResponse<Comment>>;

    getComment(
        getCommentRequest: GetCommentRequest
    ): Promise<Comment>;
}
