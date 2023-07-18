import { Route, Routes } from "react-router-dom";
import PostApiClient from "../../api/postApiClient";
import TagApiClient from "../../api/tagApiClient";
import PostListComponent from "../post/list/post-list";
import DetailPostComponent from "../post/detail/detail";
import './main.scss'


const Main: React.FC = ()=>{

    let postApiClient: PostApiClient = new PostApiClient("https://localhost:7029/");
    let tagApiClient: TagApiClient = new TagApiClient("https://localhost:7029/");

    return (
        <>
            <Routes>
                <Route path="/" element={<PostListComponent postApiClient={postApiClient} tagApiClient={tagApiClient}/>}/>
                <Route path="/posts/:id" element={<DetailPostComponent postApiClient={postApiClient}/>}/>
            </Routes>
        </>
    );
}

export default Main;