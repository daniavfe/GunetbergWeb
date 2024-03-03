import useViewModel from "./useViewModel";
import "./style.css";

const PostPage = () => {
    const viewModel = useViewModel();

    return (
        <section id="post-page" className="post-page">
            {
                viewModel.post && 
                    <>
                        <div className="post-header">
                            <h1>{viewModel.post?.title}</h1>
                            <h5>{viewModel.post.createdAt.toDateString()}</h5>
                        </div>  
                        <div className="post-image">
                            <img src={viewModel.post?.imageUrl || ""}/>
                        </div>
                        <p className="post-content">{viewModel.post?.content}</p>
                        <div className="post-author">
                            <div className="author-image">
                                <img src={viewModel.post.author.photoUrl || ""}/>
                            </div>
                            <div className="author-content">
                                <h4>{viewModel.post.author.alias}</h4>
                                <p>{viewModel.post.author.description}</p>
                            </div>
                        </div>
                    </>
            }
        </section>
    );
};

export default PostPage;
