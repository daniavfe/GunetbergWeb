import { useEffect, useState } from "react";
import SearchRequest from "../../model/common/searchRequest";
import PostFilterRequest from "../../model/post/postFilterRequest";
import AdminPost from "../../model/post/adminPost";
import { AxiosResponse } from "axios";
import SearchResult from "../../model/common/searchResult";
import { useNavigate } from "react-router-dom";
import Tag from "../../model/tag/tag";
import PostFilterComponent from "../post/list/filter/filter";
import PaginationComponent from "../pagination/pagination";
import { postApiClient } from "../../api/postApiClient";
import { tagApiClient } from "../../api/tagApiClient";

const AdminComponent: React.FC= ()=>{

    const navigate = useNavigate();

    const [searchRequest, setSearchRequest] = useState<SearchRequest<PostFilterRequest>>(
        new SearchRequest<PostFilterRequest>(
            false, 1, 10, "CreatedAt", new PostFilterRequest("", [])
        )
    );

    const [searchResponse, setSearchResponse] = useState<SearchResult<AdminPost>>();

    const [tags, setTags] = useState<Array<Tag>>([]);

    const search = ()=>{
        postApiClient.searchAdminPosts(searchRequest).then((response: AxiosResponse<SearchResult<AdminPost>>)=>{
            setSearchResponse(response.data);
        })
    };

    const getTags = ()=>{
        tagApiClient.getTags()
            .then((response: AxiosResponse<Array<Tag>>)=>{
                setTags(response.data);
        });
    };

    const updateItemsPerPage = (itemsPerPage: number)=>{
        setSearchRequest(
            new SearchRequest<PostFilterRequest>(
                searchRequest.sortByDescending, searchRequest.page, itemsPerPage, searchRequest.sortField, 
                new PostFilterRequest(searchRequest.filter.filterByTitle, searchRequest.filter.filterByTags)
            )
        );
    }

    const updatePage = (page: number)=>{
        setSearchRequest(
            new SearchRequest<PostFilterRequest>(
                searchRequest.sortByDescending, page, searchRequest.itemsPerPage, searchRequest.sortField, 
                new PostFilterRequest(searchRequest.filter.filterByTitle, searchRequest.filter.filterByTags)
            )
        );
    }

    const updateSortField= (sortField: string)=>{
        setSearchRequest(
            new SearchRequest<PostFilterRequest>(
                searchRequest.sortByDescending, searchRequest.page, searchRequest.itemsPerPage, sortField, 
                new PostFilterRequest(searchRequest.filter.filterByTitle, searchRequest.filter.filterByTags)
            )
        );
    }

    const updateSortByDecending= (sortByDescending: boolean)=>{
        setSearchRequest(
            new SearchRequest<PostFilterRequest>(
                sortByDescending, searchRequest.page, searchRequest.itemsPerPage, searchRequest.sortField, 
                new PostFilterRequest(searchRequest.filter.filterByTitle, searchRequest.filter.filterByTags)
            )
        );
    }

    const updateFilterByTitle= (filterByTitle: string)=>{
        setSearchRequest(
            new SearchRequest<PostFilterRequest>(
                searchRequest.sortByDescending, searchRequest.page, searchRequest.itemsPerPage, searchRequest.sortField, 
                new PostFilterRequest(filterByTitle, searchRequest.filter.filterByTags)
            )
        );
    }

    const updateFilterByTags= (filterByTags: Array<string>)=>{
        setSearchRequest(
            new SearchRequest<PostFilterRequest>(
                searchRequest.sortByDescending, searchRequest.page, searchRequest.itemsPerPage, searchRequest.sortField, 
                new PostFilterRequest(searchRequest.filter.filterByTitle, filterByTags)
            )
        );
    }

    useEffect(()=>{
        getTags();
        search();
    }, []);

    return (
        <div>
            <h1>Admin</h1>
            <div>
                <div>
                <PostFilterComponent 
                        titleFilterChanged={updateFilterByTitle}
                        itemsPerPageChanged={updateItemsPerPage}
                        sortFieldChanged={updateSortField}
                        sortDescendingChanged={updateSortByDecending}
                        selectedTagsChanged={updateFilterByTags}
                        titleFilter={searchRequest.filter.filterByTitle}
                        itemsPerPage={searchRequest.itemsPerPage}
                        sortField={searchRequest.sortField}
                        sortDescending={searchRequest.sortByDescending}
                        tags={tags}
                        selectedTags={searchRequest.filter.filterByTags}
                        refresh={search}/> 
                </div>
                {
                    (searchResponse != null) ?
                    <div>
                        <div>
                        {
                            searchResponse.items.map(post=> <div key={`admin-post-${post.id}`}>{post.title} | {post.author.alias} <button onClick={()=>navigate(`/admin/editor/${post.id}`)}>Edit</button></div>)
                        }
                        </div>
                        <PaginationComponent page={searchResponse.page} pages={searchResponse.pages} offset={2} onPageChanged={updatePage} /> 
                    </div>
                     : <div>Nothing here</div>
                }
            </div>
        </div>
    );
}

export default AdminComponent;