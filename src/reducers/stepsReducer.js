const defaultState = {
    // steps: {
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
    // }
}

const step_strings = [
        "step_1_1",
        "step_1_2",
        "step_1_3",
        "step_1_4",
        "step_2_1",
        "step_2_2",
        "step_2_3",
        "step_2_4",
        "step_2_5",
        "step_3_1",
        "step_3_2",
        "step_3_3",
        "step_3_4",
        "step_3_5",
        "step_4_1",
        "step_4_2",
        "step_4_3",
        "step_5_1",
        "step_5_2",
        "step_5_3",
        "step_6_1",
        "step_6_2",
        "step_6_3"
]

const stepsReducer = (state=defaultState, action) => {
    switch (action.type) {
        case "UPDATE_STEP":
            switch (action.step_id) {
                case "step_1_1":
                    return {
                    ...state,
                    step_1_1: action.step
                }
                case "step_1_2":
                    return {
                    ...state,
                    step_1_2: action.step
                }
                case "step_1_3":
                    return {
                    ...state,
                    step_1_3: action.step
                }
                case "step_1_4":
                    return {
                    ...state,
                    step_1_4: action.step
                }
                case "step_2_1":
                    return {
                    ...state,
                    step_2_1: action.step
                }
                case "step_2_2":
                    return {
                    ...state,
                    step_2_2: action.step
                }
                case "step_2_3":
                    return {
                    ...state,
                    step_2_3: action.step
                }
                case "step_2_4":
                    return {
                    ...state,
                    step_2_4: action.step
                }
                case "step_2_5":
                    return {
                    ...state,
                    step_2_5: action.step
                }
                case "step_3_1":
                    return {
                    ...state,
                    step_3_1: action.step
                }
                case "step_3_2":
                    return {
                    ...state,
                    step_3_2: action.step
                }
                case "step_3_3":
                    return {
                    ...state,
                    step_3_3: action.step
                }
                case "step_3_4":
                    return {
                    ...state,
                    step_3_4: action.step
                }
                case "step_3_5":
                    return {
                    ...state,
                    step_3_5: action.step
                }
                case "step_4_1":
                    return {
                    ...state,
                    step_4_1: action.step
                }
                case "step_4_2":
                    return {
                    ...state,
                    step_4_2: action.step
                }
                case "step_4_3":
                    return {
                    ...state,
                    step_4_3: action.step
                }
                case "step_5_1":
                    return {
                    ...state,
                    step_5_1: action.step
                }
                case "step_5_2":
                    return {
                    ...state,
                    step_5_2: action.step
                }
                case "step_5_3":
                    return {
                    ...state,
                    step_5_3: action.step
                }
                case "step_6_1":
                    return {
                    ...state,
                    step_6_1: action.step
                }
                case "step_6_2":
                    return {
                    ...state,
                    step_6_2: action.step
                }
                case "step_6_3":
                    return {
                    ...state,
                    step_6_3: action.step
                }
            }
        case "LOGIN_ERROR":
            return {
                ...state
            }
        default:
            return state;
    }
}

export default stepsReducer;