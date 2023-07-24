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
    return (
        <aside id="filter-container" className="filter-container">
            <h3>Filter</h3>
            <div className="filter-content">
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

                <select value={selectedTags} multiple onChange={(e)=>{selectedTagsChanged(Array.from(e.target.selectedOptions, option => option.value))}}>
                    {
                        tags.map(it=><option value={it.id}>{it.name}</option>)
                    }

                </select>

                <button className="simple-button" onClick={()=>refresh(true)}>Search</button>
            </div>
        </aside>
    );
}

export default PostFilterComponent
     