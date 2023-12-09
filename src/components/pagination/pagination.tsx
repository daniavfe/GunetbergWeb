import "./pagination.scss";

interface PaginationProps {
  page: number
  pages: number
  offset: number
  onPageChanged: Function
}

const PaginationComponent: React.FC<PaginationProps> = ({ page, pages, offset, onPageChanged }) => {
	const getPaginationItems = () => {
		if (pages == 1) {
			return [];
		}
		return Array.from(Array(page + offset + 1).keys()).filter(it => {
			return it >= 1 && it <= pages && it >= page - offset;
		});
	};

	const getFirstPageButton = () => {
		if (page - offset > 1) {
			return (
				<button key="pagination-button-1" className="pagination-button" onClick={() => onPageChanged(1)}>First</button>
			);
		}
	};

	const getLastPageButton = () => {
		if (page + offset < pages) {
			return (
				<button key={`pagination-button-${pages}`} className="pagination-button" onClick={() => onPageChanged(pages)}>Last</button>
			);
		}
	};

	return (
		<div id="pagination-container" className='pagination-container'>
			{getFirstPageButton()}
			{
				getPaginationItems().map(p =>
					<button key={`pagination-button-${p}`} className="pagination-button" onClick={() => onPageChanged(p)} disabled={page == p}>
						{p}
					</button>
				)
			}
			{getLastPageButton()}
		</div>
	);
};

export default PaginationComponent;
