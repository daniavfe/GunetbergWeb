import useViewModel from "./useViewModel";
import "./style.css"
import { Link } from "react-router-dom";

const Login = () => {
    const viewmodel = useViewModel();

    return (
        <section id="login-page" className="login-page">
            <div className="login-window">
                <h3>Sign in</h3>
                <div>
                    <p>Welcome back!</p>
                    <p>Don't you have an account? <Link to="/signup">Sign up</Link></p>
                </div>
                {viewmodel.authorizationError.isPasswordEmpty}

                <div className="login-form">
                    <input
                        className="login-input"
                        type="text"
                        placeholder="Email"
                        value={viewmodel.authorizationRequest.email}
                        onChange={(e) => viewmodel.updateEmail(e.target.value)}
                    />
                    <input
                        className="login-input"
                        type="password"
                        placeholder="Password"
                        value={viewmodel.authorizationRequest.password}
                        onChange={(e) => viewmodel.updatePassword(e.target.value)}
                    />
                    <div className="login-errors">
                        {viewmodel.authorizationError.isEmailEmpty && 
                            <span className="login-error-message">Email is empty</span>
                        }
                        {viewmodel.authorizationError.isEmailIncorrect &&
                            <span className="login-error-message">Email is incorrect</span>
                        }
                        {viewmodel.authorizationError.isPasswordEmpty &&
                            <span className="login-error-message">Password is empty</span>
                        }
                        {viewmodel.authorizationError.isUserNotFound && 
                            <span className="login-error-message">User not found</span>
                        }
                    </div>
                    
                </div>
                { !viewmodel.isLoading && 
                    <button
                        className="main-button"
                        onClick={viewmodel.attemptLogin}
                        disabled={
                            !viewmodel.authorizationRequest.email ||
                            !viewmodel.authorizationRequest.password
                        }>
                        Continue
                    </button>
                }
                { viewmodel.isLoading && 
                    <div>Is loading</div>
                }
                <p>Did you <Link to="">forget your password?</Link></p>
            </div>
        </section>
    );
};

export default Login;
