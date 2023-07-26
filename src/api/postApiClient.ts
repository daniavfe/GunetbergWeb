import { AxiosResponse } from "axios";
import SearchRequest from "../model/common/searchRequest";
import SearchResult from "../model/common/searchResult";
import PostFilterRequest from "../model/post/postFilterRequest";
import SummaryPost from "../model/post/summaryPost";
import ApiClient from "./apiClient";
import CompletePost from "../model/post/completePost";

export default class PostApiClient extends ApiClient{
    
    getPost(id: string): Promise<AxiosResponse<CompletePost>> {
        return this.getClient().get<CompletePost>(`/posts/${id}`);
    }

    searchPosts(searchRequest: SearchRequest<PostFilterRequest>): Promise<AxiosResponse<SearchResult<SummaryPost>>> {
        return this.getClient().post<SearchResult<SummaryPost>>("/posts/search", searchRequest);
    }
}