import { AxiosResponse } from "axios";
import SearchRequest from "../model/common/searchRequest";
import SearchResult from "../model/common/searchResult";
import PostFilterRequest from "../model/post/postFilterRequest";
import SummaryPost from "../model/post/summaryPost";
import ApiClient from "./apiClient";
import CompletePost from "../model/post/completePost";
import CreatePostRequest from "../model/post/createPostRequest";
import AdminPost from "../model/post/adminPost";
import UpdatePostRequest from "../model/post/updatePostRequest";

export default class PostApiClient extends ApiClient{
    
    getPost(id: string): Promise<AxiosResponse<CompletePost>> {
        return this.getClient().get<CompletePost>(`/posts/${id}`);
    }

    searchPosts(searchRequest: SearchRequest<PostFilterRequest>): Promise<AxiosResponse<SearchResult<SummaryPost>>> {
        return this.getClient().post<SearchResult<SummaryPost>>("/posts/search", searchRequest);
    }

    searchAdminPosts(searchRequest: SearchRequest<PostFilterRequest>): Promise<AxiosResponse<SearchResult<AdminPost>>> {
        return this.getClient().post<SearchResult<AdminPost>>("/posts/admin/search", searchRequest);
    }

    createPost(createPostRequest: CreatePostRequest): Promise<AxiosResponse<string>>{
         return this.getClient().post<string>("/posts", createPostRequest);
    }

    updatePost(id: string, updatePostRequest: UpdatePostRequest): Promise<AxiosResponse>{
        return this.getClient().put(`/posts/${id}`, updatePostRequest);
    }
}