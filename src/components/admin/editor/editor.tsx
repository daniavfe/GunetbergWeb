import {EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./editor.scss";
import PostApiClient from "../../../api/postApiClient";
import CreatePostRequest from "../../../model/post/createPostRequest";
import { AxiosResponse, post } from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CompletePost from "../../../model/post/completePost";
import UpdatePostRequest from "../../../model/post/updatePostRequest";

interface EditorProps  {
    postApiClient: PostApiClient;
};

const EditorComponent: React.FC<EditorProps> = ({postApiClient})=>{

    const navigate = useNavigate();
    const {id} = useParams();
    
    const [isCreationMode, setIsCreationMode] = useState<boolean>(true);
    const [title, setTitle] = useState<string>();
    const [imageUrl, setImageUrl] = useState<string>();
    const [editorState, setEditorState] = useState<EditorState>();

    const loadPost = (postId: string)=>{
        console.log("Requested post: "+ postId);
        postApiClient.getPost(postId)
            .then((response:AxiosResponse<CompletePost>)=>{
                const post = response.data;
                setTitle(post.title);
                setImageUrl(post.imageUrl);
                setIsCreationMode(false);
                setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(post.content))));
            })
            .catch(()=>{
                console.log("Something happened");
            });
    }

    const save = ()=>{
        if(isCreationMode){
            postApiClient.createPost(new CreatePostRequest(title, "es-es", imageUrl, JSON.stringify(convertToRaw(editorState.getCurrentContent()))))
                .then((response: AxiosResponse<string>)=>{
                    console.log("CREATED");
                    loadPost(response.data);
                })
                .catch(()=>{
                    console.log("Error");
                });
        }else {
            postApiClient.updatePost(
                id, 
                new UpdatePostRequest(
                    title, 
                    "es-es", 
                    imageUrl, 
                    JSON.stringify(convertToRaw(editorState.getCurrentContent())), []
                )
            ).then((response: AxiosResponse)=>{
                console.log("UPDATED");
                loadPost(id);
            })
            .catch(()=>{
                
                console.log("Error");
            });
        }
    };

    useEffect(()=>{
        if(!id){
            setEditorState(EditorState.createEmpty());
            return;
        }
        loadPost(id);
    }, []);

    return (
        <div>
            <h1>Editor</h1>
            <div>
            <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" placeholder="ImageUrl" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)}/>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editor-content"
                onEditorStateChange={setEditorState}/>
            </div>
            <button onClick={save}>Save</button>
        </div>
    );
}

export default EditorComponent;