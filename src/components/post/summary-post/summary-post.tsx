import { NavLink, useNavigate } from "react-router-dom";
import SummaryPost from "../../../model/post/summaryPost";
import './summary-post.scss'


interface SummaryPostProps{
    summaryPost: SummaryPost;
}

const SummaryPostComponent: React.FC<SummaryPostProps> = ({summaryPost})=>{

    const navigate = useNavigate()

    const loadDetailPost: React.MouseEventHandler<HTMLDivElement> = (e) =>{
        e.preventDefault();
        navigate(`/posts/${summaryPost.id}`);
    }

    return (
        <div className="summary-post" onClick={loadDetailPost}>
            <div className="summary-post-image">
                <img src={summaryPost.imageUrl}/>
            </div>
            <div className="summary-post-content">
                <h3>{summaryPost.title}</h3>
                <p>{summaryPost.summary}</p>
            </div>
        </div>
    )
}

export default SummaryPostComponent;