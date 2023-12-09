import { type NotificationKind } from "./notification-kind";
import { v4 as uuidv4 } from "uuid";

export class Notification {
	id: string;
	message: string;
	kind: NotificationKind;

	constructor (message: string, kind: NotificationKind) {
		this.id = uuidv4();
		this.message = message;
		this.kind = kind;
	}
}
