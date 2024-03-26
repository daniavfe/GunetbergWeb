import { useEffect, useState } from "react";
import AuthorizationRequest from "../../../domain/authorization/authorizationRequest";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../config/di/eventBusModule";
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

        const response =
            await authorizationBusiness.attemptAuthorization(
                authorizationRequest,
            );

        if (response.hasErrors) {
            const errors = response.getErrors();
            setAuthorizationError(
                new AuthorizationError(
                    errors.has(ErrorCode.EmptyEmail),
                    errors.has(ErrorCode.IncorrectEmail),
                    errors.has(ErrorCode.EmptyPassword),
                    errors.has(ErrorCode.AuthorizationUserNotFound),
                ),
            );

            setIsLoading(false);
            return;
        }
        cookieUtil.write("accessToken", response.getData().accessToken);
        notification.invoke(
            new NotificationMessage("Welcome back", NotificationType.info),
        );
        navigate("/");
    };

    const checkUserStatus = async () => {
        if (userUtil.isUserLoggedIn()) {
            navigate("/");
        }
    };

    const [authorizationRequest, setAuthorizationRequest] =
        useState<AuthorizationRequest>(new AuthorizationRequest("", ""));
    const [authorizationError, setAuthorizationError] =
        useState<AuthorizationError>();
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
