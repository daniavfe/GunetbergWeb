export default class CreateUserRequest {
    email: string;
    alias: string;
    password: string;
    passwordCheck: string;

    constructor(
        email: string,
        alias: string,
        password: string,
        passwordCheck: string,
    ) {
        this.email = email;
        this.alias = alias;
        this.password = password;
        this.passwordCheck = passwordCheck;
    }
}
