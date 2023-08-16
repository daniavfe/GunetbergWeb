import { useEffect, useState } from "react";
import AuthorizationRequest from "../../model/authorization/authorizationRequest";
import { AxiosResponse } from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authApiClient } from "../../api/authApiClient";
import { useCookies } from "../../persistence/cookieService";
import "./login.scss";

const LoginComponent: React.FC = ()=>{
    
    const navigate = useNavigate();

    const [searchParams, _] = useSearchParams();
    const [callback, setCallback] = useState<string>();
    const [errorMessageVisible, setErrorMessageVisible] = useState<boolean>();
    const [authorizationAttemptEnabled, setAuthorizationAttemptEnabled] = useState<boolean>();
    const [authorizationRequest, setAuthorizationRequest] = useState<AuthorizationRequest>(
        new AuthorizationRequest("", "")
    );

    useEffect(()=>{
        setAuthorizationAttemptEnabled(false);
        setCallback(searchParams.get("callback") || "/");
    }, [])

    useEffect(()=>{
        checkExistingToken();
    }, [callback])

    useEffect(()=>{
        setAuthorizationAttemptEnabled(authorizationRequest.isCorrect());
    }, [authorizationRequest])

    const attemptAuthorization = ()=>{
        authApiClient.authorize(authorizationRequest)
            .then((response: AxiosResponse<string>)=>{
                useCookies.setToken(response.data);
                navigate(callback);
                
            })
            .catch(()=>{
                setErrorMessageVisible(true);
            });
    };

    const validateToken = ()=>{
        authApiClient.validateToken()
            .then((response: AxiosResponse)=>{
                navigate(callback);             
            })
            .catch(()=>{
                console.log("Token is not valid");
                useCookies.removeToken();
            });
    };

    const checkExistingToken = ()=>{
        const token = useCookies.getToken();
        if(!!token){
            validateToken();
        }
    }

    const updateEmail = (email:string) => {
        setAuthorizationRequest(authorizationRequest.updateEmail(email));
    }

    const updatePassword = (password:string) => {
        setAuthorizationRequest(authorizationRequest.updatePassword(password));
    }
    
    return (
        <section id="login-container" className="login-container">
            <div className="left-login-section">
                <div className="left-login-opacity-mask"></div>
                <img src="https://img.freepik.com/free-photo/geometric-shape-background-engraving-style_53876-128769.jpg?w=1380&t=st=1692205162~exp=1692205762~hmac=5abf5215c038b23478b8ff74e3c011bafd7f99ae3942afd14b984b7b21013ade"/>
            </div>
            <div className="right-login-section">
                <div className="login-window">
                    <h1>Login</h1>
                    <input className="simple-input" type="text" placeholder="email" value={authorizationRequest.email} onChange={(e)=>updateEmail(e.target.value)}/>
                    <input className="simple-input" type="password" placeholder="password" value={authorizationRequest.password} onChange={(e)=>updatePassword(e.target.value)}/>
                    <span className="login-error-message" hidden={!errorMessageVisible}>Email or password not correct.</span>
                    <button className="simple-button" disabled={!authorizationAttemptEnabled} onClick={attemptAuthorization}>Login</button>
                </div>           
            </div>
        </section>
    );
}

export default LoginComponent;