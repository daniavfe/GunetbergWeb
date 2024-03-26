import "./style.css";
import useViewModel, { SortField, SortProps } from "./useViewModel";

const Sort = (props: SortProps) => {
    const viewmodel = useViewModel(props);

    return (
        <div id="sort-component" className="sort-component">
            <div
                id="sort-order"
                className="sort-order"
                onClick={() => {
                    viewmodel.toggleSortOrder();
                    viewmodel.hideSelection();
                }}
            >
                <span className="material-symbols-outlined">
                    {viewmodel.isSortByDescending
                        ? "arrow_downward"
                        : "arrow_upward"}
                </span>
            </div>

            <div
                id="select-sort-field"
                className="select-sort-field"
                onClick={viewmodel.toggleSelection}
            >
                <span>{viewmodel.selectedField?.text}</span>
                <span className="material-symbols-outlined">
                    {!viewmodel.isSelectionVisible
                        ? "arrow_drop_down"
                        : "arrow_drop_up"}
                </span>
                {viewmodel.isSelectionVisible && (
                    <div className="select-sort-item">
                        <ul>
                            {props.fields.map((it) => (
                                <li
                                    key={`field-option-${it.value}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        viewmodel.selectField(it);
                                    }}
                                >
                                    {it.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sort;
