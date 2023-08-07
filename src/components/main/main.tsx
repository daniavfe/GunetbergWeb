import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import PostListComponent from "../post/list/post-list";
import DetailPostComponent from "../post/detail/detail";
import LoginComponent from "../login/login";



import './main.scss'
import GuardedRouteComponent from "./guarded-route/guarded-route";
import EditorComponent from "../admin/editor/editor";
import AdminComponent from "../admin/admin";
import { apiClient } from "../../api/apiClient";
import { useCookies } from "../../persistence/cookieService";
import { AxiosError, AxiosResponse } from "axios";

const HttpInterceptorSetup = ()=>{
    const axiosApiClient = apiClient;

    const navigate = useNavigate();
    const location = useLocation()

    axiosApiClient.interceptors.request.use(
        function (config) {
            const token = useCookies.getToken();
            if(token){
                config.headers.Authorization = `Bearer ${token}`
            }
          return config;
        },
        function (error) {
          // Do something with request error
          return Promise.reject(error);
        }
      );
     
      axiosApiClient.interceptors.response.use(
        (response: AxiosResponse)=> {
            return response;
        },
        (error: AxiosError) => {
            if(error.response.status == 401){
                const callback = `${location.pathname}${location.search ?? ""}`
                navigate(`/login?callback=${callback}`);
            }
            return Promise.reject(error);
        }
    );

    return <></>;
}


const Main: React.FC = ()=>{

    return (
        <>
            <HttpInterceptorSetup/>
            <Routes>
                <Route path='/admin' element={<GuardedRouteComponent component={<AdminComponent/>}></GuardedRouteComponent>}/>
                <Route path='/admin/editor/:id?' element={<GuardedRouteComponent component={<EditorComponent/>}></GuardedRouteComponent>}/>
                <Route path="/login" element={<LoginComponent />}/>
                <Route path="/" element={<PostListComponent/>}/>
                <Route path="/posts/:id" element={<DetailPostComponent/>}/>
            </Routes>
        </>
    );
}

export default Main;