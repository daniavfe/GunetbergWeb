export default class PublicUser {
    id: string;
    alias: string;
    photoUrl?: string | null;

    constructor(id: string, alias: string, photoUrl?: string | null) {
        this.id = id;
        this.alias = alias;
        this.photoUrl = photoUrl;
    }
}
