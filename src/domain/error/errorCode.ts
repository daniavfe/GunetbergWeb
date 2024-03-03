enum ErrorCode {
    EmptyAlias,
    AliasAlreadyInUse,
    EmptyEmail,
    IncorrectEmail,
    EmailAlreadyInUse,
    EmptyPassword,
    EmptyPasswordCheck,
    PasswordsMissmach,
    AuthorizationUserNotFound,
    EntityNotFound,
    Unknown,
    HandledByIterceptor,
}

export default ErrorCode;
