import useViewModel from "./useViewModel";
import Header from "../../components/header";
import { Outlet } from "react-router-dom";
import Notification from "../notification";
import "./style.css";

const Application = () => {
    const viewModel = useViewModel();

    return (
        <viewModel.userContextProvider value={viewModel.user}>
            <Notification />
            <Header />
            <div id="application-component" className="application-component">
                <Outlet />
            </div>
        </viewModel.userContextProvider>
    );
};

export default Application;
