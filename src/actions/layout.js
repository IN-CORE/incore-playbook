export const SET_MENU_STATE = "SET_MENU_STATE";

export const setMenuState = isMenuOpen => {
	return {
		type: SET_MENU_STATE,
		isMenuOpen: isMenuOpen
	};
};
