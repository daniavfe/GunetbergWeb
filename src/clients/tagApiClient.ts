import { TagApi } from "@gunetberg/gunetberg-client";
import Tag from "../domain/tag/tag";
import TagApiPort from "../ports/tagApiPort";
import TagApiClientConverter from "./converters/tagApiClientConverter";
import CreateTagRequest from "../domain/tag/createTagRequest";

export default class TagApiClient implements TagApiPort {
    readonly tagApi: TagApi;
    readonly tagApiConverter: TagApiClientConverter;

    constructor(tagApi: TagApi, tagApiConverter: TagApiClientConverter) {
        this.tagApi = tagApi;
        this.tagApiConverter = tagApiConverter;
    }

    async createTags(createTagsRequest: CreateTagRequest[]): Promise<void> {
        await this.tagApi.createTags(
            this.tagApiConverter.toCreateTagsRequestDto(createTagsRequest),
        );
    }

    async getTags(): Promise<Tag[]> {
        const result = await this.tagApi.getTags();
        return this.tagApiConverter.toTags(result.data);
    }
}
