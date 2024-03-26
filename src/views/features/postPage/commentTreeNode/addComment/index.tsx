import useViewModel from "./useViewModel";
import { Link } from "react-router-dom";

import "./style.css";

export interface AddCommentProps {
    postId: string;
    onCommentAdded: (commentId: string) => void;
    commentId?: string;
    onCreationCancelled?: () => void;
}

const AddComment = ({
    postId,
    onCommentAdded,
    commentId,
    onCreationCancelled,
}: AddCommentProps) => {
    const viewmodel = useViewModel(
        postId,
        onCommentAdded,
        commentId,
        onCreationCancelled,
    );

    return (
        <viewmodel.userContextConsumer>
            {(user) => (
                <section
                    key={`add-comment-${commentId}`}
                    id="add-comment-component"
                    className="add-comment-component"
                >
                    {!user && (
                        <div className="user-not-signedin">
                            <p>
                                You must <Link to="/login">Sign in</Link> for
                                writing a comment
                            </p>
                        </div>
                    )}
                    {!!user && (
                        <div className="add-comment-form">
                            <img src={user?.photoUrl || ""} />
                            <div className="add-comment-content">
                                <textarea
                                    className="add-comment-textarea"
                                    placeholder="Write your comment here"
                                    value={viewmodel.comment}
                                    onChange={(e) =>
                                        viewmodel.updateComment(e.target.value)
                                    }
                                    onFocus={viewmodel.showActionButtons}
                                ></textarea>
                                {(!!onCreationCancelled ||
                                    viewmodel.isActionSectionVisible) && (
                                    <div className="add-comment-footer">
                                        <span>
                                            {" "}
                                            {viewmodel.comment?.length || 0}/250
                                        </span>
                                        <div className="add-comment-actions">
                                            <button
                                                className="main-button-transparent"
                                                onClick={
                                                    viewmodel.cancelCommentCreation
                                                }
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="main-button"
                                                onClick={
                                                    viewmodel.attemptCreateComment
                                                }
                                                disabled={!viewmodel.comment}
                                            >
                                                Comment
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </section>
            )}
        </viewmodel.userContextConsumer>
    );
};

export default AddComment;
