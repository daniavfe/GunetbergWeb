import type Tag from "../../../../model/tag/tag";
import "./filter.scss";

interface PostFilterProps {
  titleFilterChanged: Function
  selectedTagsChanged: Function
  titleFilter: string
  tags: Tag[]
  selectedTags: string[]
}

const PostFilterComponent: React.FC<PostFilterProps> = ({
	titleFilterChanged,
	selectedTagsChanged,
	titleFilter,
	tags,
	selectedTags
}) => {
	const addSelectedTag = (tagId: string) => {
		const index = selectedTags.indexOf(tagId);
		if (index >= 0) {
			selectedTags.splice(index, 1);
			selectedTagsChanged([...selectedTags]);
		} else {
			selectedTagsChanged([...selectedTags, tagId]);
		}
	};

	return (
		<aside id="filter-container" className="filter-container">
			<div className="filter-content">
				<h2>Filter</h2>
				<h4>Title</h4>
				<input id="post-list-search" className="basic-input " type="text" placeholder="C# mindset..." value={titleFilter} onChange={(e) => titleFilterChanged(e.target.value)}/>
				<h4>Language</h4>
				<select className="basic-select">
					<option value={10}>es</option>
					<option value={25}>en</option>
				</select>
				<h4>Tags</h4>
				<div className="tag-chip-container">
					{
						tags.map(it =>
							<span key={`tag-${it.id}`} className="selectable-chip">
								<input id={`${it.id}-id`} type="checkbox" value={it.id} checked={selectedTags.includes(it.id)} onChange={(e) => { addSelectedTag(e.target.value); }}/>
								<label htmlFor={`${it.id}-id`}>{it.name}</label>
							</span>)
					}
				</div>
			</div>
		</aside>
	);
};

export default PostFilterComponent;
