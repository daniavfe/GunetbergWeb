import {ReactElement, useEffect, useState } from "react";
import AuthApiClient from "../../../api/authApiClient";
import { AxiosResponse } from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";


interface GuardedRouteProps{
    authApiClient: AuthApiClient;
    component: ReactElement
}

const GuardedRouteComponent: React.FC<GuardedRouteProps> = ({component, authApiClient})=>{
    
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(null); 

    useEffect(()=>{
        authApiClient.validateToken()
            .then((response: AxiosResponse)=>{
                setIsAuthenticated(true)
            })
            .catch(()=>{
                setIsAuthenticated(false)
                navigate("/");
            });
    }, []);
    
    return (
        <div>
        {
            (!!isAuthenticated) ?
            <React.Fragment>{component}</React.Fragment> : <div></div>
        }
        </div>
    );
};

export default GuardedRouteComponent;
