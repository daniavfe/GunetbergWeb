import { useNavigate } from "react-router-dom";
import SummaryPost from "../../../model/post/summaryPost";
import './summary-post.scss'


interface SummaryPostProps{
    summaryPost: SummaryPost;
}

const SummaryPostComponent: React.FC<SummaryPostProps> = ({summaryPost})=>{

    const navigate = useNavigate()

    const loadDetailPost: React.MouseEventHandler<HTMLDivElement> = (e) =>{
        e.preventDefault();
        navigate(`/posts/${summaryPost.title.replace(/ /g,"-").toLowerCase()}`);
    }

    return (
        <div className="summary-post" onClick={loadDetailPost}>
            <div className="summary-post-image-container">
                <div className="summary-post-image">
                    <img src={summaryPost.imageUrl}/>
                </div>
                <div className="summary-post-image-opacity"></div>
                <div className="summary-post-image-content">
                    <h3>{summaryPost.title}</h3>
                    <div className="language-chip">{summaryPost.language}</div>
                </div>
            </div>
            <div className="summary-post-content">
                <p>{summaryPost.summary}</p>
            </div>
            <div className="tag-list">
                {
                    summaryPost.tags.map(tag=><span key={`post-tag-id-${tag.id}`} className="tag">{tag.name}</span>)
                }
            </div>
        </div>
    )
}

export default SummaryPostComponent;