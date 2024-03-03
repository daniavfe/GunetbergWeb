import useViewModel from "./useViewModel";
import Header from "../../components/header";
import { Outlet } from "react-router-dom";
import Notification from "../notification";
import "./style.css";

const Application = () => {
    const viewModel = useViewModel();

    return (
        <>
            <Notification />
            <Header user={viewModel.user}/>
            <div id="application-component" className="application-component">
                <Outlet />
            </div>
        </>
    );
};

export default Application;
