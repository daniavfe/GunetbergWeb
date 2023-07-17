import Tag from "../tag/tag";

export default class SummaryPost{  
    id: string;
    title: string;
    imageUrl: string;
    summary: string;
    language: string;
    tags: Array<Tag>;
}