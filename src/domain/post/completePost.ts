import Tag from "../tag/tag";
import CompletePublicUser from "../user/completePublicUser";

export default class CompletePost {
    id: string;
    language: string;
    title: string;
    imageUrl?: string | null;
    content: string;
    createdAt: Date;
    tags: Tag[];
    author: CompletePublicUser;

    constructor(
        id: string,
        language: string,
        title: string,
        content: string,
        createdAt: Date,
        tags: Tag[],
        author: CompletePublicUser,
        imageUrl?: string | null,
    ) {
        this.id = id;
        this.language = language;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.tags = tags;
        this.author = author;
        this.imageUrl = imageUrl;
    }
}
