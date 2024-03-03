import useViewModel from "./useViewModel";

const SignUp = () => {
    const viewmodel = useViewModel();

    return (
        <div id="signup-page">
            <input
                type="text"
                placeholder="alias"
                value={viewmodel.createUserRequest?.alias}
                onChange={(e) => viewmodel.updateAlias(e.target.value)}
            />
            <input
                type="text"
                placeholder="email"
                value={viewmodel.createUserRequest?.email}
                onChange={(e) => viewmodel.updateEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={viewmodel.createUserRequest?.password}
                onChange={(e) => viewmodel.updatePassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="password verification"
                value={viewmodel.createUserRequest?.passwordCheck}
                onChange={(e) => viewmodel.updatePasswordCheck(e.target.value)}
            />
            <button onClick={viewmodel.attemptSignup}>Go!</button>
        </div>
    );
};

export default SignUp;
