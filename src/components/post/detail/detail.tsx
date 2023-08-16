import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompletePost from "../../../model/post/completePost";
import { AxiosResponse } from "axios";
import AuthorComponent from "../../author/author";
import { postApiClient } from "../../../api/postApiClient";
import {EditorState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "./detail.scss"
import PageComponent from "../../page/page";


const DetailPostComponent: React.FC = () => {
     
    const {id} = useParams();

    const [editorState, setEditorState] = useState<EditorState>(null);
    const [post, setPost] = useState<CompletePost>();

    useEffect(()=>{
        postApiClient.getPost(id)
            .then((response: AxiosResponse<CompletePost>)=>{            
                setPost(response.data);
                setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(response.data.content))));
            });
    }, []);

    
    return (
        <PageComponent>
            <section id="post-detail" className="post-detail">
                {
                    post != null ? 
                    <div>
                        <div className="post-header">
                            <div className="post-header-image">
                                <img src={post.imageUrl}></img>
                            </div>
                            <div className="post-header-opacity"></div>
                            <div className="post-header-content">
                                <h1>{post.title}</h1>
                            </div>
                        </div>
                        <Editor
                            editorState={editorState}
                            readOnly={true}
                            toolbarHidden={true}/> 
                        <AuthorComponent author={post.author}></AuthorComponent>
                    </div> : 
                    <div>No post loaded</div>
                }
            </section>
        </PageComponent>
    )
}

export default DetailPostComponent;