import { useEffect, useState } from "react";
import AuthorizationRequest from "../../../domain/authorization/authorizationRequest";
import { useNavigate } from "react-router-dom";
import {
    useNotification,
    useUserStatus,
} from "../../../config/di/eventBusModule";
import { useCookieUtil, useUserUtil } from "../../../config/di/utilModule";
import NotificationMessage from "../../../domain/notification/notificationMessage";
import { NotificationType } from "../../../domain/notification/notificationType";
import AuthorizationError from "../../../domain/authorization/authorizationError";
import ErrorCode from "../../../domain/error/errorCode";
import { useAuthorizationBusiness } from "../../../config/di/businessModule";

const useViewModel = () => {
    const navigate = useNavigate();
    const notification = useNotification();
    const userUtil = useUserUtil();
    const cookieUtil = useCookieUtil();

    const authorizationBusiness = useAuthorizationBusiness();

    const updateEmail = (email: string) => {
        setAuthorizationRequest({
            ...authorizationRequest,
            email: email,
        } as AuthorizationRequest);
    };

    const updatePassword = (password: string) => {
        setAuthorizationRequest({
            ...authorizationRequest,
            password: password,
        } as AuthorizationRequest);
    };

    const attemptLogin = async () => {
        setIsLoading(true);

        const authorizationAttempt =
            await authorizationBusiness.attemptAuthorization(
                authorizationRequest,
            );

        if (!!authorizationAttempt[0]) {
            cookieUtil.write(
                "accessToken",
                authorizationAttempt[0].accessToken,
            );
            notification.invoke(
                new NotificationMessage(
                    "Login successfully",
                    NotificationType.info,
                ),
            );
            navigate("/");
            return;
        }

        if (!!authorizationAttempt[1]) {
            setAuthorizationError(
                new AuthorizationError(
                    authorizationAttempt[1].has(ErrorCode.EmptyEmail),
                    authorizationAttempt[1].has(ErrorCode.IncorrectEmail),
                    authorizationAttempt[1].has(ErrorCode.EmptyPassword),
                    authorizationAttempt[1].has(
                        ErrorCode.AuthorizationUserNotFound,
                    ),
                ),
            );

            setIsLoading(false);
            return;
        }

        console.log("Something horrible has happened");
    };

    const checkUserStatus = async () => {
        if (userUtil.isUserLoggedIn()) {
            navigate("/");
        }
    };

    const [authorizationRequest, setAuthorizationRequest] =
        useState<AuthorizationRequest>(new AuthorizationRequest("", ""));
    const [authorizationError, setAuthorizationError] = useState<AuthorizationError>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        checkUserStatus();
    }, []);

    return {
        isLoading,
        authorizationRequest,
        authorizationError,
        updateEmail,
        updatePassword,
        attemptLogin,
    };
};

export default useViewModel;
