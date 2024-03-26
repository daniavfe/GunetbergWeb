import axios from "axios";
import HttpClient from "../../clients/httpClient";
import HttpClientPort from "../../ports/httpClientPort";
import {
    AuthorizationApi,
    CommentApi,
    PostApi,
    TagApi,
    UserApi,
} from "@gunetberg/gunetberg-client";
import AuthorizationApiClientConverter from "../../clients/converters/authorizationApiClientConverter";
import TagApiClientConverter from "../../clients/converters/tagApiClientConverter";
import UserApiClientConverter from "../../clients/converters/userApiClientConverter";
import CommentApiClientConverter from "../../clients/converters/commentApiClientConverter";
import PostApiClientConverter from "../../clients/converters/postApiClientConverter";
import AuthorizationApiPort from "../../ports/authorizationApiPort";
import AuthorizationApiClient from "../../clients/authorizationApiClient";
import PostApiPort from "../../ports/postApiPort";
import PostApiClient from "../../clients/postApiClient";
import TagApiPort from "../../ports/tagApiPort";
import TagApiClient from "../../clients/tagApiClient";
import UserApiPort from "../../ports/userApiPort";
import UserApiClient from "../../clients/userApiClient";
import CommentApiPort from "../../ports/commentApiPort";
import CommentApiClient from "../../clients/commentApiClient";
import AuthorizationBusiness from "../../business/authorizationBusiness";
import UserBusiness from "../../business/userBusiness";
import CommentBusiness from "../../business/commentBusiness";

const axiosInstance = axios.create();

const baseUrl = process.env.API_ENDPOINT;

const authorizationApi = new AuthorizationApi(
    undefined,
    baseUrl,
    axiosInstance,
);

const postApi = new PostApi(undefined, baseUrl, axiosInstance);

const tagApi = new TagApi(undefined, baseUrl, axiosInstance);

const commentApi = new CommentApi(undefined, baseUrl, axiosInstance);

const userApi = new UserApi(undefined, baseUrl, axiosInstance);

const authorizationApiClientConverter = new AuthorizationApiClientConverter();

const tagApiClientConverter = new TagApiClientConverter();

const userApiClientConverter = new UserApiClientConverter();

const commentApiClientConverter = new CommentApiClientConverter(
    userApiClientConverter,
);

const postApiClientConverter = new PostApiClientConverter(
    tagApiClientConverter,
    userApiClientConverter,
);

const httpClient: HttpClientPort = new HttpClient(axiosInstance);

const authorizationApiClient: AuthorizationApiPort = new AuthorizationApiClient(
    authorizationApi,
    authorizationApiClientConverter,
);

const postApiClient: PostApiPort = new PostApiClient(
    postApi,
    postApiClientConverter,
);

const tagApiClient: TagApiPort = new TagApiClient(
    tagApi,
    tagApiClientConverter,
);

const userApiClient: UserApiPort = new UserApiClient(
    userApi,
    userApiClientConverter,
);

const commentApiClient: CommentApiPort = new CommentApiClient(
    commentApi,
    commentApiClientConverter,
);

const authorizationBusiness: AuthorizationBusiness = new AuthorizationBusiness(
    authorizationApiClient,
);

const userBusiness: UserBusiness = new UserBusiness(userApiClient);

const commentBusiness: CommentBusiness = new CommentBusiness(commentApiClient);

export const useHttpPort = () => httpClient;
export const usePostApiPort = () => postApiClient;
export const useTagApiPort = () => tagApiClient;
export const useUserApiPort = () => userApiClient;
export const useCommentApiPort = () => commentApiClient;
export const useAuthorizationBusiness = () => authorizationBusiness;
export const useUserBusiness = () => userBusiness;
export const useCommentBusiness = () => commentBusiness;
