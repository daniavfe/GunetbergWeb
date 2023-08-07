import { AxiosResponse } from "axios";
import SearchRequest from "../model/common/searchRequest";
import SearchResult from "../model/common/searchResult";
import PostFilterRequest from "../model/post/postFilterRequest";
import SummaryPost from "../model/post/summaryPost";
import { apiClient } from "./apiClient";
import CompletePost from "../model/post/completePost";
import CreatePostRequest from "../model/post/createPostRequest";
import AdminPost from "../model/post/adminPost";
import UpdatePostRequest from "../model/post/updatePostRequest";

const getPost = (id: string): Promise<AxiosResponse<CompletePost>> => {
    return apiClient.get<CompletePost>(`/posts/${id}`)
};

const searchPosts = (searchRequest: SearchRequest<PostFilterRequest>): Promise<AxiosResponse<SearchResult<SummaryPost>>> => {
    return apiClient.post<SearchResult<SummaryPost>>("/posts/search", searchRequest);
};

const searchAdminPosts = (searchRequest: SearchRequest<PostFilterRequest>): Promise<AxiosResponse<SearchResult<AdminPost>>> => {
    return apiClient.post<SearchResult<AdminPost>>("/posts/admin/search", searchRequest);
};

const createPost = (createPostRequest: CreatePostRequest): Promise<AxiosResponse<string>> =>{
     return apiClient.post<string>("/posts", createPostRequest);
};

const updatePost = (id: string, updatePostRequest: UpdatePostRequest): Promise<AxiosResponse> =>{
    return apiClient.put(`/posts/${id}`, updatePostRequest);
};

export const postApiClient = {
    getPost: getPost,
    searchPosts: searchPosts,
    searchAdminPosts: searchAdminPosts,
    createPost: createPost,
    updatePost: updatePost,
}
