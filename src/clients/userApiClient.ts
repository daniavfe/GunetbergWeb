import { UserApi } from "@gunetberg/gunetberg-client";
import UserApiPort from "../ports/userApiPort";
import UserApiClientConverter from "./converters/userApiClientConverter";
import CreateUserRequest from "../domain/user/createUserRequest";
import UpdateUserDescriptionRequest from "../domain/user/updateUserDescriptionRequest";
import UpdateUserPhotoRequest from "../domain/user/updateUserPhotoRequest";
import User from "../domain/user/user";
import CompletePublicUser from "../domain/user/completePublicUser";
import handleResponse from "./utils/httpUtils";
import { ApiResponse } from "../domain/common/apiResponse";

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

    async createUser(
        createUserRequest: CreateUserRequest,
    ): Promise<ApiResponse<string>> {
        return await handleResponse(
            this.userApi.createUser(
                this.userApiClientConverter.toCreateUserRequestDto(
                    createUserRequest,
                ),
            ),
            (x: string) => x,
        );
    }

    async updateUserDescription(
        updateUserDescriptionRequest: UpdateUserDescriptionRequest,
    ): Promise<ApiResponse<void>> {
        return await handleResponse(
            this.userApi.updateUserDescription(
                this.userApiClientConverter.toUpdateUserDescriptionRequestDto(
                    updateUserDescriptionRequest,
                ),
            ),
            (x) => {},
        );
    }

    async updateUserPhoto(
        updateUserPhotoRequest: UpdateUserPhotoRequest,
    ): Promise<ApiResponse<void>> {
        return await handleResponse(
            this.userApi.updateUserPhoto(
                this.userApiClientConverter.toUpdateUserPhotoRequestDto(
                    updateUserPhotoRequest,
                ),
            ),
            (x) => {},
        );
    }

    async getCurrentUser(): Promise<ApiResponse<User>> {
        return await handleResponse(
            this.userApi.getCurrentUser(),
            this.userApiClientConverter.toUser,
        );
    }

    async getPublicUserById(
        id: string,
    ): Promise<ApiResponse<CompletePublicUser>> {
        return await handleResponse(
            this.userApi.getPublicUserById(id),
            this.userApiClientConverter.toCompletePublicUser,
        );
    }

    async getPublicUserByAlias(
        alias: string,
    ): Promise<ApiResponse<CompletePublicUser>> {
        return await handleResponse(
            this.userApi.getPublicUserByAlias(alias),
            this.userApiClientConverter.toCompletePublicUser,
        );
    }
}
