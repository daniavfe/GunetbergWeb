import type AdminPost from "../../../model/post/adminPost";
import "./list-item.scss";

interface ListItemProp {
  post: AdminPost
  editionAction: Function
  deleteAction: Function
}

const ListItemComponent: React.FC<ListItemProp> = ({
	post,
	editionAction,
	deleteAction
}) => {
	const formatDate = (d: string) => {
		return new Date(Date.parse(d)).toLocaleString("en",
			{
				timeZone: "UTC",
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "numeric",
				minute: "numeric"
			});
	};

	return (
		<div className="list-item">
			<div className="list-item-content">
				<div>
					<h4>{post.title}</h4>
                    Created by {post.author.alias} at {formatDate(post.createdAt)}
				</div>
			</div>
			<div className="list-item-actions">
				<button className="simple-button" onClick={() => editionAction()}>Edit</button>
				<button className="simple-button" onClick={() => deleteAction()}>Delete</button>
			</div>
		</div>
	);
};

export default ListItemComponent;
