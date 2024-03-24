export default class CreateCommentError {
    isContentEmpty: boolean;
    isPostIdEmpty: boolean;
    isPostIdIncorrect: boolean;
    isCommentIdIncorrect: boolean;

    constructor(
        isContentEmpty: boolean,
        isPostIdEmpty: boolean,
        isPostIdIncorrect: boolean,
        isCommentIdIncorrect: boolean
    ) {
        this.isContentEmpty = isContentEmpty,
        this.isPostIdEmpty = isPostIdEmpty;
        this.isPostIdIncorrect = isPostIdIncorrect;
        this.isCommentIdIncorrect = isCommentIdIncorrect;
    }
}