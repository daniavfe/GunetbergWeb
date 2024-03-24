import CreateCommentRequest from "../../domain/comment/createCommentRequest";
import ErrorCode from "../../domain/error/errorCode";
import CustomValidator from "./customValidator";

export default class CreateCommentRequestValidator extends CustomValidator<CreateCommentRequest> {
    constructor() {
        super();
        this.ruleFor("content")
            .notEmpty()
            .withMessage(ErrorCode[ErrorCode.EmptyComment])
        this.ruleFor("postId")
            .notEmpty()
            .withMessage(ErrorCode[ErrorCode.EmptyPostId]);
    }
}