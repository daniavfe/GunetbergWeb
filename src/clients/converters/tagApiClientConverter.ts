import { CreateTagRequestDto, TagDto } from "@gunetberg/gunetberg-client";
import Tag from "../../domain/tag/tag";
import CreateTagRequest from "../../domain/tag/createTagRequest";

class TagApiClientConverter {

    toTags(tags: TagDto[]): Tag[] {
        return tags.map((it) => this.toTag(it));
    }

    toTag(tag: TagDto): Tag {
        return new Tag(tag.id, tag.name);
    }

    toCreateTagsRequestDto(
        createTagsRequest: CreateTagRequest[],
    ): CreateTagRequestDto[] {
        return createTagsRequest.map((it) => this.toCreateTagRequestDto(it));
    }

    toCreateTagRequestDto(
        createTagRequest: CreateTagRequest,
    ): CreateTagRequestDto {
        return {
            name: createTagRequest.name,
        };
    }
}

export default TagApiClientConverter;
