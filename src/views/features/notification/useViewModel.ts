import { useEffect, useState } from "react";
import { useNotification } from "../../../config/di/eventBusModule";
import NotificationMessage from "../../../domain/notification/notificationMessage";

const useViewModel = () => {
    const notification = useNotification();

    const onNotificationReceived = (notification: NotificationMessage) => {
        setNotifications([...notifications, notification]);
    };

    notification.subscribe(this, onNotificationReceived);

    const removeNotification = (index: number)=> {
        notifications.splice(index, 1);
        setNotifications([...notifications]);
    }

    const [notifications, setNotifications] = useState<NotificationMessage[]>(
        [],
    );

    useEffect(() => {
        return () => {
            notification.unsubscribe(this);
        };
    }, []);

    return {
        notifications: notifications,
        removeNotification: removeNotification
    };
};

export default useViewModel;
