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
	const listSteps = (stepId, substepId) => dispatch(getStepAction(stepId, substepId));
	const patchStep= (stepId, substepId, status, docUri) => dispatch(updateStepAction(stepId, substepId, status, docUri));
	const stepData = useSelector((state) => state.steps[`step_${step}_${substep}`]);

	const [edit, setEdit] = useState(false);
	const [docUri, setDocUri] = useState();

	useEffect(() => {
		listSteps(step, substep);
	}, []);


	const handleDocUriOnSave = () => {
		patchStep(step, substep, null, docUri);
		setEdit(false);
	};

	return (
		<Box className="inputGroup" style={{ height: "auto" }}>
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
								defaultValue={stepData["doc_uri"]}
							/>
						</Box>
						<Box style={{marginTop:"0.5em"}}>
							<IncoreButtonInline variant="contained" color="default" onClick={handleDocUriOnSave}>
								Save
							</IncoreButtonInline>
							<Button variant="outlined" color="default" style={{height:"41px",marginLeft:"0.5em"}}
								onClick={()=> {setEdit(false);}}>Cancel</Button>
						</Box>
					</Box>
					:
					<Box>
						{
							stepData["doc_uri"] && stepData["doc_user"]?
								<Box>
									<IncoreLink href={stepData["doc_uri"]} target="_blank">{stepData["doc_uri"]}</IncoreLink>
									<IncoreFootNote>Link last edited by {stepData["doc_user"]["firstName"]}&nbsp;
										{stepData["doc_user"]["lastName"]} at {parseDateTime(stepData["doc_updated_at"]) ?? "unavailable timestamp"}</IncoreFootNote>
								</Box>
								:
								<Box>
									<Typography>No document link available yet.</Typography>
								</Box>
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
