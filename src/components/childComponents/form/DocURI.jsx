import React, { useEffect, useState } from "react";
import { IncoreTitle } from "../../styledComponents/IncoreTitle";
import { IncoreFootNote } from "../../styledComponents/IncoreFootNote";
import { IncoreLink } from "../../styledComponents/IncoreLink";
import { IncoreButtonInline } from "../../styledComponents/IncoreButtonInline";
import { Box, Button, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { parseDateTime } from "../../../utils/common";
import { getStep as getStepAction, updateStep as updateStepAction } from "../../../actions/steps";
import { IncoreTextArea } from "../../styledComponents/IncoreTextArea";

export const DocURI = (props) => {

	const {step, substep} = props;

	const dispatch = useDispatch();

	const globalConfig = useSelector((state) => state.config.globalConfig);

	const listSteps = (globalConfig, stepId, substepId) => dispatch(getStepAction(globalConfig, stepId, substepId));
	const patchStep = (globalConfig, stepId, substepId, status, docUri) => dispatch(updateStepAction(globalConfig, stepId, substepId, status, docUri));
	const stepData = useSelector((state) => state.steps[`step_${step}_${substep}`]);

	const [edit, setEdit] = useState(false);
	const [docUri, setDocUri] = useState(stepData["doc_uri"]);

	useEffect(() => {
		listSteps(globalConfig, step, substep);
	}, []);

	useEffect(() => {
		setDocUri(stepData["doc_uri"]);
	}, [stepData]);

	const handleDocUriOnSave = () => {
		patchStep(globalConfig, step, substep, null, docUri);
		setEdit(false);
	};

	return (
		<Box className="inputGroup" style={{
			height: "auto",
			background: "#ffffff",
			border: "dashed 1px #00619D",
			borderRadius: "5px",
			padding: "1.5em"
		}}>
			<IncoreTitle>Document Link</IncoreTitle>
			{
				edit ?

					<Box>
						<Box>
							<IncoreTextArea
								multiline
								variant="outlined"
								value={docUri}
								onChange={(e) => {
									setDocUri(e.target.value);
								}}
								defaultValue={docUri}
							/>
						</Box>
						<Box style={{marginTop:"0.5em"}}>
							<IncoreButtonInline variant="contained" color="default" onClick={handleDocUriOnSave}>
								Save
							</IncoreButtonInline>
							<Button variant="outlined" color="default" style={{height:"41px",marginLeft:"0.5em"}}
								onClick={()=> {
									setEdit(false);
									setDocUri(stepData["doc_uri"]);
								}}>Cancel</Button>
						</Box>
					</Box>
					:
					<Box>
						{
							stepData["doc_uri"] && encodeURIComponent(stepData["doc_uri"]) !== "%7F"
							&& stepData["doc_uri"] !== "" ?
								<IncoreLink href={stepData["doc_uri"]} target="_blank">{stepData["doc_uri"]}</IncoreLink>
								:
								<Typography>No document link available yet.</Typography>
						}
						{
							stepData["doc_user"] ?
								<IncoreFootNote>Link last edited by {stepData["doc_user"]["firstName"]}&nbsp;
									{stepData["doc_user"]["lastName"]} at {parseDateTime(stepData["doc_updated_at"]) ?? "unavailable timestamp"}</IncoreFootNote>
								:
								<></>
						}
						<Box>
							<IncoreButtonInline variant="contained" color="default" onClick={()=> {setEdit(true);}}>
								Update
							</IncoreButtonInline>
						</Box>
					</Box>
			}
		</Box>
	);
};
