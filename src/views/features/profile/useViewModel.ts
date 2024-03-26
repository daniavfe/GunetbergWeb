import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserApiPort } from "../../../config/di/businessModule";
import CompletePublicUser from "../../../domain/user/completePublicUser";
import { useNotification } from "../../../config/di/eventBusModule";
import NotificationMessage from "../../../domain/notification/notificationMessage";
import { NotificationType } from "../../../domain/notification/notificationType";

const useViewModel = () => {
    const { alias } = useParams();

    const userApiPort = useUserApiPort();
    const notification = useNotification();

    const loadUser = async () => {
        if (!alias) {
            return;
        }

        setIsLoading(true);
        const response = await userApiPort.getPublicUserByAlias(alias);
        
        if (response.hasErrors) {
            notification.invoke(
                new NotificationMessage(
                    "Error while retrieving user",
                    NotificationType.error,
                ),
            );
            return;
        }

        setUser(response.getData());
        setIsLoading(false);
    };

    const [user, setUser] = useState<CompletePublicUser>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        loadUser();
    }, []);

    useEffect(() => {
        loadUser();
    }, [alias]);

    return {
        user: user,
        isLoading: isLoading,
    };
};

export default useViewModel;
