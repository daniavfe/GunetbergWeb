import useViewModel from "./useViewModel";
import CommentTreeNode from "./commentTreeNode";
import "./style.css";

const PostPage = () => {
    const viewmodel = useViewModel();

    return (
        <section id="post-page" className="post-page">
            {viewmodel.post && (
                <>
                    <div className="post-header">
                        <h1>{viewmodel.post.title}</h1>
                        <h5>{viewmodel.post.createdAt.toDateString()}</h5>
                    </div>
                    <div className="post-image">
                        <img src={viewmodel.post.imageUrl || ""} />
                    </div>
                    <p className="post-content">{viewmodel.post?.content}</p>
                    <div className="post-author">
                        <div className="author-image">
                            <img src={viewmodel.post.author.photoUrl || ""} />
                        </div>
                        <div className="author-content">
                            <h4>{viewmodel.post.author.alias}</h4>
                            <p>{viewmodel.post.author.description}</p>
                        </div>
                    </div>
                    <div className="post-comments">
                        <h4>Comments</h4>
                        <CommentTreeNode
                            postId={viewmodel.post.id}
                        ></CommentTreeNode>
                    </div>
                </>
            )}
        </section>
    );
};

export default PostPage;
