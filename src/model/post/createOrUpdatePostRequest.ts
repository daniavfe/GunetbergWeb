export default class CreateOrUpdatePostRequest {
	title: string;
	language: string;
	imageUrl: string;
	summary: string;
	tags: string[];
	content: string;

	constructor (
		title: string,
		language: string,
		imageUrl: string,
		summary: string,
		tags: string[],
		content: string
	) {
		this.title = title;
		this.language = language;
		this.imageUrl = imageUrl;
		this.summary = summary;
		this.tags = tags;
		this.content = content;
	}

	updateTitle (title: string): CreateOrUpdatePostRequest {
		return new CreateOrUpdatePostRequest(
			title,
			this.language,
			this.imageUrl,
			this.summary,
			this.tags,
			this.content
		);
	}

	updateLanguage (language: string): CreateOrUpdatePostRequest {
		return new CreateOrUpdatePostRequest(
			this.title,
			language,
			this.imageUrl,
			this.summary,
			this.tags,
			this.content
		);
	}

	updateImageUrl (imageUrl: string): CreateOrUpdatePostRequest {
		return new CreateOrUpdatePostRequest(
			this.title,
			this.language,
			imageUrl,
			this.summary,
			this.tags,
			this.content
		);
	}

	updateSummary (summary: string): CreateOrUpdatePostRequest {
		return new CreateOrUpdatePostRequest(
			this.title,
			this.language,
			this.imageUrl,
			summary,
			this.tags,
			this.content
		);
	}

	updateTags (tags: string[]): CreateOrUpdatePostRequest {
		return new CreateOrUpdatePostRequest(
			this.title,
			this.language,
			this.imageUrl,
			this.summary,
			tags,
			this.content
		);
	}

	updateContent (content: string): CreateOrUpdatePostRequest {
		return new CreateOrUpdatePostRequest(
			this.title,
			this.language,
			this.imageUrl,
			this.summary,
			this.tags,
			content
		);
	}
}
