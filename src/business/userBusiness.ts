import { ApiResponse } from "../domain/common/apiResponse";
import ErrorCode from "../domain/error/errorCode";
import CreateUserRequest from "../domain/user/createUserRequest";
import UserApiPort from "../ports/userApiPort";
import CreateUserRequestValidator from "./validators/createUserRequestValidator";

export default class UserBusiness {
    private userApiPort: UserApiPort;

    constructor(userApiPort: UserApiPort) {
        this.userApiPort = userApiPort;
    }

    async attemptCreateUser(
        createUserRequest: CreateUserRequest,
    ): Promise<ApiResponse<string>> {
        const validator = new CreateUserRequestValidator();
        const validationErrors = validator.validateModel(createUserRequest);

        if (validationErrors.size > 0) {
            return new ApiResponse<string>(undefined, validationErrors);
        }

        return await this.userApiPort.createUser(createUserRequest);
    }
}
