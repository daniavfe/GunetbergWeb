import Comment from "../domain/comment/comment";
import CreateCommentRequest from "../domain/comment/createCommentRequest";
import GetCommentRequest from "../domain/comment/getCommentRequest";
import GetCommentsRequest from "../domain/comment/getCommentsRequest";
import { ApiResponse } from "../domain/common/apiResponse";
import PaginatedResponse from "../domain/common/paginatedResponse";
import CommentApiPort from "../ports/commentApiPort";
import CreateCommentRequestValidator from "./validators/createCommentRequestValidator";

export default class CommentBusiness {
    private commentApiPort: CommentApiPort;

    constructor(commentApiPort: CommentApiPort) {
        this.commentApiPort = commentApiPort;
    }

    async attemptCreateComment(
        createCommentRequest: CreateCommentRequest,
    ): Promise<ApiResponse<string>> {
        const validator = new CreateCommentRequestValidator();
        const validationErrors = validator.validateModel(createCommentRequest);

        if (validationErrors.size > 0) {
            return new ApiResponse<string>(undefined, validationErrors);
        }

        return await this.commentApiPort.createComment(createCommentRequest);
    }

    async getComments(
        getCommentRequest: GetCommentsRequest,
    ): Promise<ApiResponse<PaginatedResponse<Comment>>> {
        return await this.commentApiPort.getComments(getCommentRequest);
    }

    async getComment(
        getCommentRequest: GetCommentRequest,
    ): Promise<ApiResponse<Comment>> {
        return await this.commentApiPort.getComment(getCommentRequest);
    }
}
