import Tag from "../../../../domain/tag/tag";
import "./style.css";

export interface FilterProps {
    itemsPerPage?: number;
    updateItemsPerPage: (itemsPerPage: number) => void;
    sortField?: string;
    updateSortField: (sortField: string) => void;
    sortByDescending: boolean;
    updateSortByDescending: (sortByDescending: boolean) => void;
    filterByTitle?: string;
    updateFilterByTitle: (filterByTitle: string) => void;
    filterByTags: string[];
    updateFilterByTags: (filterByTags: string[]) => void;
    tags?: Tag[];
}

const Filter = (props: FilterProps) => {
    const checkTag = (id: string) => {
        const index = props.filterByTags.indexOf(id);
        if (index >= 0) {
            props.filterByTags.splice(index, 1);
            props.updateFilterByTags([...props.filterByTags]);
        } else {
            props.updateFilterByTags([...props.filterByTags, id]);
        }
    };

    return (
        <div
            id="post-list-filter-component"
            className="post-list-filter-component"
        >
            <h4>Filter</h4>
            <div className="filter-item">
                <h6>Items per page</h6>
                <select
                    value={props.itemsPerPage}
                    onChange={(e) =>
                        props.updateItemsPerPage(parseInt(e.target.value))
                    }
                >
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                </select>
            </div>

            <div className="filter-item">
                <h6>Title</h6>
                <input
                    type="text"
                    placeholder="title"
                    value={props.filterByTitle}
                    onChange={(e) => props.updateFilterByTitle(e.target.value)}
                />
            </div>

            <div className="filter-item">
                <h4>Tags</h4>
                {props.tags?.map((it) => (
                    <div key={`tag-${it.id}`}>
                        <input
                            type="checkbox"
                            value={it.id}
                            checked={props.filterByTags.includes(it.id)}
                            onChange={(e) => checkTag(e.target.value)}
                        />
                        <label>{it.name}</label>
                    </div>
                ))}
            </div>

            <div className="filter-item">
                <h6>Sort by</h6>
                <select
                    value={props.sortField}
                    onChange={(e) => props.updateSortField(e.target.value)}
                >
                    <option>CreatedAt</option>
                    <option>Title</option>
                    <option>CreatedBy</option>
                </select>
            </div>

            <div className="filter-item">
                <input
                    id="sortByDescendingInput"
                    type="checkbox"
                    checked={props.sortByDescending}
                    onChange={() =>
                        props.updateSortByDescending(!props.sortByDescending)
                    }
                />
                <label htmlFor="sortByDescendingInput">
                    Sort By descending
                </label>
            </div>
        </div>
    );
};

export default Filter;
