import ReactDOM from "react-dom/client";
import Application from "./features/application";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PostListPage from "./features/postListPage";
import PostPage from "./features/postPage";
import Login from "./features/login";
import SignUp from "./features/signup";
import "./style.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Application />,
        children: [
            {
                path: "/",
                element: <PostListPage />,
            },
            {
                path: "/post/:title",
                element: <PostPage />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
]);

root.render(<RouterProvider router={router} />);
