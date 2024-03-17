export default class CreateUserError {
    isAliasEmpty: boolean;
    isEmailEmpty: boolean;
    isEmailIncorrect: boolean;
    isPasswordEmpty: boolean;
    isCheckPasswordEmpty: boolean;
    doPasswordsMismatch: boolean;
    isAliasAlreadyInUse: boolean;
    isEmailAlreadyInUse: boolean;

    constructor(
        isAliasEmpty: boolean,
        isEmailEmpty: boolean,
        isEmailIncorrect: boolean,
        isPasswordEmpty: boolean,
        isCheckPasswordEmpty: boolean,
        doPasswordsMismatch: boolean,
        isAliasAlreadyInUse: boolean,
        isEmailAlreadyInUse: boolean,
    ) {
        this.isAliasEmpty = isAliasEmpty,
        this.isEmailEmpty = isEmailEmpty;
        this.isEmailIncorrect = isEmailIncorrect;
        this.isPasswordEmpty = isPasswordEmpty;
        this.isCheckPasswordEmpty = isCheckPasswordEmpty;
        this.doPasswordsMismatch = doPasswordsMismatch;
        this.isAliasAlreadyInUse = isAliasAlreadyInUse;
        this.isEmailAlreadyInUse = isEmailAlreadyInUse;
    }
}
