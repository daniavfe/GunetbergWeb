import CreateCommentRequest from "../domain/comment/createCommentRequest";
import GetCommentsRequest from "../domain/comment/getCommentsRequest";
import PaginatedResponse from "../domain/common/paginatedResponse";
import Comment from "../domain/comment/comment";

export default interface CommentApiPort {
    createComment(createCommentRequest: CreateCommentRequest): Promise<string>;

    getComments(
        getCommentsRequest: GetCommentsRequest,
    ): Promise<PaginatedResponse<Comment>>;
}
