export default class GetCommentRequest {
    postId: string;
    commentId: string;

    constructor(
        postId: string,
        commentId: string,
    ) {
        this.postId = postId;
        this.commentId = commentId;
    }
}