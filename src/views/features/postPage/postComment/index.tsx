import Comment from "../../../../domain/comment/comment";
import useViewModel from "./useViewModel";
import "./style.css";

export interface PostCommentProps{
    postId: string,
    comment?: Comment,
    isFirstNode: boolean
}

const PostComment = ({postId, comment, isFirstNode}: PostCommentProps)=>{

    const viewmodel = useViewModel(postId, isFirstNode, comment);

    return(
        <div className="comment">
            { comment &&
                <div className="comment-content">
                    <div className="comment-image">
                        <img src={comment.createdBy.photoUrl || ""}/>
                    </div>
                    <div className="comment-author">
                        <div>
                            <label>{comment.createdBy.alias} <span>{comment.createdAt.toUTCString()}</span></label>
                            <button className="main-button" onClick={viewmodel.toogleAddCommentSectionVisible}>Reply</button>  
                        </div>
                        <p>{comment.content}</p>  
                    </div>
                </div>
            }
            <div  className={`subcomments ${!isFirstNode? "subcomments-padding": ""}`}>
                {
                    viewmodel.isAddCommentSectionVisible &&
                    <div>
                        Add comment form
                    </div>
                }
                {
                    !!comment?.numberOfReplies &&
                    <button className="main-button-transparent" onClick={viewmodel.toogleReplySectionVisiblity}>
                        <span className="material-symbols-outlined">
                            {
                                viewmodel.isReplySectionVisible? "expand_less": "expand_more"
                            }
                        </span> 
                        <span>{`${comment.numberOfReplies} replies`}</span>
                    </button>
                }  
                {
                    viewmodel.isReplySectionVisible &&
                    <div>
                    {
                        viewmodel.items.map(it=><PostComment postId={postId} comment={it} isFirstNode={false}></PostComment>)
                    }
                    </div>
                }
            </div>

        </div>
    );
}

export default PostComment;