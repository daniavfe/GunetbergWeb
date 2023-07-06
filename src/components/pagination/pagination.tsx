import './pagination.scss';

interface PaginationProps{
    page: number,
    pages: number
}


const PaginationComponent: React.FC<PaginationProps> = ({page, pages}) =>{

    const loadPage: React.MouseEventHandler<HTMLDivElement> = (e) =>{
        e.preventDefault();
    }

    return(
        <div id="pagination-container" className='pagination-container'>
            {
                Array.from(Array(pages).keys()).map(p=>
                    <div className="pagination-item" onClick={loadPage}>
                        {p+1}
                    </div>
                ) 
            }
        </div>
    );
}

export default PaginationComponent;