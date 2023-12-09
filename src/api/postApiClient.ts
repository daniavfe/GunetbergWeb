import { type AxiosResponse } from "axios";
import type SearchRequest from "../model/common/searchRequest";
import type SearchResult from "../model/common/searchResult";
import type PostFilterRequest from "../model/post/postFilterRequest";
import type SummaryPost from "../model/post/summaryPost";
import { apiClient } from "./apiClient";
import type AdminPost from "../model/post/adminPost";
import type CreateOrUpdatePostRequest from "../model/post/createOrUpdatePostRequest";
import type UpdatePost from "../model/post/updatePost";
import type CompletePost from "../model/post/completePost";

const getUpdatePost = async (id: string): Promise<AxiosResponse<UpdatePost>> => {
	return await apiClient.get<UpdatePost>(`/posts/${id}`);
};

const getPost = async (title: string): Promise<AxiosResponse<CompletePost>> => {
	return await apiClient.get<CompletePost>(`/posts?title=${title}`);
};

const searchPosts = async (searchRequest: SearchRequest<PostFilterRequest>): Promise<AxiosResponse<SearchResult<SummaryPost>>> => {
	return await apiClient.post<SearchResult<SummaryPost>>("/posts/search", searchRequest);
};

const searchAdminPosts = async (searchRequest: SearchRequest<PostFilterRequest>): Promise<AxiosResponse<SearchResult<AdminPost>>> => {
	return await apiClient.post<SearchResult<AdminPost>>("/posts/admin/search", searchRequest);
};

const createPost = async (createOrUpdatePostRequest: CreateOrUpdatePostRequest): Promise<AxiosResponse<string>> => {
	return await apiClient.post<string>("/posts", createOrUpdatePostRequest);
};

const updatePost = async (id: string, createOrUpdatePostRequest: CreateOrUpdatePostRequest): Promise<AxiosResponse> => {
	return await apiClient.put(`/posts/${id}`, createOrUpdatePostRequest);
};

const deletePost = async (id: string) => {
	return await apiClient.delete(`/posts/${id}`);
};

export const postApiClient = {
	getUpdatePost,
	getPost,
	searchPosts,
	searchAdminPosts,
	createPost,
	updatePost,
	deletePost
};
