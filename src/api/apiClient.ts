import axios from "axios";
import { AxiosInstance } from "axios";
import CookieService from "../persistence/cookieService";

abstract class ApiClient{

    private cookieService: CookieService;
    private baseUrl: string;
    
    constructor(baseUrl: string, cookieService:CookieService){
        this.baseUrl = baseUrl;
        this.cookieService = cookieService;
    }

    getClient(): AxiosInstance{
        const token = this.cookieService.getToken();
        const headers = !token ? {} : {Authorization: `Bearer ${token}`}

        return axios.create({
            baseURL: this.baseUrl,
            timeout: 31000,
            headers: headers
        });
    }
}

export default ApiClient;