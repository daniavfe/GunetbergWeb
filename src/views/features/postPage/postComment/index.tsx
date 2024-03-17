import Comment from "../../../../domain/comment/comment";
import useViewModel from "./useViewModel";
import "./style.css";

export interface PostCommentProps{
    postId: string,
    comment?: Comment,
    loadComments: boolean
}

const PostComment = ({postId, comment, loadComments}: PostCommentProps)=>{

    const viewmodel = useViewModel(postId, loadComments, comment);

    return(
        <div className="post-comment">
            { comment &&
                <>
                    <h5>{comment.createdBy.alias}</h5>
                    <p>{comment.content}</p>
                    <p>Number of replies: {comment.numberOfReplies}</p>
                </>
            }
            {
                viewmodel.items.map(it=><PostComment postId={postId} comment={it} loadComments={false}></PostComment>)
            }
            <p>Remain items: {viewmodel.pagination?.remainItems}</p>
            <button onClick={viewmodel.loadMoreComments}>Load comments</button>  
        </div>
    );
}

export default PostComment;