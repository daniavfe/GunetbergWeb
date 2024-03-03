export default class GetCommentsRequest {
    page: number;
    itemsPerPage: number;
    postId: string;
    commentId?: string;

    constructor(
        page: number,
        itemsPerPage: number,
        postId: string,
        commentId?: string,
    ) {
        this.page = page;
        this.itemsPerPage = itemsPerPage;
        this.postId = postId;
        this.commentId = commentId;
    }
}
