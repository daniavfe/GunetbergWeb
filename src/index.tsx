import ReactDOM from "react-dom/client";
import React from "react";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/main/main";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<BrowserRouter>
		<Main/>
	</BrowserRouter>
);
