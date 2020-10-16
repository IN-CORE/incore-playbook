// Set up your application entry point here...
///* eslint-disable import/default */

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import routes from "./routes";
import configureStore from "./store/configureStore";

require("./public/favicon.ico");

const store = configureStore();

render(
	<Provider store={store}>
		<BrowserRouter >
			{routes}
		</BrowserRouter>
	</Provider>, document.getElementById("app")
);
