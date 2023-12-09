import { useEffect, useState } from "react";
import SearchRequest from "../../model/common/searchRequest";
import PostFilterRequest from "../../model/post/postFilterRequest";
import type AdminPost from "../../model/post/adminPost";
import { type AxiosResponse } from "axios";
import type SearchResult from "../../model/common/searchResult";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import type Tag from "../../model/tag/tag";
import PaginationComponent from "../pagination/pagination";
import { postApiClient } from "../../api/postApiClient";
import { tagApiClient } from "../../api/tagApiClient";
import AdminPostFilterComponent from "./filter/filter";
import "./admin.scss";
import ListItemComponent from "./list-item/list-item";
import { eventBus } from "../../event-bus/event-bus";
import { Notification } from "../../model/notification/notification";
import { NotificationKind } from "../../model/notification/notification-kind";
import ModalComponent from "../modal/modal";
import PageComponent from "../page/page";

const AdminComponent: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();

	const [tags, setTags] = useState<Tag[]>([]);
	const [searchRequest, setSearchRequest] = useState<SearchRequest<PostFilterRequest>>(null);
	const [searchResponse, setSearchResponse] = useState<SearchResult<AdminPost>>(null);
	const [updateQueryParams, setUpdateQueryParams] = useState<boolean>(true);
	const [reload, setReload] = useState<boolean>(false);
	const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
	const [postToDelete, setPostToDelete] = useState<AdminPost>(null);

	useEffect(() => {
		retrieveTags();
	}, []);

	useEffect(() => {
		if (reload) {
			searchPosts();
		}
		setReload(false);
	}, [reload]);

	useEffect(() => {
		if (didUrlChange()) {
			if (searchParams.size > 0) {
				setUpdateQueryParams(false);
			}
			setSearchRequest(getRequestFromUrl());
			setReload(true);
		}
	}, [location]);

	const searchPosts = () => {
		postApiClient.searchAdminPosts(searchRequest)
			.then((response: AxiosResponse<SearchResult<AdminPost>>) => {
				setSearchResponse(response.data);
				if (updateQueryParams) {
					setSearchParams(
						{
							page: response.data.page.toString(),
							itemsPerPage: response.data.itemsPerPage.toString(),
							sortField: response.data.sortingField.toString(),
							sortDescending: response.data.sortByDescending.toString(),
							title: searchRequest.filter.filterByTitle,
							tags: searchRequest.filter.filterByTags
						}
					);
				}
				setUpdateQueryParams(true);
			});
	};

	const deletePost = (id: string) => {
		postApiClient.deletePost(id)
			.then((response: AxiosResponse) => {
				eventBus.invoke(new Notification(`Post ${id} successfully deleted`, NotificationKind.Success));
				setUpdateQueryParams(false);
				setReload(true);
			})
			.catch(() => {
				eventBus.invoke(new Notification(`Error while removing post ${id}`, NotificationKind.Error));
			});

		setShowConfirmationModal(false);
		setPostToDelete(null);
	};

	const retrieveTags = () => {
		tagApiClient.getTags()
			.then((response: AxiosResponse<Tag[]>) => {
				setTags(response.data);
			});
	};

	const getRequestFromUrl = (): SearchRequest<PostFilterRequest> => {
		const defaultPage = 1;
		const defaultItemsPerPage = 5;
		const defaultSortField = "CreatedAt";

		const urlPageQuery = "page";
		const urlItemsPerPageQuery = "itemsPerPage";
		const urlSortFieldQuery = "sortField";
		const urlSortDescendingQuery = "sortDescending";
		const urlTitleFilterQuery = "title";
		const urlTagsFilterQuery = "tags";

		const urlPage = parseInt(searchParams.get(urlPageQuery)) || defaultPage;
		const urlItemsPerPage = parseInt(searchParams.get(urlItemsPerPageQuery)) || defaultItemsPerPage;
		const urlTitleFilter = searchParams.get(urlTitleFilterQuery) || "";
		const urlSortField = searchParams.get(urlSortFieldQuery) || defaultSortField;
		const urlSortDescending = searchParams.get(urlSortDescendingQuery) == "true";
		const urlTags = searchParams.getAll(urlTagsFilterQuery);

		return new SearchRequest<PostFilterRequest>(
			urlPage,
			urlItemsPerPage,
			urlSortField,
			urlSortDescending,
			new PostFilterRequest(urlTitleFilter, urlTags)
		);
	};

	const didUrlChange = () => {
		const request = getRequestFromUrl();
		return !searchRequest?.isEqual(request);
	};

	const updatePage = (page: number) => {
		setSearchRequest(searchRequest.updatePage(page));
		setReload(true);
	};

	const updateItemsPerPage = (itemsPerPage: number) => {
		setSearchRequest(searchRequest.updateItemsPerPage(itemsPerPage));
	};

	const updateSortField = (sortField: string) => {
		setSearchRequest(searchRequest.updateSortField(sortField));
	};

	const updateSortByDecending = (sortByDescending: boolean) => {
		setSearchRequest(searchRequest.updateSortByDecending(sortByDescending));
	};

	const updateFilterByTitle = (filterByTitle: string) => {
		const filter = searchRequest.filter;
		setSearchRequest(searchRequest.updateFilter(filter.updateFilterByTitle(filterByTitle)));
	};

	const updateFilterByTags = (filterByTags: string[]) => {
		const filter = searchRequest.filter;
		setSearchRequest(searchRequest.updateFilter(filter.updateFilterByTags(filterByTags)));
	};

	const showDeleteConfirmationModal = (post: AdminPost) => {
		setPostToDelete(post);
		setShowConfirmationModal(true);
	};

	return (
		<PageComponent>
			<section id="admin-post-list-container" className="admin-post-list-container">
				{
					(searchRequest != null && tags != null)
						? <AdminPostFilterComponent
							titleFilterChanged={updateFilterByTitle}
							itemsPerPageChanged={updateItemsPerPage}
							sortFieldChanged={updateSortField}
							sortDescendingChanged={updateSortByDecending}
							selectedTagsChanged={updateFilterByTags}
							titleFilter={searchRequest?.filter?.filterByTitle}
							itemsPerPage={searchRequest?.itemsPerPage}
							sortField={searchRequest?.sortField}
							sortDescending={searchRequest?.sortByDescending}
							tags={tags}
							selectedTags={searchRequest?.filter?.filterByTags}
							search={() => { setReload(true); }}/>
						: <div></div>
				}
				{
					(searchResponse?.items != null && searchResponse?.items.length > 0)
						? <div className="admin-post-list-content">
							<div className="admin-post-list">
								{
									searchResponse.items.map(post =>
										<ListItemComponent key={`admin-post-${post.id}`}
											post={post}
											editionAction={() => { navigate(`/admin/editor/${post.id}`); }}
											deleteAction={() => { showDeleteConfirmationModal(post); }}/>)
								}
							</div>
							<ModalComponent isVisible={showConfirmationModal} setIsVisible={setShowConfirmationModal} allowCloseOnOutClick={true}>
								{ (postToDelete != null)
									? <div className="editor-confirmation-modal">
										<p>Post {postToDelete.id} will be removed. Do you want to continue?</p>
										<div className="editor-confirmation-modal-actions">
											<button className="simple-button" onClick={() => { deletePost(postToDelete.id); }}>Accept</button>
											<button className="simple-button" onClick={() => { setShowConfirmationModal(false); }}>Cancel</button>
										</div>
									</div>
									: <div></div>
								}
							</ModalComponent>
							<PaginationComponent page={searchResponse.page} pages={searchResponse.pages} offset={2} onPageChanged={updatePage} />
						</div>
						: <div>Nothing here</div>
				}
			</section>
		</PageComponent>
	);
};

export default AdminComponent;
