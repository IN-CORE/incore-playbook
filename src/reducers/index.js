import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import attributes from "./attributes";


const rootReducer = combineReducers({
	routing: routerReducer,
	attribute: attributes,
});

export default rootReducer;
