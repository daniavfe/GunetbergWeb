import {
    CompletePublicUserDto,
    CreateUserRequestDto,
    PublicUserDto,
    UpdateUserDescriptionRequestDto,
    UpdateUserPhotoRequestDto,
    UserDto,
} from "@gunetberg/gunetberg-client";
import CreateUserRequest from "../../domain/user/createUserRequest";
import UpdateUserDescriptionRequest from "../../domain/user/updateUserDescriptionRequest";
import UpdateUserPhotoRequest from "../../domain/user/updateUserPhotoRequest";
import CompletePublicUser from "../../domain/user/completePublicUser";
import User from "../../domain/user/user";
import PublicUser from "../../domain/user/publicUser";

export default class UserApiClientConverter {
    toCreateUserRequestDto(
        createUserRequest: CreateUserRequest,
    ): CreateUserRequestDto {
        return {
            alias: createUserRequest.alias,
            email: createUserRequest.email,
            password: createUserRequest.password,
            passwordCheck: createUserRequest.passwordCheck,
        };
    }

    toUpdateUserDescriptionRequestDto(
        updateUserDescriptionRequest: UpdateUserDescriptionRequest,
    ): UpdateUserDescriptionRequestDto {
        return {
            description: updateUserDescriptionRequest.description,
        };
    }

    toUpdateUserPhotoRequestDto(
        updateUserPhotoRequest: UpdateUserPhotoRequest,
    ): UpdateUserPhotoRequestDto {
        return {
            photoUrl: updateUserPhotoRequest.photoUrl,
        };
    }

    toCompletePublicUserDto(
        completePublicUser: CompletePublicUser,
    ): CompletePublicUserDto {
        return {
            id: completePublicUser.id,
            alias: completePublicUser.alias,
            photoUrl: completePublicUser.photoUrl,
            description: completePublicUser.description,
        };
    }

    toUserDto(user: User): UserDto {
        return {
            id: user.id,
            email: user.email,
            alias: user.alias,
            photoUrl: user.photoUrl,
            description: user.description,
        };
    }

    toCompletePublicUser(
        completePublicUserDto: CompletePublicUserDto,
    ): CompletePublicUser {
        return new CompletePublicUser(
            completePublicUserDto.id,
            completePublicUserDto.alias,
            completePublicUserDto.photoUrl,
            completePublicUserDto.description,
        );
    }

    toPublicUser(publicUserDto: PublicUserDto): PublicUser {
        return new PublicUser(
            publicUserDto.id,
            publicUserDto.alias,
            publicUserDto.photoUrl,
        );
    }

    toUser(userDto: UserDto): User {
        return new User(
            userDto.id,
            userDto.email,
            userDto.alias,
            userDto.photoUrl,
            userDto.description,
        );
    }
}
