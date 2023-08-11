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
            1, 10, "CreatedAt", true, new PostFilterRequest("", [])
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

    const updatePage = (page: number)=>{
        setSearchRequest(searchRequest.updatePage(page));
    }

    const updateItemsPerPage = (itemsPerPage: number)=>{
        setSearchRequest(searchRequest.updateItemsPerPage(itemsPerPage));
    }

    const updateSortField= (sortField: string)=>{
        setSearchRequest(searchRequest.updateSortField(sortField));
    }

    const updateSortByDecending= (sortByDescending: boolean)=>{
        setSearchRequest(searchRequest.updateSortByDecending(sortByDescending));
    }

    const updateFilterByTitle= (filterByTitle: string)=>{
        const filter = searchRequest.filter;
        setSearchRequest(searchRequest.updateFilter(filter.updateFilterByTitle(filterByTitle)));
    }

    const updateFilterByTags= (filterByTags: Array<string>)=>{
        const filter = searchRequest.filter;
        setSearchRequest(searchRequest.updateFilter(filter.updateFilterByTags(filterByTags)));
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