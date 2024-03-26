import { ApiResponse } from "../domain/common/apiResponse";
import CreateTagRequest from "../domain/tag/createTagRequest";
import Tag from "../domain/tag/tag";

export default interface TagApiPort {
    createTags(
        createTagsRequest: CreateTagRequest[],
    ): Promise<ApiResponse<void>>;
    getTags(): Promise<ApiResponse<Tag[]>>;
}
