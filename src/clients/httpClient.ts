import {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    HttpStatusCode,
    InternalAxiosRequestConfig,
} from "axios";
import HttpClientPort from "../ports/httpClientPort";
import ErrorBody from "../domain/error/errorBody";
import ErrorCode from "../domain/error/errorCode";

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
                let errors: ErrorBody[] = [];

                if (!error.response) {
                    return Promise.reject([
                        new ErrorBody(
                            ErrorCode.Unknown,
                            ErrorCode.Unknown.toString(),
                        ),
                    ]);
                }

                switch (error.response?.status) {
                    case HttpStatusCode.Unauthorized:
                        errors = unauthorizeErrorHandler();
                        break;
                    case HttpStatusCode.Forbidden:
                        errors = forbiddenErrorHandler();
                        break;
                    case HttpStatusCode.InternalServerError:
                        errors = defaultErrorHandler();
                        break;
                    default:
                        errors = defaultErrorHandler();
                }

                console.log("Error handler");

                return Promise.reject(errors);
            },
        );
    }
}
