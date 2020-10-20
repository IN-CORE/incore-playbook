import { combineReducers } from "redux";
import attributes from "./attributes";
import layout from "./layout";


const rootReducer = combineReducers({
	attribute: attributes,
	layout: layout
});

export default rootReducer;
