import { Validator } from "fluentvalidation-ts";
import ErrorCode from "../../domain/error/errorCode";

export default class CustomValidator<T> extends Validator<T> {
    validateModel(model: T): Set<ErrorCode> {
        const errors = this.validate(model);
        return new Set(
            Object.values(errors).map(
                (it) => ErrorCode[it as keyof typeof ErrorCode],
            ),
        );
    }
}
