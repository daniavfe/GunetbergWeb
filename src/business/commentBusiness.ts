import Comment from "../domain/comment/comment";
import CreateCommentRequest from "../domain/comment/createCommentRequest";
import GetCommentRequest from "../domain/comment/getCommentRequest";
import GetCommentsRequest from "../domain/comment/getCommentsRequest";
import PaginatedResponse from "../domain/common/paginatedResponse";
import ErrorCode from "../domain/error/errorCode";
import CommentApiPort from "../ports/commentApiPort";
import CreateCommentRequestValidator from "./validators/createCommentRequestValidator";

export default class CommentBusiness {
    private commentApiPort: CommentApiPort;

    constructor(commentApiPort: CommentApiPort) {
        this.commentApiPort = commentApiPort;
    }

    async attemptCreateComment(
        createCommentRequest: CreateCommentRequest
        ): Promise<[string?, Set<ErrorCode>?]> {

            const validator = new CreateCommentRequestValidator();
            const validationErrors = validator.validateModel(createCommentRequest);

            if (validationErrors.size > 0) {
                return [, validationErrors];
            }

            return await this.commentApiPort.createComment(createCommentRequest);
    }

    async getComments(
        getCommentRequest: GetCommentsRequest
    ): Promise<PaginatedResponse<Comment>> {
        return await this.commentApiPort.getComments(getCommentRequest);
    }

    async getComment(
        getCommentRequest: GetCommentRequest
    ){
        return await this.commentApiPort.getComment(getCommentRequest);
    }
}