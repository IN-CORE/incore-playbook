import React, { useEffect, useState } from "react";
import "../../../styles/step-status.css";
import { useDispatch, useSelector } from "react-redux";
import { getStep, updateStep } from "../../../actions/steps";
import { FormControl } from "@material-ui/core";
import { IncoreMenuItem, IncoreSelectBox } from "../../styledComponents/IncoreSelect";
import { IncoreFootNote } from "../../styledComponents/IncoreFootNote";
import { parseDateTime } from "../../../utils/common";
import CheckIcon from "@material-ui/icons/Check";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import HourglassEmptyOutlinedIcon from "@material-ui/icons/HourglassEmptyOutlined";

const StepStatusDropdown = ({ step, substep }) => {
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

	const pendingIcon = <QueryBuilderIcon fontSize="small" />;
	const completedCheckIcon = <CheckIcon fontSize="small" />;
	const inProgressCheckIcon = <HourglassEmptyOutlinedIcon fontSize="small" />;

	const options = [
		{ value: "pending", label: "Pending", icon: pendingIcon },
		{ value: "in_progress", label: "In Progress", icon: inProgressCheckIcon },
		{ value: "complete", label: "Complete", icon: completedCheckIcon }
	];

	const renderOption = (option) => (
		<IncoreMenuItem value={option.value}>
			<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", margin: "auto 1em" }}>
				{option.icon}
				<div style={{ marginLeft: "1em" }}>{option.label}</div>
			</div>
		</IncoreMenuItem>
	);

	const handleOptionChange = (event) => {
		setActiveKey(event.target.value);
	};

	return (
		<FormControl style={{ m: 1, minWidth: 120 }}>
			<IncoreSelectBox labelId="dropdown-label" id="dropdown" value={activeKey} onChange={handleOptionChange}>
				{options.map(renderOption)}
			</IncoreSelectBox>
			{stepData["status"] && stepData["status_user"] ? (
				<IncoreFootNote>
					Last updated by {stepData["status_user"]["firstName"]}&nbsp;
					{stepData["status_user"]["lastName"]} at{" "}
					{parseDateTime(stepData["status_updated_at"]) ?? "unavailable timestamp"}
				</IncoreFootNote>
			) : null}
		</FormControl>
	);
};

export default StepStatusDropdown;
