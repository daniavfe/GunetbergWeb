import { Link } from "react-router-dom";
import User from "../../../domain/user/user";
import "./style.css";
import useViewModel from "./useViewModel";

const Header = () => {
    const viewmodel = useViewModel();

    return (
        <viewmodel.userContextConsumer>
            {(user) => (
                <header className="application-header">
                    <div id="header-logo" className="header-logo">
                        <h3>Gunetberg</h3>
                    </div>
                    <div className="header-expandable"></div>
                    <div id="header-profile" className="header-profile">
                        {user!! ? (
                            <>
                                <label>{user.email}</label>
                                <ul>
                                    <li>
                                        <Link to={`/profile/${user.alias}`}>
                                            Profile
                                        </Link>
                                    </li>
                                    <li>Log out</li>
                                </ul>
                            </>
                        ) : (
                            <div className="header-links">
                                <Link to="/login">Sign in</Link>
                                <Link to="/signup">Sign up</Link>
                            </div>
                        )}
                    </div>
                </header>
            )}
        </viewmodel.userContextConsumer>
    );
};

export default Header;
