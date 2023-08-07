import {ReactElement, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { authApiClient } from "../../../api/authApiClient";


interface GuardedRouteProps{
    component: ReactElement
}

const GuardedRouteComponent: React.FC<GuardedRouteProps> = ({component})=>{
    
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(null); 

    useEffect(()=>{
        authApiClient.validateToken()
            .then((response: AxiosResponse)=>{
                setIsAuthenticated(true)
            })
            .catch(()=>{
                console.log("wrong validation");
                setIsAuthenticated(false)
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
