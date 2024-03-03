export default class SearchResult<T> {
    page: number;
    pages: number;
    itemsPerPage: number;
    sortingField: string;
    sortByDescending: boolean;
    items: T[];

    constructor(
        page: number,
        pages: number,
        itemsPerPage: number,
        sortingField: string,
        sortByDescending: boolean,
        items: T[],
    ) {
        this.page = page;
        this.pages = pages;
        this.itemsPerPage = itemsPerPage;
        this.sortingField = sortingField;
        this.sortByDescending = sortByDescending;
        this.items = items;
    }
}
