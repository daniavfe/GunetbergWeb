import type AdminAuthor from "../author/adminAuthor";
import type Tag from "../tag/tag";

export default class AdminPost {
	id: string;
	language: string;
	title: string;
	createdAt: string;
	author: AdminAuthor;
	tags: Tag[];
}
