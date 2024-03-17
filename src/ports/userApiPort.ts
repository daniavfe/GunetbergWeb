import CreateUserRequest from "../domain/user/createUserRequest";
import CompletePublicUser from "../domain/user/completePublicUser";
import User from "../domain/user/user";
import UpdateUserPhotoRequest from "../domain/user/updateUserPhotoRequest";
import UpdateUserDescriptionRequest from "../domain/user/updateUserDescriptionRequest";
import ErrorCode from "../domain/error/errorCode";

export default interface UserApiPort {
    createUser(createUserRequest: CreateUserRequest): Promise<[string?, Set<ErrorCode>?]>;

    updateUserDescription(
        updateUserDescriptionRequest: UpdateUserDescriptionRequest,
    ): Promise<void>;

    updateUserPhoto(
        updateUserPhotoRequest: UpdateUserPhotoRequest,
    ): Promise<void>;

    getCurrentUser(): Promise<User>;

    getPublicUserById(id: string): Promise<CompletePublicUser>;

    getPublicUserByAlias(alias: string): Promise<CompletePublicUser>;
}
