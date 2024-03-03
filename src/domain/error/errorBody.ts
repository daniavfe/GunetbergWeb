import ErrorCode from "./errorCode";

export default class ErrorBody {
    errorCode: ErrorCode;
    errorName: string;

    constructor(errorCode: ErrorCode, errorName: string) {
        this.errorCode = errorCode;
        this.errorName = errorName;
    }
}
