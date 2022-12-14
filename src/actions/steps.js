import {getHeader} from "../utils/common";
import {globals as defaultGlobalConfig} from "../globals";


export const updateStep = (type, data, step_id) => {
    return (dispatch) => {
        dispatch({
            type: type,
            step: data,
            step_id: step_id
        })
    }
}

export const getAllSteps = () => {
    let endpoint = `${defaultGlobalConfig.maestroServiceBase}steps`

    return async (dispatch) => {
        const response = await fetch(endpoint, {mode: 'cors', headers: getHeader()})
        if (response.status === 200){
            response.json().then(json => {
                let step_status = {}
                for (var i=0; i < json.length; i++) {
                    step_status[`step_${json[i].step_id}_${json[i].substep_id}`] = json[i]
                }
                dispatch({
                    type: "UPDATE_ALL_STEPS",
                    steps: step_status
                })
            })
        } else if (response.status === 401){
            dispatch({
                type: "LOGIN_ERROR"
            })
        } else {
            console.log(response.status, response)
        }
    }
}

export const getStep = (stepId, substepId) => {
    let endpoint = `${defaultGlobalConfig.maestroServiceBase}steps/${stepId}/${substepId}`

    return async (dispatch) => {
        const response = await fetch(endpoint, {mode:'cors', headers: getHeader()});
        if (response.status === 200){
            response.json().then(json => dispatch(updateStep("UPDATE_STEP", json, `step_${stepId}_${substepId}`)))
        } else if (response.status === 401) {
            dispatch({
                type: "LOGIN_ERROR"
            })
        } else {
            console.log(response.status, response)
        }
    }
}

export const updateStepStatus = (stepId, substepId, status) => {
    let endpoint = `${defaultGlobalConfig.maestroServiceBase}steps/${stepId}/${substepId}?status=${status}`

    return async (dispatch) => {
        // TODO: remove this in future after dev server deployment
        // const headers = new Headers({
		// 	"x-auth-userinfo": `{"preferred_username":"rmp6"}`
		// });
        
        const response = await fetch(endpoint, {mode:'cors', method: "PATCH", headers: getHeader()})
        if (response.status === 200) {
            response.json().then(json => {
                dispatch(updateStep("UPDATE_STEP", json, `step_${stepId}_${substepId}`))
            })
        } else if (response.status == 401) {
            dispatch({
                type: "LOGIN_ERROR"
            })
        } else {
            console.log(response.status, response)
        }
    }
}
