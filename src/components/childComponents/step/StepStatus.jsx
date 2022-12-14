import React, {useState, useEffect} from "react";
import "../../../styles/step-status.css";
import { processStatus } from "../../../globals"; 
import {useDispatch, useSelector} from "react-redux";
import { getStep, updateStepStatus } from "../../../actions/steps";

const StepStatus = ({step, substep}) => {
	const dispatch = useDispatch();
	const stepData = useSelector((state) => state.steps[`step_${step}_${substep}`])
	const [activeKey, setActiveKey] = useState(stepData.status !== undefined ? stepData.status: "pending");

	useEffect(() => {
		getStep(step, substep)(dispatch)
	}, [])

	useEffect(() => {
		if (stepData.status !== undefined){
			setActiveKey(stepData.status)
		}
	}, [stepData])

	useEffect(() => {
		if (activeKey !== stepData.status && stepData.status !== undefined){
			updateStepStatus(step, substep, activeKey)(dispatch)
		}
	}, [activeKey])

	return (
		<div>
			<div className={"stepStatus"}>
				Step Status
			</div>
			<div className={"statusBox"}>
				{processStatus.map((status, index) => (
					<div key={index} className={`statusInfo ${ activeKey === status.key ? "active": ""}`} >
						<div style={{paddingTop:2, cursor: "pointer"}} onClick={()=>{setActiveKey(status.key);}}>
							{status.name}</div>
					</div>))}
			</div>
		</div>
	);
}

export default StepStatus;
