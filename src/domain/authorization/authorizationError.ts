export default class AuthorizationError {
    isEmailEmpty: boolean;
    isEmailIncorrect: boolean;
    isPasswordEmpty: boolean;
    isUserNotFound: boolean;

    constructor(
        isEmailEmpty: boolean,
        isEmailIncorrect: boolean,
        isPasswordEmpty: boolean,
        isUserNotFound: boolean,
    ) {
        this.isEmailEmpty = isEmailEmpty;
        this.isEmailIncorrect = isEmailIncorrect;
        this.isPasswordEmpty = isPasswordEmpty;
        this.isUserNotFound = isUserNotFound;
    }
}
