import { useEffect, useState } from "react";
import { Notification } from "../../model/notification/notification"
import "./notification.scss";
import { eventBus } from "../../event-bus/event-bus";

const NotificationComponent: React.FC = ()=>{ 

    const [notifications, setNotifications] = useState<Array<Notification>>([]);

    useEffect(()=>{
        eventBus.subscribe(onNotificationReceived);
    }, []);

    useEffect(()=>{
        console.log(notifications);
    }, [notifications]);

    const onNotificationReceived = (notification: Notification)=>{      
        notifications.push(notification);
        setTimeout(()=>closeNotification(notification), 5000);
        setNotifications([...notifications]);
    };

    const closeNotification = (notification:Notification)=>{
        var index = notifications.indexOf(notification);
        if(index >= 0){
            notifications.splice(index, 1);
            setNotifications([...notifications]);;
        }
    }

    return(
        <section id="notification-container" className="notification-container">
            {
                notifications.map(it=>
                    <div key={`notification-item-${it.id}`} className="notification">
                        {it.kind} {it.message}
                    </div>
                )
            }
        </section>
    );
}

export default NotificationComponent;

