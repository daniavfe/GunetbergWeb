export default class CreatePostRequest{
    title: string;
    language:string;
    imageUrl:string;
    content:string;

    constructor(title: string, language: string, imageUrl: string, content: string){
        this.title = title;
        this.language = language;
        this.imageUrl = imageUrl;
        this.content = content;
    }
}