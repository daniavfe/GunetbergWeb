import AuthorizationRequest from "../../domain/authorization/authorizationRequest";
import ErrorCode from "../../domain/error/errorCode";
import CustomValidator from "./customValidator";

export default class AuthorizationRequestValidator extends CustomValidator<AuthorizationRequest> {
    constructor() {
        super();
        this.ruleFor("email")
            .notEmpty()
            .withMessage(ErrorCode[ErrorCode.EmptyEmail])
            .emailAddress()
            .withMessage(ErrorCode[ErrorCode.IncorrectEmail]);
        this.ruleFor("password")
            .notEmpty()
            .withMessage(ErrorCode[ErrorCode.EmptyPassword]);
    }
}
