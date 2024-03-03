import { AxiosError, AxiosResponse } from "axios";
import ErrorBody from "../../domain/error/errorBody";
import ErrorCode from "../../domain/error/errorCode";

const handleResponse = async <I, O>(
    response: Promise<AxiosResponse<I>>,
    converter: (i: I) => O,
): Promise<[O | undefined, Set<ErrorCode> | undefined]> => {
    try {
        const res = await response;
        return [converter(res.data), undefined];
    } catch (exception) {
        const errors = exception as AxiosError;
        const apiErrors = errors.response?.data as ErrorBody[];
        const errorSet = new Set<ErrorCode>(
            apiErrors.map(
                (it) => ErrorCode[it.errorName as keyof typeof ErrorCode],
            ),
        );
        return [undefined, errorSet];
    }
};

export default handleResponse;
