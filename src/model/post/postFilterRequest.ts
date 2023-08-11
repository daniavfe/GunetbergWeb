import IEqual from "../abstractions/IEqual";

export default class PostFilterRequest implements IEqual<PostFilterRequest> {
    filterByTitle: string;
    filterByTags?: Array<string> = [];

    constructor(filterByTitle: string, filterBytags?: Array<string>){
        this.filterByTitle = filterByTitle;
        this.filterByTags = filterBytags;
    }

    updateFilterByTitle(filterByTitle: string): PostFilterRequest{
        return new PostFilterRequest(filterByTitle, this.filterByTags);
    }

    updateFilterByTags(filterByTags: Array<string>): PostFilterRequest{
        return new PostFilterRequest(this.filterByTitle, filterByTags);         
    }

    isEqual(request: PostFilterRequest): boolean {
        const sameTags = this.filterByTags
            .filter(x => !request.filterByTags.includes(x))
            .concat(request.filterByTags.filter(x => !this.filterByTags.includes(x)))
            .length == 0;

        return this.filterByTitle == request.filterByTitle 
            && sameTags;
    }

}
