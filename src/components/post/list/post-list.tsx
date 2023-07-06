import { useEffect, useState } from "react";
import PostApiClient from "../../../api/postApiClient";
import SummaryPost from "../../../model/post/summaryPost";
import SearchRequest from "../../../model/common/searchRequest";
import PostFilterRequest from "../../../model/post/postFilterRequest";
import { AxiosResponse } from "axios";
import SearchResult from "../../../model/common/searchResult";
import SummaryPostComponent from "../summary-post/summary-post";
import PostListHeaderComponent from "../list-header/post-list-header";
import './post-list.scss'
import PaginationComponent from "../../pagination/pagination";

interface PostListProps{
    postApiClient: PostApiClient
}

const PostListComponent: React.FC<PostListProps> = ({postApiClient}) =>{
    
    const [posts, setPosts] = useState<SearchResult<SummaryPost>>();
    const [titleFilter, setTitleFilter] = useState<string>("");

    const search =(page: number, filterByTitle: string)=> {
        postApiClient.searchPosts(
            new SearchRequest<PostFilterRequest>(
                true, page, 10, null, new PostFilterRequest(filterByTitle)
            )
        ).then((response: AxiosResponse<SearchResult<SummaryPost>>)=>{
            setPosts(response.data);
        });
    }

    useEffect(()=>{
        search(1, "");
    }, []);

    return (
        <section id="post-list-container" className="post-list-container">
            <PostListHeaderComponent/>
            <div className="title-filter-container">
                <input type="text" value={titleFilter} onChange={(e)=>setTitleFilter(e.target.value)}/>
                <button onClick={()=>search(posts.page, titleFilter)}>Search</button>
            </div>
            {
                posts != null ? 
                <div>
                    <div id="post-grid" className="post-grid">
                    {
                        posts.items.map(post=><SummaryPostComponent summaryPost={post}></SummaryPostComponent> )
                    }   
                    </div>   
                    <PaginationComponent page={posts.page} pages={posts.pages} />            
                </div> : <div>Nothing to show here</div> 
            }
            
        </section>
    )
}

export default PostListComponent;