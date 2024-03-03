import useViewModel from "./useViewModel";
import Pagination from "../../components/pagination";
import Filter from "./filter";
import Summary from "./summary";
import "./style.css";
import Sort from "../../components/sort";
import Chip from "../../components/chip";

const PostListPage = () => {
    const viewmodel = useViewModel();

    const sortFields = [
        {text:"Created at", value:"CreatedAt"},
        {text:"Title", value:"Title"},
        {text:"Created by", value:"CreatedBy"}
    ];

    return (
        <section id="post-list-page" className="post-list-page">
            {viewmodel.isLoading &&
                <span>Is loading</span>
            }
            <header className="post-list-header">
                <h2>Latest posts</h2>      
                
                <div className="post-list-header-actions">
                    <Sort 
                        fields={sortFields} 
                        selected={viewmodel.searchRequest.sortField} 
                        sortByDescending={viewmodel.searchRequest.sortByDescending}
                        onFieldChanged={viewmodel.updateSortField}
                        onSortOrderChanged={viewmodel.updateSortByDescending}></Sort>
                    <div className="search-input-container">
                        <span className="material-symbols-outlined">search</span>
                        <input type="text" placeholder="Search" value={viewmodel.searchRequest.filter?.filterByTitle} onChange={(e)=>viewmodel.updateFilterByTitle(e.target.value)} className="search-input"></input>
                    </div> 
                </div>  
            </header>
            
            <div id="post-grid-container" className="post-grid-container">
                {viewmodel.searchResult?.items.map((it) => (
                    <Summary key={`summary-post-${it.id}`} post={it} onClick={viewmodel.loadPost} />
                ))}
            </div>


            {viewmodel.searchResult && (
                        <Pagination
                            page={viewmodel.searchResult.page}
                            pages={viewmodel.searchResult.pages}
                            updatePage={viewmodel.updatePage}
                        />
                    )}
        </section>
    );
};

export default PostListPage;
