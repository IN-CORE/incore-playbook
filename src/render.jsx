import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {BrowserRouter} from "react-router-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import config from "./app.config";
import routes from "./routes";

const theme = createMuiTheme({

	typography: {
		fontFamily: "Rubik"
	},
	palette:{
		fontFamily: "Rubik"
	}

});

const render = (reducers = rootReducer, routes = routes, storeCallback, theme=theme,) => {
	const composeEnhancers = (
		(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
	);
	const store = createStore(
		combineReducers(reducers),
		composeEnhancers(applyMiddleware(
			thunk
		))
	);

	if (storeCallback) {
		storeCallback(store);
	}

	ReactDOM.render(
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<BrowserRouter basename={config.baseUrlRoute || "/"}>
					{routes}
				</BrowserRouter>
			</Provider>
		</MuiThemeProvider>,
		document.getElementById("app")
	);

};

export default render;
