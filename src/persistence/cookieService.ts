import Cookies from "universal-cookie";

export default class CookieService{
    private cookies: Cookies;

    private readonly tokenKey:string = "authToken";

    constructor(){
        this.cookies = new Cookies();
    }

    public getToken(): string{
        return this.cookies.get(this.tokenKey);
    }

    public setToken(token:string){
        this.cookies.set(this.tokenKey, token);
    }

    public removeToken(){
        this.cookies.remove(this.tokenKey);
    }

}