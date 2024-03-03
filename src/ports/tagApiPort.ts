import CreateTagRequest from "../domain/tag/createTagRequest";
import Tag from "../domain/tag/tag";

export default interface TagApiPort {
    createTags(createTagsRequest: CreateTagRequest[]): Promise<void>;
    getTags(): Promise<Tag[]>;
}
