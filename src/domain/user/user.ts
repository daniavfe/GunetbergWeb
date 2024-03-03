export default class User {
    id: string;
    email: string;
    alias: string;
    photoUrl?: string | null;
    description?: string | null;

    constructor(
        id: string,
        email: string,
        alias: string,
        photoUrl?: string | null,
        description?: string | null,
    ) {
        this.id = id;
        this.email = email;
        this.alias = alias;
        this.photoUrl = photoUrl;
        this.description = description;
    }
}
