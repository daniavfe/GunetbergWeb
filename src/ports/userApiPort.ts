import CreateUserRequest from "../domain/user/createUserRequest";
import CompletePublicUser from "../domain/user/completePublicUser";
import User from "../domain/user/user";
import UpdateUserPhotoRequest from "../domain/user/updateUserPhotoRequest";
import UpdateUserDescriptionRequest from "../domain/user/updateUserDescriptionRequest";

export default interface UserApiPort {
    createUser(createUserRequest: CreateUserRequest): Promise<string>;

    updateUserDescription(
        updateUserDescriptionRequest: UpdateUserDescriptionRequest,
    ): Promise<void>;

    updateUserPhoto(
        updateUserPhotoRequest: UpdateUserPhotoRequest,
    ): Promise<void>;

    getCurrentUser(): Promise<User>;

    getPublicUser(id: string): Promise<CompletePublicUser>;
}
