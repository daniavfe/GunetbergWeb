import Cookies from "universal-cookie";

export default class CookieUtil {
    cookies: Cookies;

    constructor(cookies: Cookies) {
        this.cookies = cookies;
    }

    read<T>(key: string): T {
        return this.cookies.get(key) as T;
    }

    write<T>(key: string, content: T): void {
        this.cookies.set(key, content);
    }

    remove(key: string): void {
        this.cookies.remove(key);
    }
}
