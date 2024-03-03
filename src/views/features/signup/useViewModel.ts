import { useState } from "react";
import { useUserApiPort } from "../../../config/di/businessModule";
import CreateUserRequest from "../../../domain/user/createUserRequest";

const useViewModel = () => {
    const userApiPort = useUserApiPort();

    const attemptSignup = async () => {
        if (!createUserRequest) {
            return;
        }
        try {
            await userApiPort.createUser(createUserRequest);
        } catch (exception) {
            console.log("adfasdf");
        }
    };

    const updateAlias = (alias: string) => {
        setCreateUserRequest({
            ...createUserRequest,
            alias: alias,
        } as CreateUserRequest);
    };

    const updateEmail = (email: string) => {
        setCreateUserRequest({
            ...createUserRequest,
            email: email,
        } as CreateUserRequest);
    };

    const updatePassword = (password: string) => {
        setCreateUserRequest({
            ...createUserRequest,
            password: password,
        } as CreateUserRequest);
    };

    const updatePasswordCheck = (passwordCheck: string) => {
        setCreateUserRequest({
            ...createUserRequest,
            passwordCheck: passwordCheck,
        } as CreateUserRequest);
    };

    const [createUserRequest, setCreateUserRequest] =
        useState<CreateUserRequest>(new CreateUserRequest("", "", "", ""));

    return {
        createUserRequest,
        attemptSignup,
        updateAlias,
        updateEmail,
        updatePassword,
        updatePasswordCheck,
    };
};

export default useViewModel;
