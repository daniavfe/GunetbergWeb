import { useEffect, useState } from "react";
import {v4 as uuidv4} from "uuid"

export enum NotificationKind {
    Information,
    Success,
    Warning,
    Error
}

export class Notification {
    id: string;
    message: string;
    kind: NotificationKind;
    createdAt: Date;


    constructor(message:string, kind: NotificationKind){
        this.id = uuidv4();
        this.message = message;
        this.kind = kind;
        this.createdAt = new Date();
    }
}

const subscriptions: Array<Function> = [];

const subscribe = (e: Function)=>{
    subscriptions.push(e);
}

const invoke = (notification: Notification)=>{   
    for(const subscription of subscriptions){
        subscription(notification);
    }
}

export const eventBus = {
    subscribe: subscribe,
    invoke: invoke
}

const NotificationComponent: React.FC = ()=>{ 

    const [notifications, setNotifications] = useState<Array<Notification>>([]);

    const onNotificationReceived = (notification: Notification)=>{      
        notifications.push(notification);
        setNotifications([...notifications]);
    };

    useEffect(()=>{
        eventBus.subscribe(onNotificationReceived);
    }, []);

    return(
        <section id="notification-container" className="notification-container">
            {
                notifications.map(it=>
                    <div key={`notification-item-${it.id}`} className="notification">
                        {it.kind} {it.message} {it.createdAt.toString()}
                    </div>
                )
            }
        </section>
    );
}

export default NotificationComponent;

