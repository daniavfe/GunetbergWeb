import "./style.css";

export interface PaginationProps {
    page: number;
    pages: number;
    updatePage: (page: number) => void;
    range?: number;
}

const Pagination = ({
    page,
    pages,
    updatePage,
    range = 2,
}: PaginationProps) => {
    const generatePagesRange = (): number[] => {
        return Array.from(Array(page + range + 1).keys()).filter((it) => {
            return it >= 1 && it <= pages && it >= page - range;
        });
    };

    return (
        <section id="pagination-component" className="pagination-component">
            {page - range > 1 && 
                <button
                    className="pagination-button"
                    key={`pagination-button-1}`}
                    onClick={() => updatePage(1)}
                >
                    1
                </button>
            }
            {generatePagesRange().map((it) => (
                <button
                    className="pagination-button"
                    key={`pagination-button-${it}`}
                    disabled={it == page}
                    onClick={() => updatePage(it)}
                >
                    {it}
                </button>
            ))}
            {page + range < pages && 
                <button
                    className="pagination-button"
                    key={`pagination-button-${pages}}`}
                    onClick={() => updatePage(pages)}
                >
                    {pages}
                </button>
            }
        </section>
    );
};

export default Pagination;
