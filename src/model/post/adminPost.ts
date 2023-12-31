import AdminAuthor from "../author/adminAuthor";
import Tag from "../tag/tag";

export default class AdminPost {
    id: string;
    language: string;
    title: string;
    createdAt: string;
    author: AdminAuthor;
    tags: Array<Tag>;
}