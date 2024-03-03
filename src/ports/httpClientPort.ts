import ErrorBody from "../domain/error/errorBody";

export default interface HttpClientPort {
    addAuthorizationHandler(handler: () => string): void;

    addErrorsHandlers(
        unauthorizeErrorHandler: () => ErrorBody[],
        forbiddenErrorHandler: () => ErrorBody[],
        defaultErrorHandler: () => ErrorBody[],
    ): void;
}
