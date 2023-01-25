import React, { useEffect, useState } from "react";
import "../../../styles/step-status.css";
import { processStatus } from "../../../globals";
import { useDispatch, useSelector } from "react-redux";
import { getStep, updateStep } from "../../../actions/steps";
import { Box } from "@material-ui/core";
import { parseDateTime } from "../../../utils/common";
import { IncoreFootNote } from "../../styledComponents/IncoreFootNote";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";

const StepStatus = ({ step, substep }) => {
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

	return (
		<Box>
			<div className={"statusBox"}>
				{processStatus.map((status, index) => (
					<div key={index} className={`statusInfo ${activeKey === status.key ? "active" : ""}`}>
						<Box
							style={{ cursor: "pointer" }}
							onClick={() => {
								setActiveKey(status.key);
							}}
							display="flex"
						>
							{
								status.key === "complete" ?
									<Box>
										{completedCheckIcon}
									</Box>
									:
									null
							}
							{
								status.key === "in_progress" ?
									<Box>{inProgressCheckIcon}</Box> : null
							}
							{
								status.key === "pending" ? <Box>{pendingIcon}</Box> : null
							}
							<Box>
								{status.name}
							</Box>
						</Box>
					</div>
				))}
			</div>
			{
				stepData["status"] && stepData["status_user"] ?
					<IncoreFootNote>Last updated by {stepData["status_user"]["firstName"]}&nbsp;
						{stepData["status_user"]["lastName"]} at {parseDateTime(stepData["status_updated_at"]) ?? "unavailable timestamp"}</IncoreFootNote>
					:
					null
			}
		</Box>
	);
};

export default StepStatus;
