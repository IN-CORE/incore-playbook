// Set up your application entry point here...
///* eslint-disable import/default */

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import routes from "./routes.js";
import configureStore from "./store/configureStore";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import {mapConfig as defaultMapConfig} from "./map.config";
import {setAllowedHazardTypes, updateMapConfig} from "./actions/config";

require("./public/favicon.ico");

const store = configureStore();
store.dispatch(updateMapConfig(defaultMapConfig));
store.dispatch(setAllowedHazardTypes(["earthquakes", "tornadoes"]));

const theme = createMuiTheme({

	typography: {
		fontFamily: "Rubik"
	},
	palette:{
		fontFamily: "Rubik"
	}

});

render(
	<MuiThemeProvider theme={theme}>
		<Provider store={store}>
			{/*<BrowserRouter basename={config.baseUrlRoute}>*/}
			<BrowserRouter>
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

	</MuiThemeProvider>
	, document.getElementById("app")
);
