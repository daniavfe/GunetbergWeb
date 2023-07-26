import { Route, Routes } from "react-router-dom";
import PostApiClient from "../../api/postApiClient";
import TagApiClient from "../../api/tagApiClient";
import PostListComponent from "../post/list/post-list";
import DetailPostComponent from "../post/detail/detail";
import LoginComponent from "../login/login";
import AuthApiClient from "../../api/authApiClient";

import './main.scss'
import CookieService from "../../persistence/cookieService";


const Main: React.FC = ()=>{

    const cookieService: CookieService = new CookieService();
    const authApiClient: AuthApiClient = new AuthApiClient("https://localhost:7029/", cookieService);
    const postApiClient: PostApiClient = new PostApiClient("https://localhost:7029/", cookieService);
    const tagApiClient: TagApiClient = new TagApiClient("https://localhost:7029/", cookieService);

    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginComponent authApiClient={authApiClient} cookieService={cookieService}/>}/>
                <Route path="/" element={<PostListComponent postApiClient={postApiClient} tagApiClient={tagApiClient}/>}/>
                <Route path="/posts/:id" element={<DetailPostComponent postApiClient={postApiClient}/>}/>
            </Routes>
        </>
    );
}

export default Main;