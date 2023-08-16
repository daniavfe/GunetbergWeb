import { useEffect, useState } from "react";
import AuthorizationRequest from "../../model/authorization/authorizationRequest";
import { AxiosResponse } from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authApiClient } from "../../api/authApiClient";
import { useCookies } from "../../persistence/cookieService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { faPen, faPenNib, faUser } from "@fortawesome/free-solid-svg-icons";

const LoginComponent: React.FC = ()=>{
    
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const [callback, setCallback] = useState<string>();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const attemptAuthorization = ()=>{
        authApiClient.authorize(new AuthorizationRequest(email, password))
            .then((response: AxiosResponse<string>)=>{
                useCookies.setToken(response.data);
                navigate(callback);
            })
            .catch(()=>{
                console.log("TODO:Log the error");
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

    useEffect(()=>{
        checkExistingToken();
        setCallback(searchParams.get("callback"));
    }, [])

    
    return (
        <div>
            <h1>Login</h1>

            <FontAwesomeIcon icon={faUser} />
           
            <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={attemptAuthorization}>Login</button>
        </div>
    );
}

export default LoginComponent;