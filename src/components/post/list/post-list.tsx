import { useEffect, useState } from "react";
import PostApiClient from "../../../api/postApiClient";
import SummaryPost from "../../../model/post/summaryPost";
import SearchRequest from "../../../model/common/searchRequest";
import PostFilterRequest from "../../../model/post/postFilterRequest";
import { AxiosResponse } from "axios";
import SearchResult from "../../../model/common/searchResult";
import SummaryPostComponent from "../summary-post/summary-post";
import './post-list.scss'
import PaginationComponent from "../../pagination/pagination";

interface PostListProps{
    postApiClient: PostApiClient
}

const PostListComponent: React.FC<PostListProps> = ({postApiClient}) =>{
    
    const [posts, setPosts] = useState<SearchResult<SummaryPost>>();
    const [titleFilter, setTitleFilter] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);
    const [sortField, setSortField] = useState<string>("CreatedAt");
    const [sortDescending, setSortDescending] = useState<boolean>(false);

    const search = (
        page: number, 
        filterByTitle: string, 
        itemsPerPage: number,
        sortField: string,
        sortDescending: boolean)=> {
        postApiClient.searchPosts(
            new SearchRequest<PostFilterRequest>(
                sortDescending, page, itemsPerPage, sortField, new PostFilterRequest(filterByTitle)
            )
        ).then((response: AxiosResponse<SearchResult<SummaryPost>>)=>{
            setPosts(response.data);
        });
    };

    useEffect(()=>{
        search(page, titleFilter, itemsPerPage, sortField, sortDescending);
    }, [page, itemsPerPage, sortField, sortDescending]);

    return (
        <section id="post-list-container" className="post-list-container">
            <div className="title-filter-container">
                <input id="post-list-search" className="post-list-search" type="text" value={titleFilter} onChange={(e)=>setTitleFilter(e.target.value)}/>
                <button className="simple-button" onClick={()=>search(posts.page, titleFilter, itemsPerPage, sortField, sortDescending)}>Search</button>
            </div>
            {
                (posts != null && posts.items.length > 0) ? 
                <div>
                    <div>
                        <select value={itemsPerPage} onChange={(e)=>{setItemsPerPage(parseInt(e.target.value))}}>
                            <option value={1}>1</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                        </select>

                        <select value={sortField} onChange={(e)=>{setSortField(e.target.value)}}>
                            <option value="Title">Title</option>
                            <option value="CreatedAt">Created at</option>
                            <option value="Language">Language</option>
                        </select>

                        <select value={sortDescending.toString()} onChange={(e)=>{setSortDescending(e.target.value == "true")}}>
                            <option value="true">Descending</option>
                            <option value="false">Ascending</option>
                        </select>
                    </div>
                    <div id="post-grid" className="post-grid">
                    {
                        posts.items.map(post=><SummaryPostComponent key={`summary-post-${post.id}`} summaryPost={post}></SummaryPostComponent> )
                    }   
                    </div>   
                    <PaginationComponent page={posts.page} pages={posts.pages} offset={3} onPageChanged={setPage} />            
                </div> : <div>Nothing to show here</div> 
            }
            
        </section>
    )
}

export default PostListComponent;