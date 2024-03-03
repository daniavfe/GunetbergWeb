import PublicUser from "../user/publicUser";

export default class Comment {
    id: string;
    createdAt: Date;
    createdBy: PublicUser;
    content: string;

    constructor(
        id: string,
        createdAt: Date,
        createdBy: PublicUser,
        content: string,
    ) {
        this.id = id;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.content = content;
    }
}
