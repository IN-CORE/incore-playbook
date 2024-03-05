// Set up your application entry point here...
///* eslint-disable import/default */

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "./routes.js";
import configureStore from "./store/configureStore";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { mapConfig as defaultMapConfig } from "./map.config";
import { assetConfig as defaultAssetConfig } from "./asset.config";
import {
	datawolfConfig as defaultDatawolfConfig,
	datawolfWorkflowConfig as defaultDatawolfWorkflowConfig
} from "./datawolf.config.js";
import { globals as defaultGlobalConfig } from "./globals";
import { cgeInfo as defaultCgeConfig, hhsInfo as defaultHhsConfig } from "./messages.config";

import {
	setAllowedDataTypes,
	setAllowedHazardTypes,
	updateAssetConfig,
	updateCgeInfo,
	updateDatawolfConfig,
	updateDatawolfWorkflowConfig,
	updateGlobalConfig,
	updateHhsInfo,
	updateMapConfig
} from "./actions/config";

require("./public/favicon.ico");

const store = configureStore();
store.dispatch(updateMapConfig(defaultMapConfig));
store.dispatch(updateAssetConfig(defaultAssetConfig));
store.dispatch(updateDatawolfConfig(defaultDatawolfConfig));
store.dispatch(updateDatawolfWorkflowConfig(defaultDatawolfWorkflowConfig));
store.dispatch(updateGlobalConfig(defaultGlobalConfig));
store.dispatch(updateCgeInfo(defaultCgeConfig));
store.dispatch(updateHhsInfo(defaultHhsConfig));
store.dispatch(
	setAllowedDataTypes({
		building: true,
		retrofitStrategies: true,
		epf: true,
		network: true,
		socioeconomics: true
	})
);
store.dispatch(setAllowedHazardTypes(["earthquake", "tornado", "tsunami", "hurricane", "flood"]));

const theme = createMuiTheme({
	typography: {
		fontFamily: "Rubik, Arial, sans-serif" // It"s good practice to provide fallback fonts
	},
	palette: {
		primary: {
			main: "#00619D" // Example primary color
		},
		secondary: {
			main: "#00619D" // Example secondary color
		}
	}
});

render(
	<MuiThemeProvider theme={theme}>
		<Provider store={store}>
			{/*<BrowserRouter basename={config.baseUrlRoute}>*/}
			<BrowserRouter>
				<Switch>
					{Object.keys(routes).map((key) => {
						let path = key;
						let exact = routes[key]["exact"];
						let component = routes[key]["component"];

						return <Route path={path} exact={exact} component={component} key={path} />;
					})}
				</Switch>
			</BrowserRouter>
		</Provider>
	</MuiThemeProvider>,
	document.getElementById("app")
);
