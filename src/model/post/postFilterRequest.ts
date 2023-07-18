export default class PostFilterRequest {
    filterByTitle: string;
    filterBytags?: Array<string>

    constructor(filterByTitle: string, filterBytags?: Array<string>){
        this.filterByTitle = filterByTitle;
        this.filterBytags = filterBytags;
    }
}
