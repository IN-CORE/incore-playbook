import React, { useEffect, useState } from "react";
import "../../../styles/step-status.css";
import { processStatus } from "../../../globals";
import { useDispatch, useSelector } from "react-redux";
import { getStep, updateStep } from "../../../actions/steps";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { IncoreSelectBox } from "../../styledComponents/IncoreSelect";
import {IncoreFootNote} from "../../styledComponents/IncoreFootNote";
import { parseDateTime } from "../../../utils/common";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";

const StepStatusDropdown =  ({ step, substep }) => {
	const dispatch = useDispatch();
	const stepData = useSelector((state) => state.steps[`step_${step}_${substep}`]);
	const [activeKey, setActiveKey] = useState(stepData.status !== undefined ? stepData.status : "pending");

	const globalConfig = useSelector((state) => state.config.globalConfig);

	useEffect(() => {
		getStep(globalConfig, step, substep)(dispatch);
	}, []);

	useEffect(() => {
		if (stepData.status !== undefined) {
			setActiveKey(stepData.status);
		}
	}, [stepData]);

	useEffect(() => {
		if (activeKey !== stepData.status && stepData.status !== undefined) {
			updateStep(globalConfig, step, substep, activeKey)(dispatch);
		}
	}, [activeKey]);

	const options = [
		{ value: "pending", label: "Pending" },
		{ value: "in_progress", label: "In Progress" },
		{ value: "complete", label: "Complete" },
	];

	const handleOptionChange = (event) => {
		setActiveKey(event.target.value);
	};

	return(
		<>
			<FormControl>
				<IncoreFootNote id="dropdown-label">Select Progress Status of Current Task</IncoreFootNote>
				<IncoreSelectBox
					labelId="dropdown-label"
					id="dropdown"
					value={activeKey}
					onChange={handleOptionChange}
				>
					{options.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</IncoreSelectBox>
			</FormControl>
			{
				stepData["status"] && stepData["status_user"] ?
					<IncoreFootNote>Last updated by {stepData["status_user"]["firstName"]}&nbsp;
						{stepData["status_user"]["lastName"]} at {parseDateTime(stepData["status_updated_at"]) ?? "unavailable timestamp"}</IncoreFootNote>
					:
					null
			}
		</>
	);
};

export default StepStatusDropdown;
