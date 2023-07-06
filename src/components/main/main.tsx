import { Route, Routes } from "react-router-dom";
import PostApiClient from "../../api/postApiClient";
import PostListComponent from "../post/list/post-list";
import DetailPostComponent from "../post/detail/detail";
import './main.scss'

const Main: React.FC = ()=>{

    let client: PostApiClient = new PostApiClient("https://localhost:7029/");

    return (
        <>
            <Routes>
                <Route path="/" element={<PostListComponent postApiClient={client}/>}/>
                <Route path="/posts/:id" element={<DetailPostComponent postApiClient={client}/>}/>
            </Routes>
        </>
    );
}

export default Main;