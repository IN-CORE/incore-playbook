import { SET_MENU_STATE } from "../actions/layout";

const defaultState = {isMenuOpen: false};

const layout = (state=defaultState, action) => {
	switch(action.type) {
	case SET_MENU_STATE:
		return Object.assign({}, state, {isMenuOpen: action.isMenuOpen});
	default:
		return state;
	}
};

export default layout;
