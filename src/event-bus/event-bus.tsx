import { Notification } from "../model/notification/notification";

const subscriptions: Array<Function> = [];

const subscribe = (subscription: Function)=> {
    subscriptions.push(subscription);
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