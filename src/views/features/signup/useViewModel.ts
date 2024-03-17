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

    const canSignup = ()=> {
        return !!createUserRequest.alias && 
            !!createUserRequest.email && 
            !!createUserRequest.password &&
            !!createUserRequest.passwordCheck;
    }

    const attemptSignup = async () => {
        setIsLoading(true);

        const createUserAttempt = await userBusiness.attemptCreateUser(
            createUserRequest
        );

        if(!!createUserAttempt[0]) {
            navigate("/login");
            return;
        }

        if(!!createUserAttempt[1]){
            setCreateUserError(
                new CreateUserError(
                    createUserAttempt[1].has(ErrorCode.EmptyAlias),
                    createUserAttempt[1].has(ErrorCode.EmptyEmail),
                    createUserAttempt[1].has(ErrorCode.IncorrectEmail),
                    createUserAttempt[1].has(ErrorCode.EmptyPassword),
                    createUserAttempt[1].has(ErrorCode.EmptyPasswordCheck),
                    createUserAttempt[1].has(ErrorCode.PasswordsMismatch),
                    createUserAttempt[1].has(ErrorCode.AliasAlreadyInUse),
                    createUserAttempt[1].has(ErrorCode.EmailAlreadyInUse)
                )
            );
            setIsLoading(false);
            return;
        }

        console.log("Something horrible has happened");
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
