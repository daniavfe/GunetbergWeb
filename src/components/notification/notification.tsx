import { useEffect, useState } from "react";
import { type Notification } from "../../model/notification/notification";
import { eventBus } from "../../event-bus/event-bus";
import { NotificationKind } from "../../model/notification/notification-kind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type IconDefinition, faCircleCheck, faCircleExclamation, faCircleInfo, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./notification.scss";

const NotificationComponent: React.FC = () => {
	const [notifications, setNotifications] = useState<Notification[]>([]);

	useEffect(() => {
		eventBus.subscribe(onNotificationReceived);
	}, []);

	useEffect(() => {
		console.log(notifications);
	}, [notifications]);

	const onNotificationReceived = (notification: Notification) => {
		notifications.push(notification);
		setTimeout(() => { closeNotification(notification); }, 5000);
		setNotifications([...notifications]);
	};

	const closeNotification = (notification: Notification) => {
		const index = notifications.indexOf(notification);
		if (index >= 0) {
			notifications.splice(index, 1);
			setNotifications([...notifications]);
		}
	};

	const getIconFromKind = (kind: NotificationKind): IconDefinition => {
		switch (kind) {
		case NotificationKind.Information: return faCircleInfo;
		case NotificationKind.Success: return faCircleCheck;
		case NotificationKind.Warning: return faCircleExclamation;
		case NotificationKind.Error: return faCircleXmark;
		}
	};

	return (
		<section id="notification-container" className="notification-container">
			{
				notifications.map(it =>
					<div key={`notification-item-${it.id}`} className="notification">
						<div className="notification-icon">
							<div className={`notification-icon-background background-${NotificationKind[it.kind].toLowerCase()}`}>
								<FontAwesomeIcon icon={getIconFromKind(it.kind)}/>
							</div>
						</div>
						<div className="notification-content">
							<p>{it.message}</p>
						</div>
					</div>
				)
			}
		</section>
	);
};

export default NotificationComponent;
