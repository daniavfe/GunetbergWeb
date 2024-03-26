import ErrorCode from "../../domain/error/errorCode";
import CreateUserRequest from "../../domain/user/createUserRequest";
import CustomValidator from "./customValidator";

export default class CreateUserRequestValidator extends CustomValidator<CreateUserRequest> {
    constructor() {
        super();
        this.ruleFor("alias")
            .notEmpty()
            .withMessage(ErrorCode[ErrorCode.EmptyAlias]);
        this.ruleFor("email")
            .notEmpty()
            .withMessage(ErrorCode[ErrorCode.EmptyEmail])
            .emailAddress()
            .withMessage(ErrorCode[ErrorCode.IncorrectEmail]);
        this.ruleFor("password")
            .notEmpty()
            .withMessage(ErrorCode[ErrorCode.EmptyPassword]);
        this.ruleFor("passwordCheck")
            .notEmpty()
            .withMessage(ErrorCode[ErrorCode.EmptyPasswordCheck])
            .must((value, model) => value === model.password)
            .withMessage(ErrorCode[ErrorCode.PasswordsMismatch]);
    }
}
