export default class PostFilterRequest {
    filterByTitle: string;
    filterByTags?: Array<string>

    constructor(filterByTitle: string, filterBytags?: Array<string>){
        this.filterByTitle = filterByTitle;
        this.filterByTags = filterBytags;
    }
}
