import useViewModel from "./useViewModel";
import "./style.css";
import { Link } from "react-router-dom";

const SignUp = () => {
    const viewmodel = useViewModel();

    return (
        <section id="signup-page" className="signup-page">
            <div className="signup-window">
                <h3>Sign up</h3>
                <div>
                    <p>Welcome to gunetberg!</p>
                    <p>
                        Don you have an account?{" "}
                        <Link to="/login">Sign in</Link>
                    </p>
                </div>

                <div className="signup-form">
                    <input
                        className="signup-input"
                        type="text"
                        placeholder="Alias"
                        value={viewmodel.createUserRequest?.alias}
                        onChange={(e) => viewmodel.updateAlias(e.target.value)}
                    />
                    <input
                        className="signup-input"
                        type="text"
                        placeholder="Email"
                        value={viewmodel.createUserRequest?.email}
                        onChange={(e) => viewmodel.updateEmail(e.target.value)}
                    />
                    <input
                        className="signup-input"
                        type="password"
                        placeholder="Password"
                        value={viewmodel.createUserRequest?.password}
                        onChange={(e) =>
                            viewmodel.updatePassword(e.target.value)
                        }
                    />
                    <input
                        className="signup-input"
                        type="password"
                        placeholder="Repeat password"
                        value={viewmodel.createUserRequest?.passwordCheck}
                        onChange={(e) =>
                            viewmodel.updatePasswordCheck(e.target.value)
                        }
                    />
                    <div className="signup-errors">
                        {viewmodel.createUserError?.isAliasEmpty && (
                            <span className="login-error-message">
                                Alias is empty
                            </span>
                        )}
                        {viewmodel.createUserError?.isAliasAlreadyInUse && (
                            <span className="login-error-message">
                                Alias already in use
                            </span>
                        )}
                        {viewmodel.createUserError?.isEmailEmpty && (
                            <span className="login-error-message">
                                Email is empty
                            </span>
                        )}
                        {viewmodel.createUserError?.isEmailIncorrect && (
                            <span className="login-error-message">
                                Email is incorrect
                            </span>
                        )}
                        {viewmodel.createUserError?.isEmailAlreadyInUse && (
                            <span className="login-error-message">
                                Email already in use
                            </span>
                        )}
                        {viewmodel.createUserError?.isPasswordEmpty && (
                            <span className="login-error-message">
                                Password is empty
                            </span>
                        )}
                        {viewmodel.createUserError?.isCheckPasswordEmpty && (
                            <span className="login-error-message">
                                Repeat password is empty
                            </span>
                        )}
                        {viewmodel.createUserError?.doPasswordsMismatch && (
                            <span className="login-error-message">
                                Passwords do not match
                            </span>
                        )}
                    </div>
                </div>
                {!viewmodel.isLoading && (
                    <button
                        className="main-button"
                        onClick={viewmodel.attemptSignup}
                        disabled={!viewmodel.canSignup()}
                    >
                        Submit
                    </button>
                )}
                {viewmodel.isLoading && <div>Is loading</div>}
            </div>
        </section>
    );
};

export default SignUp;
