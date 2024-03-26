import { useState } from "react";
import { useUserBusiness } from "../../../config/di/businessModule";
import CreateUserRequest from "../../../domain/user/createUserRequest";
import { useNavigate } from "react-router-dom";
import CreateUserError from "../../../domain/user/createUserError";
import ErrorCode from "../../../domain/error/errorCode";

const useViewModel = () => {
    const navigate = useNavigate();
    const userBusiness = useUserBusiness();

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

    const canSignup = () => {
        return (
            !!createUserRequest.alias &&
            !!createUserRequest.email &&
            !!createUserRequest.password &&
            !!createUserRequest.passwordCheck
        );
    };

    const attemptSignup = async () => {
        setIsLoading(true);

        const response =
            await userBusiness.attemptCreateUser(createUserRequest);

        if (response.hasErrors) {
            const errors = response.getErrors();
            setCreateUserError(
                new CreateUserError(
                    errors.has(ErrorCode.EmptyAlias),
                    errors.has(ErrorCode.EmptyEmail),
                    errors.has(ErrorCode.IncorrectEmail),
                    errors.has(ErrorCode.EmptyPassword),
                    errors.has(ErrorCode.EmptyPasswordCheck),
                    errors.has(ErrorCode.PasswordsMismatch),
                    errors.has(ErrorCode.AliasAlreadyInUse),
                    errors.has(ErrorCode.EmailAlreadyInUse),
                ),
            );
            setIsLoading(false);
            return;
        }

        navigate("/login");
        return;
    };

    const [createUserRequest, setCreateUserRequest] =
        useState<CreateUserRequest>(new CreateUserRequest("", "", "", ""));

    const [createUserError, setCreateUserError] = useState<CreateUserError>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return {
        createUserRequest,
        attemptSignup,
        updateAlias,
        updateEmail,
        updatePassword,
        updatePasswordCheck,
        createUserError,
        canSignup,
        isLoading,
    };
};

export default useViewModel;
