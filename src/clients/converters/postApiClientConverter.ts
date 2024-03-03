import {
    CompletePostDto,
    SummaryPostDto,
    SummaryPostDtoSearchResultDto,
} from "@gunetberg/gunetberg-client";
import SummaryPost from "../../domain/post/summaryPost";
import SearchResult from "../../domain/common/searchResult";
import CompletePost from "../../domain/post/completePost";
import TagApiClientConverter from "./tagApiClientConverter";
import UserApiClientConverter from "./userApiClientConverter";

export default class PostApiClientConverter {
    readonly tagApiClientConverter: TagApiClientConverter;
    readonly userApiClientConverter: UserApiClientConverter;

    constructor(
        tagApiClientConverter: TagApiClientConverter,
        userApiClientConverter: UserApiClientConverter,
    ) {
        this.tagApiClientConverter = tagApiClientConverter;
        this.userApiClientConverter = userApiClientConverter;
    }

    toSummaryPostSearchResult(
        result: SummaryPostDtoSearchResultDto,
    ): SearchResult<SummaryPost> {
        return new SearchResult(
            result.page,
            result.pages,
            result.itemsPerPage,
            result.sortingField,
            result.sortByDescending,
            result.items?.map((it) => this.toSummaryPost(it)),
        );
    }

    toSummaryPost(sumaryPostDto: SummaryPostDto): SummaryPost {
        return new SummaryPost(
            sumaryPostDto.id,
            sumaryPostDto.title,
            sumaryPostDto.imageUrl,
            sumaryPostDto.summary,
            sumaryPostDto.language,
            sumaryPostDto.tags,
        );
    }

    toCompletePost(completePostDto: CompletePostDto): CompletePost {
        return new CompletePost(
            completePostDto.id,
            completePostDto.language,
            completePostDto.title,
            completePostDto.content,
            new Date(completePostDto.createdAt),
            this.tagApiClientConverter.toTags(completePostDto.tags),
            this.userApiClientConverter.toCompletePublicUser(
                completePostDto.author,
            ),
            completePostDto.imageUrl,
        );
    }
}
