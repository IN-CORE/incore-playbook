import { combineReducers } from "redux";
import attributes from "./attributes";


const rootReducer = combineReducers({
	attribute: attributes,
});

export default rootReducer;
