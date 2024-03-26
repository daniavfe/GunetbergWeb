import CreateUserRequest from "../domain/user/createUserRequest";
import CompletePublicUser from "../domain/user/completePublicUser";
import User from "../domain/user/user";
import UpdateUserPhotoRequest from "../domain/user/updateUserPhotoRequest";
import UpdateUserDescriptionRequest from "../domain/user/updateUserDescriptionRequest";
import { ApiResponse } from "../domain/common/apiResponse";

export default interface UserApiPort {
    createUser(
        createUserRequest: CreateUserRequest,
    ): Promise<ApiResponse<string>>;

    updateUserDescription(
        updateUserDescriptionRequest: UpdateUserDescriptionRequest,
    ): Promise<ApiResponse<void>>;

    updateUserPhoto(
        updateUserPhotoRequest: UpdateUserPhotoRequest,
    ): Promise<ApiResponse<void>>;

    getCurrentUser(): Promise<ApiResponse<User>>;

    getPublicUserById(id: string): Promise<ApiResponse<CompletePublicUser>>;

    getPublicUserByAlias(
        alias: string,
    ): Promise<ApiResponse<CompletePublicUser>>;
}
