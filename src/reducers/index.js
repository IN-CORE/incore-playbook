import { combineReducers } from "redux";
import userList from "./userList";
import attributes from "./attributes";
import layout from "./layout";

const rootReducer = combineReducers({
	userList: userList,
	attribute: attributes,
	layout: layout
});

export default rootReducer;
