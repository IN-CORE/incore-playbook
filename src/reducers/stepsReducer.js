const defaultState = {
	step_1_1: {},
	step_1_2: {},
	step_1_3: {},
	step_1_4: {},
	step_2_1: {},
	step_2_2: {},
	step_2_3: {},
	step_2_4: {},
	step_2_5: {},
	step_3_1: {},
	step_3_2: {},
	step_3_3: {},
	step_3_4: {},
	step_3_5: {},
	step_4_1: {},
	step_4_2: {},
	step_4_3: {},
	step_5_1: {},
	step_5_2: {},
	step_5_3: {},
	step_6_1: {},
	step_6_2: {},
	step_6_3: {},
};

const stepsReducer = (state = defaultState, action) => {
	switch (action.type) {
		case "UPDATE_STEP":
			return {
				...state,
				[action.step_id]: action.step,
			};
		case "UPDATE_ALL_STEPS":
			return {
				...state,
				...action.steps,
			};
		case "LOGIN_ERROR":
			return {
				...state,
			};
		default:
			return state;
	}
};

export default stepsReducer;
