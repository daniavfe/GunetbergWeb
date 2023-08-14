import {EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./editor.scss";
import CreateOrUpdatePostRequest from "../../../model/post/createOrUpdatePostRequest";
import { AxiosResponse, post } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { postApiClient } from "../../../api/postApiClient";
import ImageSelectorComponent from "./image-selector/image-selector";
import { tagApiClient } from "../../../api/tagApiClient";
import Tag from "../../../model/tag/tag";
import UpdatePost from "../../../model/post/updatePost";

const EditorComponent: React.FC = ()=>{

    const {id} = useParams();
    
    const [isCreationMode, setIsCreationMode] = useState<boolean>(true);
    const [editorState, setEditorState] = useState<EditorState>(null);
    const [tags, setTags] = useState<Array<Tag>>(null);
    const [createOrUpdatePostRequest, setCreateOrUpdatePostRequest] = useState<CreateOrUpdatePostRequest>(null);

    useEffect(()=>{
        retrieveTags();
        setEditorState(EditorState.createEmpty());
        setCreateOrUpdatePostRequest(
            new CreateOrUpdatePostRequest("", "", "", "", [], "")
        );
        if(!!id){
            loadPost(id);
        }
    }, []);

    const loadPost = (postId: string)=>{
        postApiClient.getUpdatePost(postId)
            .then((response:AxiosResponse<UpdatePost>)=>{
                const post = response.data;
                setIsCreationMode(false);
                setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(post.content))));
                setCreateOrUpdatePostRequest(
                    new CreateOrUpdatePostRequest(
                        post.title,
                        post.language,
                        post.imageUrl,
                        post.summary,
                        post.tags,
                        post.content
                    )
                );
            })
            .catch(()=>{
                console.log("Something happened");
            });
    }

    const save = ()=>{
        if(isCreationMode){
            postApiClient.createPost(createOrUpdatePostRequest)
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
                createOrUpdatePostRequest
            ).then((response: AxiosResponse)=>{
                console.log("UPDATED");
                loadPost(id);
            })
            .catch(()=>{
                
                console.log("Error");
            });
        }
    };

    const retrieveTags = ()=>{
        tagApiClient.getTags()
            .then((response: AxiosResponse<Array<Tag>>)=>{
                setTags(response.data);
        });
    };

    const addSelectedTag = (tagId: string)=>{       
        const index = createOrUpdatePostRequest.tags.indexOf(tagId);     
        if(index >= 0){
            createOrUpdatePostRequest.tags.splice(index, 1);
            setCreateOrUpdatePostRequest(createOrUpdatePostRequest.updateTags([...createOrUpdatePostRequest.tags]));
        }else{
            console.log([...createOrUpdatePostRequest.tags, tagId]);
            setCreateOrUpdatePostRequest(createOrUpdatePostRequest.updateTags([...createOrUpdatePostRequest.tags, tagId]));
        }

    }

    const updateTitle= (title:string) =>{
        setCreateOrUpdatePostRequest(createOrUpdatePostRequest.updateTitle(title));
    }

    const updateImageUrl= (imageUrl:string) =>{
        setCreateOrUpdatePostRequest(createOrUpdatePostRequest.updateImageUrl(imageUrl));
    }

    const updateSummary= (summary:string) =>{
        setCreateOrUpdatePostRequest(createOrUpdatePostRequest.updateSummary(summary));
    }

    const updateLanguage= (language:string) =>{
        setCreateOrUpdatePostRequest(createOrUpdatePostRequest.updateLanguage(language));
    }

    const updateContent= (editorState:EditorState) =>{
        setEditorState(editorState);
        setCreateOrUpdatePostRequest(
            createOrUpdatePostRequest.updateContent(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
        );
    }

    return (
        <section id="editor-container" className="editor-container">
            <h1>Editor</h1>
            {
                (createOrUpdatePostRequest != null)?
                <div>
                    <div className="editor-content-header">
                        <ImageSelectorComponent value={createOrUpdatePostRequest.imageUrl} onChange={(e)=>updateImageUrl(e)}/>
                        <div className="editor-content-header-summary">
                            <h3>Title</h3>
                            <input className="simple-input" type="text" placeholder="Title" value={createOrUpdatePostRequest.title} onChange={(e)=>updateTitle(e.target.value)}/>
                            <h3>Language</h3>
                            <input className="simple-input" type="text" placeholder="Title" value={createOrUpdatePostRequest.language} onChange={(e)=>updateLanguage(e.target.value)}/>
                            <h3>Summary</h3>
                            <textarea className="simple-input summary-editor" value={createOrUpdatePostRequest.summary} onChange={(e)=>updateSummary(e.target.value)}></textarea>
                            <h3>Tags</h3>
                            <div className="tag-chip-container">
                                {
                                    tags?.map(it=>
                                    <span key={`tag-${it.id}`} className="selectable-chip">
                                        <input id={`${it.id}-id`} type="checkbox" value={it.id} checked={createOrUpdatePostRequest.tags.includes(it.id)} onChange={(e)=>addSelectedTag(e.target.value)}/>
                                        <label htmlFor={`${it.id}-id`}>{it.name}</label></span>)
                                }
                            </div>
                        </div>
                    </div>
                    <h3>Content</h3>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editor-content"
                        onEditorStateChange={updateContent}/>
                    <button className="simple-button" onClick={save}>Save</button>
                </div>
                : <div></div>
            }
        </section>
    );
}

export default EditorComponent;