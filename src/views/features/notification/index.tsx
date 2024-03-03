import NotificationMessage from "../../../domain/notification/notificationMessage";
import { NotificationType } from "../../../domain/notification/notificationType";
import useViewModel from "./useViewModel";

const Notification = () => {
    const viewmodel = useViewModel();

    const renderNotifications = (messages: NotificationMessage[]) => {
        return messages.map((it, index) => (
            <li key={`notification-item-${index}`}>
                <div className="notification-item">
                    <div className="notification-item-message">
                        {it.message}
                    </div>    
                    <div className="notification-item-actions">
                        <button className="icon-button" onClick={()=>viewmodel.removeNotification(index)}> 
                            <span className="material-icons">close</span>
                        </button>
                    </div>           
                </div>      
            </li>
        ));
    };

    return (
        <section id="notification-component" className="notification-component">
            <ul>{renderNotifications(viewmodel.notifications)}</ul>
        </section>
    );
};

export default Notification;
