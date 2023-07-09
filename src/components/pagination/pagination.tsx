import './pagination.scss';

interface PaginationProps{
    page: number,
    pages: number,
    offset: number,
    onPageChanged: Function,
}

const PaginationComponent: React.FC<PaginationProps> = ({page, pages, offset, onPageChanged}) =>{

    const getPaginationItems = () => {    
        return Array.from(Array(page+offset+1).keys()).filter(it=>{
            return it >=1 && it <= pages && it >= page-offset
        })        
    }

    return(
        <div id="pagination-container" className='pagination-container'>
            {
                getPaginationItems().map(p=>
                    <button key={`pagination-button-${p}`} className="pagination-button" onClick={()=>onPageChanged(p)} disabled={page == p}>
                        {p}
                    </button>
                ) 
            }
        </div>
    );
}

export default PaginationComponent;