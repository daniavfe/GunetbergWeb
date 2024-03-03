import CookieUtil from "./cookieUtil";

export default class UserUtil {
    cookieClient: CookieUtil;

    constructor(cookieClient: CookieUtil) {
        this.cookieClient = cookieClient;
    }

    isUserLoggedIn(): boolean {
        return !!this.cookieClient.read<string>("accessToken");
    }
}
