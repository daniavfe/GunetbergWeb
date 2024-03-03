import NotificationMessage from "../../domain/notification/notificationMessage";

class EventBus<T> {
    private events: Map<any, (message: T) => void>;

    constructor() {
        this.events = new Map<any, (message: T) => void>();
    }

    subscribe(id: any, handler: (message: T) => void) {
        this.events.set(id, handler);
    }

    unsubscribe(id: any) {
        this.events.delete(id);
    }

    invoke(message: T) {
        this.events.forEach((it) => it(message));
    }
}

const notificationEventBus = new EventBus<NotificationMessage>();
const userStatusEventBus = new EventBus<void>();

export const useNotification = () => notificationEventBus;
export const useUserStatus = () => userStatusEventBus;
