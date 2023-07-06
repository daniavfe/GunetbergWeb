export default class SearchRequest<T>{
    sortByDescending: boolean;
    page?: number;
    itemsPerPage?: number;
    sortField?: string;
    filter?: T;

    constructor(
        sortByDescending: boolean,
        page?: number, 
        itemsPerPage?: number, 
        sortField?: string,  
        filter?: T){

            this.sortByDescending = sortByDescending;
            this.page = page;
            this.itemsPerPage = itemsPerPage;
            this.sortField = sortField;
            this.filter = filter;
    }
}