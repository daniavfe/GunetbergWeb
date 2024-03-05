import { UserApi } from "@gunetberg/gunetberg-client";
import UserApiPort from "../ports/userApiPort";
import UserApiClientConverter from "./converters/userApiClientConverter";
import CreateUserRequest from "../domain/user/createUserRequest";
import UpdateUserDescriptionRequest from "../domain/user/updateUserDescriptionRequest";
import UpdateUserPhotoRequest from "../domain/user/updateUserPhotoRequest";
import User from "../domain/user/user";
import CompletePublicUser from "../domain/user/completePublicUser";

export default class UserApiClient implements UserApiPort {
    readonly userApi: UserApi;
    readonly userApiClientConverter: UserApiClientConverter;

    constructor(
        userApi: UserApi,
        userApiClientConverter: UserApiClientConverter,
    ) {
        this.userApi = userApi;
        this.userApiClientConverter = userApiClientConverter;
    }

    async createUser(createUserRequest: CreateUserRequest): Promise<string> {
        const result = await this.userApi.createUser(
            this.userApiClientConverter.toCreateUserRequestDto(
                createUserRequest,
            ),
        );
        return result.data;
    }

    async updateUserDescription(
        updateUserDescriptionRequest: UpdateUserDescriptionRequest,
    ): Promise<void> {
        await this.userApi.updateUserDescription(
            this.userApiClientConverter.toUpdateUserDescriptionRequestDto(
                updateUserDescriptionRequest,
            ),
        );
    }

    async updateUserPhoto(
        updateUserPhotoRequest: UpdateUserPhotoRequest,
    ): Promise<void> {
        await this.userApi.updateUserPhoto(
            this.userApiClientConverter.toUpdateUserPhotoRequestDto(
                updateUserPhotoRequest,
            ),
        );
    }

    async getCurrentUser(): Promise<User> {
        const result = await this.userApi.getCurrentUser();
        return this.userApiClientConverter.toUser(result.data);
    }

    async getPublicUserById(id: string): Promise<CompletePublicUser> {
        const result = await this.userApi.getPublicUserById(id);
        return this.userApiClientConverter.toCompletePublicUser(result.data);
    }


    async getPublicUserByAlias(alias: string): Promise<CompletePublicUser> {
        const result = await this.userApi.getPublicUserByAlias(alias);
        return this.userApiClientConverter.toCompletePublicUser(result.data);
    }
}
