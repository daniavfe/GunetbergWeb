import { AxiosError, AxiosResponse } from "axios";
import ErrorBody from "../../domain/error/errorBody";
import ErrorCode from "../../domain/error/errorCode";
import { ApiResponse } from "../../domain/common/apiResponse";

const handleResponse = async <I, O>(
    response: Promise<AxiosResponse<I>>,
    converter: (i: I) => O,
): Promise<Promise<ApiResponse<O>>> => {
    try {
        const res = await response;
        return new ApiResponse<O>(converter(res.data), undefined);
    } catch (exception) {
        const errors = exception as ErrorBody[];
        const errorSet = new Set<ErrorCode>(
            errors.map(
                (it) => ErrorCode[it.errorName as keyof typeof ErrorCode],
            ),
        );
        return new ApiResponse<O>(undefined, errorSet);
    }
};

export default handleResponse;
