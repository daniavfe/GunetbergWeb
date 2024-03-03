export default class AuthorizationResponse {
    accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }
}
