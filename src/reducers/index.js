import { combineReducers } from "redux";
import userList from "./userList";
import attributes from "./attributes";
import layout from "./layout";
import tornadoes from "./tornadoes";
import datasets from "./dataset";

const rootReducer = combineReducers({
	userList: userList,
	attribute: attributes,
	layout: layout,
	tornado: tornadoes,
	dataset:datasets
});

export default rootReducer;
