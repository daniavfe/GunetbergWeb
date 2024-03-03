import SummaryPost from "../../../../domain/post/summaryPost";
import Chip from "../../../components/chip";
import "./style.css";

export interface SummaryProps {
    post: SummaryPost;
    onClick: (post: SummaryPost) => void;
}

const Summary = (props: SummaryProps) => {
    return (
        <div
            id={`summary-post-${props.post.id}`}
            className="summary-post"
            onClick={() => props.onClick(props.post)}
        >
            <div id="summary-post-image">
                <img className="summary-post-image" src={props.post.imageUrl}></img>
            </div>
            <div id="summary-post-content" className="summary-post-content">
                <h4>{props.post.title}</h4>
                <div className="summary-post-tags">
                    {props.post.tags.map(it=><Chip>{it.name}</Chip>)}
                </div>
                <p>{props.post.summary}</p>
            </div>       
        </div>
    );
};

export default Summary;
