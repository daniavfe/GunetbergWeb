export default class PostFilterRequest {
    filterByTitle: string;
    filterByTags: string[];

    constructor(filterByTitle: string, filterByTags: string[]) {
        this.filterByTitle = filterByTitle;
        this.filterByTags = filterByTags;
    }
}
