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
    EmptyComment,
    EmptyPostId,
    IncorrectPostId,
    IncorrectCommentId,
}

export default ErrorCode;
