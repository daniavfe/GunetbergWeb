import type Author from "../author/author";
import type Tag from "../tag/tag";

export default class CompletePost {
	id: string;
	language: string;
	title: string;
	imageUrl: string;
	content: string;
	createdBy: string;
	createdAt: Date;
	author: Author;
	tags: Tag[];
}
