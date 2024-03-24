import {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    HttpStatusCode,
    InternalAxiosRequestConfig,
} from "axios";
import HttpClientPort from "../ports/httpClientPort";
import ErrorBody from "../domain/error/errorBody";

export default class HttpClient implements HttpClientPort {
    readonly axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    addAuthorizationHandler(handler: () => string): void {
        this.axios.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                config.headers.Authorization = handler();
                return config;
            },
            function (error: AxiosError) {
                return Promise.reject(error);
            },
        );
    }

    addErrorsHandlers(
        unauthorizeErrorHandler: () => ErrorBody[],
        forbiddenErrorHandler: () => ErrorBody[],
        defaultErrorHandler: () => ErrorBody[],
    ): void {
        this.axios.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            (error: AxiosError) => {
                switch (error.response?.status) {
                    case HttpStatusCode.Unauthorized:
                        error.response.data = unauthorizeErrorHandler();
                        break;
                    case HttpStatusCode.Forbidden:
                        error.response.data = forbiddenErrorHandler();
                        break;
                    case HttpStatusCode.InternalServerError:
                        error.response.data = defaultErrorHandler();
                        break;
                }

                return Promise.reject(error);
            },
        );
    }
} 
