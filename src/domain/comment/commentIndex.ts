export default class CommentIndex {
    page: number;
    itemsPerPage: number;
    pages: number;
    totalItems: number;

    constructor(
        page: number,
        itemsPerPage: number,
        pages: number,
        totalItems: number,
    ) {
        this.page = page;
        this.itemsPerPage = itemsPerPage;
        this.pages = pages;
        this.totalItems = totalItems;
    }
}
