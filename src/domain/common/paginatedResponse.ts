export default class PaginatedResponse<T> {
    page: number;
    pages: number;
    totalItems: number;
    itemsPerPage: number;
    items: T[];

    constructor(
        page: number,
        pages: number,
        totalItems: number,
        itemsPerPage: number,
        items: T[],
    ) {
        this.page = page;
        this.pages = pages;
        this.totalItems = totalItems;
        this.itemsPerPage = itemsPerPage;
        this.items = items;
    }
}
