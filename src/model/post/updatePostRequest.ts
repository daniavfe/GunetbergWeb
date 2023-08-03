export default class UpdatePostRequest{
    title: string;
    language:string;
    imageUrl:string;
    content:string;
    tags: Array<string>;

    constructor(title: string, language: string, imageUrl: string, content: string, tags: Array<string>){
        this.title = title;
        this.language = language;
        this.imageUrl = imageUrl;
        this.content = content;
        this.tags = tags;
    }
}