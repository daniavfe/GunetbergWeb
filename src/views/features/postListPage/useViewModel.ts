import { useEffect, useState } from "react";
import Tag from "../../../domain/tag/tag";
import SearchRequest from "../../../domain/common/searchRequest";
import PostFilterRequest from "../../../domain/post/postFilterRequest";
import SearchResult from "../../../domain/common/searchResult";
import SummaryPost from "../../../domain/post/summaryPost";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useNotification } from "../../../config/di/eventBusModule";
import {
    usePostApiPort,
    useTagApiPort,
} from "../../../config/di/businessModule";
import NotificationMessage from "../../../domain/notification/notificationMessage";
import { NotificationType } from "../../../domain/notification/notificationType";

const useViewModel = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const notification = useNotification();
    const tagApiPort = useTagApiPort();
    const postApiPort = usePostApiPort();

    const getTags = async () => {
        setTags(await tagApiPort.getTags());
    };

    const searchPosts = async () => {    
        try {
            if (!searchRequest) {
                return;
            }
            setIsLoading(true);
            const posts = await postApiPort.searchPosts(searchRequest);
            setSearchResult(posts);
        } catch (exception) {
            notification.invoke(
                new NotificationMessage(
                    "Error while retrieving the posts",
                    NotificationType.success,
                ),
            );
        } finally {
            setIsLoading(false);
        }
        
    };

    const setParamsToUrl = () => {
        console.log("Setting new params to url");
        setSearchParams({
            page: !searchRequest.page ? "1" : searchRequest.page.toString(),
            itemsPerPage: !searchRequest.itemsPerPage
                ? "10"
                : searchRequest.itemsPerPage.toString(),
            sortField: !searchRequest.sortField
                ? ""
                : searchRequest.sortField.toString(),
            sortDescending: searchRequest.sortByDescending.toString(),
            title: !searchRequest.filter
                ? ""
                : searchRequest.filter.filterByTitle,
            tags: !searchRequest.filter
                ? ""
                : searchRequest.filter.filterByTags,
        });
    };

    const getParamsFromUrl = () => {
        const defaultPage = "1";
        const defaultItemsPerPage = "5";
        const defaultSortField = "CreatedAt";

        const urlPageQuery = "page";
        const urlItemsPerPageQuery = "itemsPerPage";
        const urlSortFieldQuery = "sortField";
        const urlSortDescendingQuery = "sortDescending";
        const urlTitleFilterQuery = "title";
        const urlTagsFilterQuery = "tags";

        const urlPage = parseInt(searchParams.get(urlPageQuery) || defaultPage);
        const urlItemsPerPage = parseInt(
            searchParams.get(urlItemsPerPageQuery) || defaultItemsPerPage,
        );
        const urlTitleFilter = searchParams.get(urlTitleFilterQuery) || "";
        const urlSortField =
            searchParams.get(urlSortFieldQuery) || defaultSortField;
        const urlSortDescending =
            searchParams.get(urlSortDescendingQuery) == "true";
        const urlTags = searchParams.getAll(urlTagsFilterQuery);

        return new SearchRequest<PostFilterRequest>(
            urlSortDescending,
            urlPage,
            urlItemsPerPage,
            urlSortField,
            new PostFilterRequest(urlTitleFilter, urlTags),
        );
    };

    const updatePage = (page: number) => {
        setSearchRequest({
            ...searchRequest,
            page: page,
        } as SearchRequest<PostFilterRequest>);
    };

    const updateItemsPerPage = (itemsPerPage: number) => {
        setSearchRequest({
            ...searchRequest,
            itemsPerPage: itemsPerPage,
        } as SearchRequest<PostFilterRequest>);
    };

    const updateSortByDescending = (sortByDescending: boolean) => {
        setSearchRequest({
            ...searchRequest,
            sortByDescending: sortByDescending,
        } as SearchRequest<PostFilterRequest>);
    };

    const updateSortField = (sortField: string) => {
        setSearchRequest({
            ...searchRequest,
            sortField: sortField,
        } as SearchRequest<PostFilterRequest>);
    };

    const updateFilterByTitle = (filterByTitle: string) => {
        const filter = {
            ...searchRequest?.filter,
            filterByTitle: filterByTitle,
        } as PostFilterRequest;
        setSearchRequest({
            ...searchRequest,
            filter: filter,
        } as SearchRequest<PostFilterRequest>);
    };

    const updateFilterByTags = (filterByTags: string[]) => {
        const filter = {
            ...searchRequest?.filter,
            filterByTags: filterByTags,
        } as PostFilterRequest;
        setSearchRequest({
            ...searchRequest,
            filter: filter,
        } as SearchRequest<PostFilterRequest>);
    };

    const didUrlChange = () => {
        const request = getParamsFromUrl();
        return !(
            searchRequest.page == request.page &&
            searchRequest.itemsPerPage == request.itemsPerPage &&
            searchRequest.sortField == request.sortField &&
            searchRequest.sortByDescending == request.sortByDescending &&
            searchRequest.filter?.filterByTitle == request.filter?.filterByTitle
        );
    };

    const fromEmptyParams = () => {
        if (searchParams.size == 0) {
            return true;
        }
    };

    const loadPost = (post: SummaryPost) => {
        navigate(`/post/${post.title.replace(/ /g, "-").toLowerCase()}`);
    };

    const [searchParams, setSearchParams] = useSearchParams();

    const [tags, setTags] = useState<Tag[] | undefined>();

    const [searchRequest, setSearchRequest] =
        useState<SearchRequest<PostFilterRequest>>(getParamsFromUrl());

    const [searchResult, setSearchResult] = useState<
        SearchResult<SummaryPost> | undefined
    >();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getTags();
    }, []);

    useEffect(() => {
        if (didUrlChange()) {
            setParamsToUrl();
        }
        searchPosts();
    }, [searchRequest]);

    useEffect(() => {
        if (fromEmptyParams()) {
            setParamsToUrl();
            return;
        }
        if (didUrlChange()) {
            setSearchRequest(getParamsFromUrl);
        }
    }, [location]);

    return {
        tags,
        getTags,
        searchPosts,
        searchRequest,
        searchResult,
        updatePage,
        updateItemsPerPage,
        updateSortByDescending,
        updateSortField,
        updateFilterByTitle,
        updateFilterByTags,
        setParamsToUrl,
        loadPost,
        isLoading
    };
};

export default useViewModel;
