import { useEffect, useState } from "react";
import AuthApiClient from "../../api/authApiClient";
import AuthorizationRequest from "../../model/authorization/authorizationRequest";
import { AxiosResponse } from "axios";
import CookieService from "../../persistence/cookieService";
import { useNavigate } from "react-router-dom";
import ValidationRequest from "../../model/authorization/validationRequest";
import ValidationResponse from "../../model/authorization/validationResponse";

interface LoginProps{
    authApiClient: AuthApiClient,
    cookieService: CookieService
}


const LoginComponent: React.FC<LoginProps> = ({authApiClient, cookieService})=>{

    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const attemptAuthorization = ()=>{
        authApiClient.authorize(new AuthorizationRequest(email, password))
            .then((response: AxiosResponse<string>)=>{
                cookieService.setToken(response.data);
                navigate(`/`);
            })
            .catch(()=>{
                console.log("TODO:Log the error");
            });
    };

    const validateToken = (token:string)=>{
        authApiClient.validateToken()
            .then((response: AxiosResponse)=>{
                navigate(`/`);             
            })
            .catch(()=>{
                console.log("Token is not valid");
                cookieService.removeToken();
            });
    };

    const checkExistingToken = ()=>{
        const token = cookieService.getToken();
        console.log(token);
        if(!!token){
            validateToken(token);
        }
    }


    useEffect(()=>{
        checkExistingToken();
    }, [])

    
    return (
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={attemptAuthorization}>Login</button>
        </div>
    );
}

export default LoginComponent;