import { useEffect, useState } from "react";
import PostApiClient from "../../../api/postApiClient";
import SummaryPost from "../../../model/post/summaryPost";
import SearchRequest from "../../../model/common/searchRequest";
import PostFilterRequest from "../../../model/post/postFilterRequest";
import { AxiosResponse, post } from "axios";
import SearchResult from "../../../model/common/searchResult";
import SummaryPostComponent from "../summary-post/summary-post";
import PaginationComponent from "../../pagination/pagination";
import { useLocation, useSearchParams } from "react-router-dom";

import './post-list.scss'

interface PostListProps{
    postApiClient: PostApiClient
}

const PostListComponent: React.FC<PostListProps> = ({postApiClient}) =>{
    
    const location = useLocation();
    const [, setSearchParams] = useSearchParams();
    const [posts, setPosts] = useState<SearchResult<SummaryPost>>();
    const [refresh, setRefresh] = useState<boolean>(false);
    const [titleFilter, setTitleFilter] = useState<string>();
    const [page, setPage] = useState<number>();
    const [itemsPerPage, setItemsPerPage] = useState<number>();
    const [sortField, setSortField] = useState<string>();
    const [sortDescending, setSortDescending] = useState<boolean>();

    const defaultPage = 1;
    const defaultItemsPerPage = 5;
    const defaultSortField = "CreatedAt";

    const urlPageQuery = "page";
    const urlItemsPerPageQuery = "itemsPerPage";
    const urlSortFieldQuery = "sortField";
    const urlSortDescendingQuery = "sortDescending";
    const urlTitleFilterQuery = "titleFilter";
    
    const updatePage = (newPage:number) => updateValue(()=>setPage(newPage));

    const search = (
        page: number, 
        filterByTitle: string, 
        itemsPerPage: number,
        sortField: string,
        sortDescending: boolean,
        updateParams: boolean = true)=> {
        postApiClient.searchPosts(
            new SearchRequest<PostFilterRequest>(
                sortDescending, page, itemsPerPage, sortField, new PostFilterRequest(filterByTitle)
            )
        ).then((response: AxiosResponse<SearchResult<SummaryPost>>)=>{
            setPosts(response.data);
            setPage(response.data.page);
            setItemsPerPage(response.data.itemsPerPage);
            setSortField(response.data.sortingField);
            setSortDescending(response.data.sortByDescending); 
            if(updateParams){
                setSearchParams(
                    {
                        page: response.data.page.toString(), 
                        itemsPerPage: response.data.itemsPerPage.toString(),
                        sortField: response.data.sortingField.toString(),
                        sortDescending: response.data.sortByDescending.toString(),
                        titleFilter: titleFilter
                    }
                ) 
            }
        });
    };

    const updateValue= (action: Function)=>{
        action();
        setRefresh(true);
    }

    useEffect(()=>{
        if(refresh){
            search(page, titleFilter, itemsPerPage, sortField, sortDescending);
        }
    }, [refresh]);

    useEffect(()=>{
        if(refresh){
            setRefresh(false);
            return;
        }
        const params = new URLSearchParams(location.search);
        const urlPage = parseInt(params.get(urlPageQuery)) || defaultPage;
        const urlItemsPerPage = parseInt(params.get(urlItemsPerPageQuery)) || defaultItemsPerPage;
        const urlTitleFilter = params.get(urlTitleFilterQuery) || "";
        const urlSortField = params.get(urlSortFieldQuery) || defaultSortField;
        const urlSortDescending = params.get(urlSortDescendingQuery) == "true";
        setPage(urlPage);
        setItemsPerPage(urlItemsPerPage);
        setSortField(urlSortField);
        setSortDescending(urlSortDescending); 
        setTitleFilter(urlTitleFilter);
        search(urlPage, urlTitleFilter, urlItemsPerPage, urlSortField, urlSortDescending, false)
    }, [location])

    return (
        <section id="post-list-container" className="post-list-container">
            <div className="title-filter-container">
                <input id="post-list-search" className="post-list-search" type="text" value={titleFilter} onChange={(e)=>setTitleFilter(e.target.value)}/>
                <button className="simple-button" onClick={()=>setRefresh(true)}>Search</button>
            </div>
            {
                (posts != null && posts.items.length > 0) ? 
                <div>
                    <div id="sorting-container" className="sorting-container">
                        <select className="simple-select" value={itemsPerPage} onChange={(e)=>{updateValue(()=>setItemsPerPage(parseInt(e.target.value)))}}>
                            <option value={1}>1</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                        </select>

                        <select className="simple-select" value={sortField} onChange={(e)=>{updateValue(()=>setSortField(e.target.value))}}>
                            <option selected={sortField == posts.sortingField} value="Title">Title</option>
                            <option selected={sortField== posts.sortingField} value="CreatedAt">Created at</option>
                            <option selected={sortField == posts.sortingField} value="Language">Language</option>
                        </select>

                        <select className="simple-select" value={sortDescending.toString()} onChange={(e)=>{updateValue(()=>setSortDescending(e.target.value == "true"))}}>
                            <option value="true">Descending</option>
                            <option value="false">Ascending</option>
                        </select>
                    </div>
                    <div id="post-grid" className="post-grid">
                    {
                        posts.items.map(post=><SummaryPostComponent key={`summary-post-${post.id}`} summaryPost={post}></SummaryPostComponent> )
                    }   
                    </div>   
                    <PaginationComponent page={posts.page} pages={posts.pages} offset={2} onPageChanged={updatePage} />            
                </div> : <div>Nothing to show here</div> 
            }
            
        </section>
    )
}

export default PostListComponent;