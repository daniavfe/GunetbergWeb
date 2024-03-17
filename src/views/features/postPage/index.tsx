import useViewModel from "./useViewModel";
import "./style.css";
import PostComment from "./postComment";

const PostPage = () => {
    const viewmodel = useViewModel();

    return (
        <section id="post-page" className="post-page">
            {
                viewmodel.post && 
                    <>
                        <div className="post-header">
                            <h1>{viewmodel.post.title}</h1>
                            <h5>{viewmodel.post.createdAt.toDateString()}</h5>
                        </div>  
                        <div className="post-image">
                            <img src={viewmodel.post.imageUrl || ""}/>
                        </div>
                        <p className="post-content">{viewmodel.post?.content}</p>
                        <div className="post-author">
                            <div className="author-image">
                                <img src={viewmodel.post.author.photoUrl || ""}/>
                            </div>
                            <div className="author-content">
                                <h4>{viewmodel.post.author.alias}</h4>
                                <p>{viewmodel.post.author.description}</p>
                            </div>
                        </div>
                        <div className="post-comments">
                            <h4>Comments</h4>
                            <PostComment postId={viewmodel.post.id} isFirstNode={true}></PostComment>                      
                        </div>             
                    </>
            }
        </section>
    );
};

export default PostPage;
