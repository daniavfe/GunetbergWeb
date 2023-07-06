export default class SearchResult<T>{
    page: number;
    pages: number;
    itemsPerPage: number;
    sortingField: string;
    sortByDescending: boolean;
    items: Array<T>;
}