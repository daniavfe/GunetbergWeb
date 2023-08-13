import { useEffect, useState } from "react";
import SummaryPost from "../../../model/post/summaryPost";
import SearchRequest from "../../../model/common/searchRequest";
import PostFilterRequest from "../../../model/post/postFilterRequest";
import { AxiosResponse } from "axios";
import SearchResult from "../../../model/common/searchResult";
import SummaryPostComponent from "../summary-post/summary-post";
import PaginationComponent from "../../pagination/pagination";
import { useLocation, useSearchParams } from "react-router-dom";
import Tag from "../../../model/tag/tag";
import PostFilterComponent from "./filter/filter";
import { postApiClient } from "../../../api/postApiClient";
import { tagApiClient } from "../../../api/tagApiClient";

import './post-list.scss'

const PostListComponent: React.FC = () =>{
    
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [tags, setTags] = useState<Array<Tag>>(null);
    const [searchRequest, setSearchRequest] = useState<SearchRequest<PostFilterRequest>>(null);
    const [searchResponse, setSearchResponse] = useState<SearchResult<SummaryPost>>(null);
    const [updateParams, setUpdateParams] = useState<boolean>(true);

    useEffect(()=>{
        getTags();
    },[]);

    useEffect(()=>{
        if(!!searchRequest){
            search();
        }     
    }, [searchRequest]);

    useEffect(()=>{
        if(didUrlChange()){
            if(searchParams.size>0){
                setUpdateParams(false);
            }
            setSearchRequest(getRequestFromUrl());
        }
    }, [location]);
    
    const search = ()=> {
        postApiClient.searchPosts(searchRequest)
        .then((response: AxiosResponse<SearchResult<SummaryPost>>)=>{
            setSearchResponse(response.data);   
            if(updateParams){ 
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
            setUpdateParams(true);        
        });
    };

    const getTags = ()=>{
        tagApiClient.getTags()
            .then((response: AxiosResponse<Array<Tag>>)=>{
                setTags(response.data);
        });
    };
    
    const didUrlChange = ()=>{
        const request = getRequestFromUrl();
        return !searchRequest?.isEqual(request);
    };

    const getRequestFromUrl = (): SearchRequest<PostFilterRequest>=>{
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
    }

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

    
    const pageChangeHandler = (e: number)=>updatePage(e);
    const itemsPerPageChangeHandler = (e: number)=>updateItemsPerPage(e);
    const sortFieldChangeHandler = (e:string)=>updateSortField(e);
    const sortDescendingChangeHandler = (e:boolean)=>updateSortByDecending(e);

    const titleFilterChangeHandler = (e:string)=>updateFilterByTitle(e);
    const selectedTagsChangeHandler = (e:Array<string>)=>updateFilterByTags(e);

    

    return (
        <section id="post-list-container" className="post-list-container">
            {
                (searchRequest!= null && tags != null) ?
                    <PostFilterComponent 
                        titleFilterChanged={titleFilterChangeHandler}
                        itemsPerPageChanged={itemsPerPageChangeHandler}
                        sortFieldChanged={sortFieldChangeHandler}
                        sortDescendingChanged={sortDescendingChangeHandler}
                        selectedTagsChanged={selectedTagsChangeHandler}
                        titleFilter={searchRequest?.filter?.filterByTitle}
                        itemsPerPage={searchRequest?.itemsPerPage}
                        sortField={searchRequest?.sortField}
                        sortDescending={searchRequest?.sortByDescending}
                        tags={tags}
                        selectedTags={searchRequest?.filter?.filterByTags}/> : <div></div>
            }
                
            {             
                (searchResponse?.items != null && searchResponse?.items .length > 0) ? 
                <div id="post-list-content" className="post-list-content">         
                    <div id="post-list" className="post-list">
                    {
                        searchResponse?.items.map(post=><SummaryPostComponent key={`summary-post-${post.id}`} summaryPost={post}></SummaryPostComponent> )
                    }   
                    </div>   
                    <PaginationComponent page={searchResponse.page} pages={searchResponse.pages} offset={2} onPageChanged={pageChangeHandler} />       
                </div> : <div>There is nothing here</div>
            }
        </section>

    )
}

export default PostListComponent;