import useViewModel from "./useViewModel";

const Login = () => {
    const viewmodel = useViewModel();

    return (
        <section>
            {viewmodel.authorizationError.isPasswordEmpty}
            <input
                type="text"
                value={viewmodel.authorizationRequest.email}
                onChange={(e) => viewmodel.updateEmail(e.target.value)}
            />
            {viewmodel.authorizationError.isEmailEmpty && "Email is empty"}
            {viewmodel.authorizationError.isEmailIncorrect &&
                "Email is incorrect"}
            <input
                type="text"
                value={viewmodel.authorizationRequest.password}
                onChange={(e) => viewmodel.updatePassword(e.target.value)}
            />
            {viewmodel.authorizationError.isPasswordEmpty &&
                "Password is empty"}
            {viewmodel.authorizationError.isUserNotFound && "User not found"}
            <button
                onClick={viewmodel.attemptLogin}
                disabled={
                    !viewmodel.authorizationRequest.email ||
                    !viewmodel.authorizationRequest.password
                }
            >
                Send
            </button>
            {viewmodel.isLoading && <label>IsLoading</label>}
        </section>
    );
};

export default Login;
