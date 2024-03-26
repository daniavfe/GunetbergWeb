import ErrorCode from "../error/errorCode";

export class ApiResponse<I> {
    private data?: I;
    private errors?: Set<ErrorCode>;
    hasErrors: boolean;

    constructor(data?: I, errors?: Set<ErrorCode>) {
        this.data = data;
        this.errors = errors;
        this.hasErrors = !!this.errors && this.errors.size > 0;
    }

    getData(): I {
        if (this.hasErrors || !this.data) {
            throw new Error("The response ended with errors");
        }

        return this.data;
    }

    getErrors(): Set<ErrorCode> {
        if (!this.hasErrors || !this.errors) {
            throw new Error("The response ended successfully");
        }

        return this.errors;
    }
}
