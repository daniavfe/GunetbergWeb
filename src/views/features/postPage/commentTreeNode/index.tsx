import Comment from "../../../../domain/comment/comment";
import useViewModel from "./useViewModel";
import "./style.css";
import AddComment from "./addComment";
import { Link } from "react-router-dom";

export interface CommentTreeNodeProps {
    postId: string;
    comment?: Comment;
}

const CommentTreeNode = ({ postId, comment }: CommentTreeNodeProps) => {
    const viewmodel = useViewModel(postId, comment);

    return (   
        <>
            {!comment && (
                <section
                    key="comment-tree-root"
                    id="comment-tree-root"
                    className="comment-tree-root"
                >
                    <AddComment
                        postId={postId}
                        onCommentAdded={viewmodel.includeNewComment}
                    ></AddComment>
                    {!viewmodel.isLoading && (
                        <div className="root-items">
                            {viewmodel.items.map((it) => 
                                <CommentTreeNode
                                    key={`comment-${it.id}`}
                                    postId={postId}
                                    comment={it}>    
                                </CommentTreeNode>
                            )}
                        </div>
                    )}
                    {viewmodel.pagination &&
                        viewmodel.pagination?.remainItems > 0 && (
                            <div>
                                <button
                                    className="main-button-transparent"
                                    onClick={viewmodel.loadComments}
                                >
                                    Load more replies (
                                    {viewmodel.pagination.remainItems})
                                </button>
                            </div>
                        )}
                </section>
            )}
            {!!comment && (
                <section
                    id={`comment-${comment.id}`}
                    className="comment-tree-node"
                >

                            <div className="comment-author-image">
                                <img src={comment.createdBy.photoUrl || ""} />
                            </div>
                            <div className="comment-content">
                                <span>
                                    <Link
                                        to={`/profile/${comment.createdBy.alias}`}
                                    >
                                        {comment.createdBy.alias}
                                    </Link>
                                </span>
                                <p>{comment.content}</p>
                                <div className="comment-actions">
                                    {viewmodel.isCommentSectionVisible && (
                                        <AddComment
                                            postId={postId}
                                            onCommentAdded={
                                                viewmodel.includeNewComment
                                            }
                                            commentId={comment.id}
                                            onCreationCancelled={
                                                viewmodel.toggleCommentSectionVisibility
                                            }
                                        ></AddComment>
                                    )}
                                    <viewmodel.userContextConsumer>
                                        {
                                            user=>
                                            <>
                                            {!viewmodel.isCommentSectionVisible &&
                                                !!user && (
                                                    <button
                                                        className="main-button-transparent"
                                                        onClick={
                                                            viewmodel.toggleCommentSectionVisibility
                                                        }
                                                    >
                                                        <span>
                                                            Reply to{" "}
                                                            {comment.createdBy.alias}
                                                        </span>
                                                    </button>
                                            )}
                                            </>
                                        }
                                    </viewmodel.userContextConsumer>
                                    
                                    {comment.numberOfReplies > 0 && (
                                        <button
                                            className="main-button-transparent"
                                            onClick={
                                                viewmodel.toggleReplySectionVisibility
                                            }
                                        >
                                            <span className="material-symbols-outlined">
                                                {viewmodel.isReplySectionVisible
                                                    ? "expand_less"
                                                    : "expand_more"}
                                            </span>
                                            <span>{`${comment.numberOfReplies} replies`}</span>
                                        </button>
                                    )}
                                </div>
                                {viewmodel.isLoading && (
                                    <span>Loading comments...</span>
                                )}
                                {viewmodel.isReplySectionVisible && (
                                    <div className="comment-replies">
                                        {viewmodel.items.map((it) => (
                                            <CommentTreeNode
                                                key={`comment-${it.id}`}
                                                postId={postId}
                                                comment={it}
                                            ></CommentTreeNode>
                                        ))}
                                    </div>
                                )}
                                {viewmodel.pagination &&
                                    viewmodel.pagination?.remainItems > 0 && (
                                        <div>
                                            <button
                                                className="main-button-transparent"
                                                onClick={viewmodel.loadComments}
                                            >
                                                Load more replies (
                                                {
                                                    viewmodel.pagination
                                                        .remainItems
                                                }
                                                )
                                            </button>
                                        </div>
                                    )}
                            </div>
                        
                </section>
            )}
        </>
    );
};

export default CommentTreeNode;
