export default class CompletePublicUser {
    id: string;
    alias: string;
    photoUrl?: string | null;
    description?: string | null;

    constructor(
        id: string,
        alias: string,
        photoUrl?: string | null,
        description?: string | null,
    ) {
        this.id = id;
        this.alias = alias;
        this.photoUrl = photoUrl;
        this.description = description;
    }
}
