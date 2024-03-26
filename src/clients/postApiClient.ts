import { PostApi } from "@gunetberg/gunetberg-client";
import SearchRequest from "../domain/common/searchRequest";
import SearchResult from "../domain/common/searchResult";
import CompletePost from "../domain/post/completePost";
import PostFilterRequest from "../domain/post/postFilterRequest";
import SummaryPost from "../domain/post/summaryPost";
import PostApiPort from "../ports/postApiPort";
import PostApiClientConverter from "./converters/postApiClientConverter";
import { ApiResponse } from "../domain/common/apiResponse";
import handleResponse from "./utils/httpUtils";

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
    ): Promise<ApiResponse<SearchResult<SummaryPost>>> {
        return await handleResponse(
            this.postApi.searchPosts(searchPostRequest),
            this.postApiClientConverter.toSummaryPostSearchResult.bind(this.postApiClientConverter),
        );
    }

    async getPost(title: string): Promise<ApiResponse<CompletePost>> {
        return await handleResponse(
            this.postApi.getPostByTitle(title),
            this.postApiClientConverter.toCompletePost.bind(this.postApiClientConverter),
        );
    }
}
