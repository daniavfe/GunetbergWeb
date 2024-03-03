import { PostApi } from "@gunetberg/gunetberg-client";
import SearchRequest from "../domain/common/searchRequest";
import SearchResult from "../domain/common/searchResult";
import CompletePost from "../domain/post/completePost";
import PostFilterRequest from "../domain/post/postFilterRequest";
import SummaryPost from "../domain/post/summaryPost";
import PostApiPort from "../ports/postApiPort";
import PostApiClientConverter from "./converters/postApiClientConverter";

export default class PostApiClient implements PostApiPort {
    readonly postApi: PostApi;
    readonly postApiClientConverter: PostApiClientConverter;

    constructor(
        postApi: PostApi,
        postApiClientConverter: PostApiClientConverter,
    ) {
        this.postApi = postApi;
        this.postApiClientConverter = postApiClientConverter;
    }

    async searchPosts(
        searchPostRequest: SearchRequest<PostFilterRequest>,
    ): Promise<SearchResult<SummaryPost>> {
        const result = await this.postApi.searchPosts(searchPostRequest);
        return this.postApiClientConverter.toSummaryPostSearchResult(
            result.data,
        );
    }

    async getPost(title: string): Promise<CompletePost> {
        const result = await this.postApi.getPostByTitle(title);
        return this.postApiClientConverter.toCompletePost(result.data);
    }
}
