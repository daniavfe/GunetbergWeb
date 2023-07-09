import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostApiClient from "../../../api/postApiClient";
import CompletePost from "../../../model/post/completePost";
import { AxiosResponse } from "axios";
import "./detail.scss"

interface DetailPostProps{
    postApiClient: PostApiClient
}


const DetailPostComponent: React.FC<DetailPostProps> = ({postApiClient}) => {
     
    const {id} = useParams();

    const [post, setPost] = useState<CompletePost>();

    useEffect(()=>{
        postApiClient.getPost(id)
            .then((response: AxiosResponse<CompletePost>)=>{
                setPost(response.data);
            });
    }, []);

    
    return (
        <section id="post-detail" className="post-detail">
            {
                post != null ? 
                <div>
                    <div className="post-image">
                        <img src={post.imageUrl}></img>
                    </div>
                    <h1>{post.title}</h1>
                    <p  className="post-content">{post.content}</p>
                </div> : 
                <div>No post loaded</div>
            }
        </section>
    )
}

export default DetailPostComponent;