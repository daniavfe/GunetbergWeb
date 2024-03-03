export default class CreateCommentRequest {
    content: string;
    postId: string;
    commentId?: string;

    constructor(content: string, postId: string, commentId?: string) {
        this.content = content;
        this.postId = postId;
        this.commentId = commentId;
    }
}
