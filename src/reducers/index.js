import userList from "./userList";
import attributes from "./attributes";
import layout from "./layout";
import {executions} from "./datawolf";
import tornadoes from "./tornadoes";
import datasets from "./dataset";

const rootReducer = {
	userList: userList,
	attribute: attributes,
	layout: layout,
	execution: executions,
	tornado: tornadoes,
	dataset:datasets
};

export default rootReducer;
