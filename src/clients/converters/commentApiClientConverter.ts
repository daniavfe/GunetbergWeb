import {
    CommentDto,
    CommentDtoPaginatedResponseDto,
    CreateCommentRequestDto,
} from "@gunetberg/gunetberg-client";
import CreateCommentRequest from "../../domain/comment/createCommentRequest";
import PaginatedResponse from "../../domain/common/paginatedResponse";
import Comment from "../../domain/comment/comment";
import UserApiClientConverter from "./userApiClientConverter";

export default class CommentApiClientConverter {
    readonly userApiClientConverter: UserApiClientConverter;

    constructor(userApiClientConverter: UserApiClientConverter) {
        this.userApiClientConverter = userApiClientConverter;
    }

    toCreateCommentRequestDto(
        createCommentRequest: CreateCommentRequest,
    ): CreateCommentRequestDto {
        return {
            content: createCommentRequest.content,
        };
    }

    toCommentPaginatedResponse(
        paginatedResponseDto: CommentDtoPaginatedResponseDto,
    ): PaginatedResponse<Comment> {
        return new PaginatedResponse<Comment>(
            paginatedResponseDto.page,
            10,
            100,
            paginatedResponseDto.itemsPerPage,
            this.toComments(paginatedResponseDto.items),
        );
    }

    toComments(commentsDto: CommentDto[]): Comment[] {
        return commentsDto.map((it) => this.toComment(it));
    }

    toComment(commentDto: CommentDto): Comment {
        return new Comment(
            commentDto.id,
            new Date(commentDto.createdAt),
            this.userApiClientConverter.toPublicUser(commentDto.createdBy),
            commentDto.content,
        );
    }
}
