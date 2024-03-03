import { NotificationType } from "./notificationType";

export default class NotificationMessage {
    message: string;
    type: NotificationType;

    constructor(message: string, type: NotificationType) {
        this.message = message;
        this.type = type;
    }
}
