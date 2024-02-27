import users from "./user";
import attributes from "./attributes";
import layout from "./layout";
import { executions } from "./datawolf";
import hazards from "./hazards";
import datasets from "./dataset";
import config from "./config";
import stepsReducer from "./stepsReducer";
import mapReducer from "./map"

const rootReducer = {
	user: users,
	attribute: attributes,
	layout: layout,
	execution: executions,
	hazard: hazards,
	dataset: datasets,
	config: config,
	steps: stepsReducer,
	maps: mapReducer
};

export default rootReducer;
