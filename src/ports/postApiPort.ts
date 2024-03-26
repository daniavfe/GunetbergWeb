import { ApiResponse } from "../domain/common/apiResponse";
import SearchRequest from "../domain/common/searchRequest";
import SearchResult from "../domain/common/searchResult";
import CompletePost from "../domain/post/completePost";
import PostFilterRequest from "../domain/post/postFilterRequest";
import SummaryPost from "../domain/post/summaryPost";

export default interface PostApiPort {
    searchPosts(
        searchPostRequest: SearchRequest<PostFilterRequest>,
    ): Promise<ApiResponse<SearchResult<SummaryPost>>>;

    getPost(title: string): Promise<ApiResponse<CompletePost>>;
}
