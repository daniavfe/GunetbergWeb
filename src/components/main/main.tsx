import React, { useEffect } from "react";
import { OpenAPI, PostService, UserService } from "../../services/openapi";

const Main = ()=>{

    useEffect(
        ()=>{
            OpenAPI.BASE = "http://localhost:5029";
            OpenAPI.
            PostService.postPostsSearch({}).then((res)=>console.log(res));
            
        },
        []
    );

    return (<div>This is main</div>);
}

export default Main;