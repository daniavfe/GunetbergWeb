import "./pagination-header.scss";

interface PaginationHeaderComponentProp {
  itemsPerPage: number
  sortField: string
  sortDescending: boolean
  itemsPerPageChanged: Function
  sortFieldChanged: Function
  sortDescendingChanged: Function
}

const PaginationHeaderComponent: React.FC<PaginationHeaderComponentProp> = ({
	itemsPerPage,
	sortField,
	sortDescending,
	itemsPerPageChanged,
	sortFieldChanged,
	sortDescendingChanged
}) => {
	return (
		<section id="pagination-header-container" className="pagination-header-container">
			<select className="basic-select" value={itemsPerPage} onChange={(e) => { itemsPerPageChanged(parseInt(e.target.value)); }}>
				<option value={10}>10</option>
				<option value={25}>25</option>
				<option value={50}>50</option>
			</select>

			<select className="basic-select" value={sortField} onChange={(e) => { sortFieldChanged(e.target.value); }}>
				<option value="Title">Title</option>
				<option value="CreatedAt">Created at</option>
				<option value="Language">Language</option>
			</select>

			<select className="basic-select" value={sortDescending.toString()} onChange={(e) => { sortDescendingChanged(e.target.value == "true"); }}>
				<option value="true">Descending</option>
				<option value="false">Ascending</option>
			</select>
		</section>
	);
};

export default PaginationHeaderComponent;
