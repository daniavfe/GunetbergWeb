import { useState } from "react";
import Tag from "../../../../model/tag/tag";
import "./filter.scss"

interface PostFilterProps{
    titleFilterChanged: Function;
    itemsPerPageChanged: Function,
    sortFieldChanged: Function,
    sortDescendingChanged: Function,
    selectedTagsChanged: Function,
    titleFilter: string,
    itemsPerPage:number,
    sortField:string,
    sortDescending: boolean,
    tags:Array<Tag>,
    selectedTags:Array<string>,
    refresh:Function
}

const PostFilterComponent: React.FC<PostFilterProps> = ({
        titleFilterChanged,
        itemsPerPageChanged, 
        sortFieldChanged, 
        sortDescendingChanged, 
        selectedTagsChanged,
        titleFilter,
        itemsPerPage,
        sortField,
        sortDescending,
        tags,
        selectedTags,
        refresh 
    }) => {

    const [filterSelectedtags, _] = useState<Array<string>>([]);

    const addSelectedTag = (tagId: string)=>{
        const index = filterSelectedtags.indexOf(tagId);
        if(index >= 0){
            filterSelectedtags.splice(index, 1);
        }else{
            filterSelectedtags.push(tagId);
        }
        console.log(filterSelectedtags);
        selectedTagsChanged(filterSelectedtags);
    }
 
    return (
        <aside id="filter-container" className="filter-container">
            <div className="filter-content">
                <h3>Filter</h3>
                <input id="post-list-search" className="post-list-search" type="text" placeholder="Title" value={titleFilter} onChange={(e)=>titleFilterChanged(e.target.value)}/>

                <select className="simple-select" value={itemsPerPage} onChange={(e)=>{itemsPerPageChanged(parseInt(e.target.value))}}>
                    <option value={1}>1</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                </select>

                <select className="simple-select" value={sortField} onChange={(e)=>{sortFieldChanged(e.target.value)}}>
                    <option value="Title">Title</option>
                    <option value="CreatedAt">Created at</option>
                    <option value="Language">Language</option>
                </select>

                <select className="simple-select" value={sortDescending.toString()} onChange={(e)=>{sortDescendingChanged(e.target.value == "true")}}>
                    <option value="true">Descending</option>
                    <option value="false">Ascending</option>
                </select>

                <h4>Tags</h4>
                <div className="tag-chip-container">
                {
                    tags.map(it => 
                        <span key={`tag-${it.id}`} className="selectable-chip">
                            <input id={`${it.id}-id`} type="checkbox" value={it.id} onChange={(e)=>addSelectedTag(e.target.value)}/>
                            <label htmlFor={`${it.id}-id`}>{it.name}</label>
                        </span>)
                }
                </div>

                <button className="simple-button" onClick={()=>refresh(true)}>Search</button>
            </div>
        </aside>
    );
}

export default PostFilterComponent
     