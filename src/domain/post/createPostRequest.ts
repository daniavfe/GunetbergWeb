export default class CreatePostRequest {
    title: string;
    language: string;
    imageUrl: string;
    summary: string;
    tags: string[];
    content: string;

    constructor(
        title: string,
        language: string,
        imageUrl: string,
        summary: string,
        tags: string[],
        content: string,
    ) {
        this.title = title;
        this.language = language;
        this.imageUrl = imageUrl;
        this.summary = summary;
        this.tags = tags;
        this.content = content;
    }
}
