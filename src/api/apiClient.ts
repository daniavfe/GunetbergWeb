import axios from "axios";
import { AxiosInstance } from "axios";

abstract class ApiClient{

    private baseUrl: string;
    httpClient: AxiosInstance;

    constructor(baseUrl: string){
        this.baseUrl = baseUrl;
        
        this.httpClient = axios.create({
            baseURL: this.baseUrl,
            timeout: 31000,
          });
    }
}

export default ApiClient;