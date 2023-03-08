import React, { useEffect, useState } from "react";
import "../../../styles/step-status.css";
import { processStatus } from "../../../globals";
import { useDispatch, useSelector } from "react-redux";
import { getStep, updateStep } from "../../../actions/steps";
import { Box, FormControl, InputLabel, Select, MenuItem, ListItemIcon } from "@material-ui/core";
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

	const completedCheckIcon = <CheckCircleIcon style={{ color: "#00619D", height: "16px", width: "16px" }} />;
	const inProgressCheckIcon = <CheckCircleIcon style={{ color: "#8798AD", height: "16px", width: "16px" }} />;
	const pendingIcon = <QueryBuilderIcon style={{ height: "16px", width: "16px" }} />;

	const options = [
		{ value: "pending", label: "Pending", icon: pendingIcon},
		{ value: "in_progress", label: "In Progress", icon: inProgressCheckIcon },
		{ value: "complete", label: "Complete", icon: completedCheckIcon },
	];

	const renderOption = (option) => (
		<MenuItem value={option.value}>
			<ListItemIcon>{option.icon}</ListItemIcon>
			{option.label}
		</MenuItem>
	);

	const handleOptionChange = (event) => {
		setActiveKey(event.target.value);
	};

	return(
		<>
			<IncoreSelectBox
				labelId="dropdown-label"
				id="dropdown"
				value={activeKey}
				onChange={handleOptionChange}
			>
				{options.map(renderOption)}
			</IncoreSelectBox>
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
