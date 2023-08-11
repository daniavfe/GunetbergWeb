import IEqual from "../abstractions/IEqual";

export default class SearchRequest<T extends IEqual<T>> implements IEqual<SearchRequest<T>>{
    sortByDescending?: boolean;
    page?: number;
    itemsPerPage?: number;
    sortField?: string;
    filter?: T;
    

    constructor(
        page?: number, 
        itemsPerPage?: number, 
        sortField?: string,  
        sortByDescending?: boolean,
        filter?: T){
            this.page = page;
            this.itemsPerPage = itemsPerPage;
            this.sortField = sortField;
            this.sortByDescending = sortByDescending;
            this.filter = filter;
    }

    updateItemsPerPage(itemsPerPage: number): SearchRequest<T>{
        return new SearchRequest<T>(
            this.page, 
            itemsPerPage, 
            this.sortField, 
            this.sortByDescending,
            this.filter
        )  
    }

    updatePage(page: number): SearchRequest<T>{
        return new SearchRequest<T>(
            page, 
            this.itemsPerPage, 
            this.sortField, 
            this.sortByDescending,
            this.filter
        )      
    }

    updateSortField(sortField: string): SearchRequest<T>{
        return new SearchRequest<T>(
            this.page, 
            this.itemsPerPage, 
            sortField, 
            this.sortByDescending,
            this.filter
        )
    }

    updateSortByDecending(sortByDescending: boolean): SearchRequest<T>{
        return new SearchRequest<T>(
            this.page, 
            this.itemsPerPage, 
            this.sortField, 
            sortByDescending, 
            this.filter
        )
        
    }

    updateFilter(filter: T): SearchRequest<T> {
        return new SearchRequest<T>(
            this.page, 
            this.itemsPerPage, 
            this.sortField, 
            this.sortByDescending, 
            filter
        )
    }

    isEqual(request: SearchRequest<T>): boolean {
        return this.page == request.page
            && this.itemsPerPage == request.itemsPerPage
            && this.sortField == request.sortField
            && this.sortByDescending == request.sortByDescending
            && this.filter.isEqual(request.filter); 
    }

}