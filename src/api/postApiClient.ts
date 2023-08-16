import { AxiosResponse } from "axios";
import SearchRequest from "../model/common/searchRequest";
import SearchResult from "../model/common/searchResult";
import PostFilterRequest from "../model/post/postFilterRequest";
import SummaryPost from "../model/post/summaryPost";
import { apiClient } from "./apiClient";
import AdminPost from "../model/post/adminPost";
import CreateOrUpdatePostRequest from "../model/post/createOrUpdatePostRequest";
import UpdatePost from "../model/post/updatePost";
import CompletePost from "../model/post/completePost";

const getUpdatePost = (id: string): Promise<AxiosResponse<UpdatePost>> => {
    return apiClient.get<UpdatePost>(`/posts/${id}`)
};

const getPost = (title: string): Promise<AxiosResponse<CompletePost>> => {
    return apiClient.get<CompletePost>(`/posts?title=${title}`)
};

const searchPosts = (searchRequest: SearchRequest<PostFilterRequest>): Promise<AxiosResponse<SearchResult<SummaryPost>>> => {
    return apiClient.post<SearchResult<SummaryPost>>("/posts/search", searchRequest);
};

const searchAdminPosts = (searchRequest: SearchRequest<PostFilterRequest>): Promise<AxiosResponse<SearchResult<AdminPost>>> => {
    return apiClient.post<SearchResult<AdminPost>>("/posts/admin/search", searchRequest);
};

const createPost = (createOrUpdatePostRequest: CreateOrUpdatePostRequest): Promise<AxiosResponse<string>> =>{
     return apiClient.post<string>("/posts", createOrUpdatePostRequest);
};

const updatePost = (id: string, createOrUpdatePostRequest: CreateOrUpdatePostRequest): Promise<AxiosResponse> =>{
    return apiClient.put(`/posts/${id}`, createOrUpdatePostRequest);
};

const deletePost = (id: string) =>{
    return apiClient.delete(`/posts/${id}`);
}

export const postApiClient = {
    getUpdatePost: getUpdatePost,
    getPost: getPost,
    searchPosts: searchPosts,
    searchAdminPosts: searchAdminPosts,
    createPost: createPost,
    updatePost: updatePost,
    deletePost: deletePost
}
