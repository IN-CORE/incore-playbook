import userList from "./userList";
import attributes from "./attributes";
import layout from "./layout";
import {executions} from "./datawolf";
import hazards from "./hazards";
import datasets from "./dataset";
import config from "./config";
import stepsReducer from "./stepsReducer";

const rootReducer = {
	userList: userList,
	attribute: attributes,
	layout: layout,
	execution: executions,
	hazard: hazards,
	dataset:datasets,
	config: config,
	steps: stepsReducer
};

export default rootReducer;
