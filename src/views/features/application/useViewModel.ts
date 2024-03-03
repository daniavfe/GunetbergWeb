import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../config/di/eventBusModule";
import { useCookieUtil, useUserUtil } from "../../../config/di/utilModule";
import { useHttpPort, useUserApiPort } from "../../../config/di/businessModule";
import ErrorBody from "../../../domain/error/errorBody";
import ErrorCode from "../../../domain/error/errorCode";
import NotificationMessage from "../../../domain/notification/notificationMessage";
import { NotificationType } from "../../../domain/notification/notificationType";
import { useEffect, useState } from "react";
import User from "../../../domain/user/user";

const useViewModel = () => {
    const notification = useNotification();
    const cookieUtil = useCookieUtil();
    const httpPort = useHttpPort();
    const userUtil = useUserUtil();
    const navigate = useNavigate();
    const userApiPort = useUserApiPort();

    const retrieveCurrentUser = async () => {
        try {
            const user = await userApiPort.getCurrentUser();
            setUser(user);
        } catch (exception) {
            notification.invoke(
                new NotificationMessage(
                    "Current user couldn't be retrieved",
                    NotificationType.error,
                ),
            );
        }
    };

    const unauthorizedErrorHandler = (): ErrorBody[] => {
        notification.invoke(
            new NotificationMessage(
                "You need to login in for doing that",
                NotificationType.warning,
            ),
        );
        navigate("/login");
        return [
            new ErrorBody(
                ErrorCode.HandledByIterceptor,
                ErrorCode.HandledByIterceptor.toString(),
            ),
        ];
    };

    const forbiddenErrorHandler = (): ErrorBody[] => {
        notification.invoke(
            new NotificationMessage(
                "You dont have permissions for doing that action, login with the correct account",
                NotificationType.warning,
            ),
        );
        navigate("/login");
        return [
            new ErrorBody(
                ErrorCode.HandledByIterceptor,
                ErrorCode.HandledByIterceptor.toString(),
            ),
        ];
    };

    const errorHandler = (): ErrorBody[] => {
        notification.invoke(
            new NotificationMessage(
                "Something wrong happened",
                NotificationType.warning,
            ),
        );
        return [
            new ErrorBody(
                ErrorCode.HandledByIterceptor,
                ErrorCode.HandledByIterceptor.toString(),
            ),
        ];
    };

    const authorizationHandler = (): string => {
        const token = cookieUtil.read<string>("accessToken");
        return !!token ? `Bearer ${token}` : "";
    };

    httpPort.addAuthorizationHandler(authorizationHandler);
    httpPort.addErrorsHandlers(
        unauthorizedErrorHandler,
        forbiddenErrorHandler,
        errorHandler,
    );

    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (userUtil.isUserLoggedIn()) {
            retrieveCurrentUser();
        }
    }, []);

    return {
        user: user
    }
};

export default useViewModel;
