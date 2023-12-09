import type Tag from "../tag/tag";

export default class SummaryPost {
	id: string;
	title: string;
	imageUrl: string;
	summary: string;
	language: string;
	tags: Tag[];

	constructor (
		id: string,
		title: string,
		imageUrl: string,
		summary: string,
		language: string,
		tags: Tag[]) {
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.summary = summary;
		this.language = language;
		this.tags = tags;
	}
}
