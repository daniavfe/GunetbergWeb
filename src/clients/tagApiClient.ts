import { TagApi } from "@gunetberg/gunetberg-client";
import Tag from "../domain/tag/tag";
import TagApiPort from "../ports/tagApiPort";
import TagApiClientConverter from "./converters/tagApiClientConverter";
import CreateTagRequest from "../domain/tag/createTagRequest";
import { ApiResponse } from "../domain/common/apiResponse";
import handleResponse from "./utils/httpUtils";

export default class TagApiClient implements TagApiPort {
    readonly tagApi: TagApi;
    readonly tagApiConverter: TagApiClientConverter;

    constructor(tagApi: TagApi, tagApiConverter: TagApiClientConverter) {
        this.tagApi = tagApi;
        this.tagApiConverter = tagApiConverter;
    }

    async createTags(
        createTagsRequest: CreateTagRequest[],
    ): Promise<ApiResponse<void>> {
        return await handleResponse(
            this.tagApi.createTags(
                this.tagApiConverter.toCreateTagsRequestDto(createTagsRequest),
            ),
            (x) => {},
        );
    }

    async getTags(): Promise<ApiResponse<Tag[]>> {
        return await handleResponse(
            this.tagApi.getTags(),
            this.tagApiConverter.toTags.bind(this.tagApiConverter),
        );
    }
}
