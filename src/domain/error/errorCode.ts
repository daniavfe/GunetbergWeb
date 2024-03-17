enum ErrorCode {
    EmptyAlias,
    AliasAlreadyInUse,
    EmptyEmail,
    IncorrectEmail,
    EmailAlreadyInUse,
    EmptyPassword,
    EmptyPasswordCheck,
    PasswordsMismatch,
    AuthorizationUserNotFound,
    EntityNotFound,
    Unknown,
    HandledByIterceptor,
}

export default ErrorCode;
