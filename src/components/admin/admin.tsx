import { useEffect, useState } from "react";
import PostApiClient from "../../api/postApiClient";
import SearchRequest from "../../model/common/searchRequest";
import PostFilterRequest from "../../model/post/postFilterRequest";
import AdminPost from "../../model/post/adminPost";
import { AxiosResponse } from "axios";
import SearchResult from "../../model/common/searchResult";
import { useNavigate } from "react-router-dom";

interface AdminProps  {
    postApiClient: PostApiClient;
};

const AdminComponent: React.FC<AdminProps> = ({postApiClient})=>{

    const navigate = useNavigate();

    const [posts, setPosts] = useState<Array<AdminPost>>();

    const loadPosts = ()=>{
        postApiClient.searchAdminPosts(new SearchRequest<PostFilterRequest>(
            false, 1, 10, "CreatedAt", new PostFilterRequest("", [])
        )).then((response: AxiosResponse<SearchResult<AdminPost>>)=>{
            setPosts(response.data.items);
            console.log(response.data);
        })
    };

    useEffect(()=>{
        loadPosts();
    }, []);

    return (
        <div>
            <h1>Admin</h1>
            <div>
                {
                    (posts != null) ?
                    <div>
                    {
                        posts.map(post=> <div>{post.title} | {post.author.alias} <button onClick={()=>navigate(`/admin/editor/${post.id}`)}>Edit</button></div>)
                    }
                    </div>
                     : <div>Nothing here</div>
                }
            </div>
        </div>
    );
}

export default AdminComponent;