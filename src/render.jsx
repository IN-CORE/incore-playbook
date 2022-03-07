import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import baseReducer from "./reducers";
import baseRoutes from "./routes";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import config from "./app.config";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

const baseTheme = createMuiTheme({
	typography: {
		fontFamily: "Rubik"
	},
	palette:{
		fontFamily: "Rubik"
	}
});

const render = (reducers=baseReducer, routes = baseRoutes, theme=baseTheme, storeCallback) => {
	// create stores
	const middlewares = [
		// Add other middleware on this line...

		// Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
		reduxImmutableStateInvariant(),

		// thunk middleware can also accept an extra argument to be passed to each thunk action
		// https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
		thunk,
	];

	// adds support for Redux dev tools
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	// combine old reducer with new ones
	const store = createStore(combineReducers(reducers), composeEnhancers(
		applyMiddleware(...middlewares)
	));

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept("./reducers", () => {
			const nextReducer = require("./reducers").default; // eslint-disable-line global-require
			store.replaceReducer(nextReducer);
		});
	}

	if (storeCallback) {
		storeCallback(store);
	}

	ReactDOM.render(
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<BrowserRouter basename={config.baseUrlRoute || "/"}>
					<Switch>
						{
							Object.keys(routes).map((key, ) => {
								let path = key;
								let exact = routes[key]["exact"];
								let component = routes[key]["component"];

								return (
									<Route path={path} exact={exact} component={component} key={path}/>
								);
							})
						}
					</Switch>
				</BrowserRouter>
			</Provider>
		</MuiThemeProvider>,
		document.getElementById("app")
	);

};

export default render;
