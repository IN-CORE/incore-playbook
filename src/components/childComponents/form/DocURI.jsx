import React, { useState } from "react";
import { IncoreInputLabel } from "../../styledComponents/IncoreInputLabel";
import { IncoreTextField } from "../../styledComponents/IncoreInput";
import { Box, Button, Link, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { parseDateTime } from "../../../utils/common";

export const DocURI = (props) => {

	const {step, substep} = props;
	const dispatch = useDispatch();
	const stepData = useSelector((state) => state.steps[`step_${step}_${substep}`]);

	const [edit, setEdit] = useState(false);
	const [docUri, setDocUri] = useState("");


	return (
		<Box className="inputGroup" style={{ height: "auto" }}>
			<IncoreInputLabel>Document Link</IncoreInputLabel>
			{
				edit ?

					<>
						<IncoreTextField
							variant="outlined"
							value={docUri}
							onChange={(e) => {
								setDocUri(e.target.value);
							}}
						/>
						<Button variant="contained" color="primary">Save</Button>
						<Button variant="outlined" onClick={()=> {setEdit(false);}}>Cancel</Button>
					</>
					:
					<>
						{
							stepData["doc_uri"] && stepData["doc_user"]?
								<>
									<Link href="#">{stepData["doc_uri"]}</Link>
									<Typography>Link last updated by {stepData["doc_user"]["firstName"]} {stepData["doc_user"]["lastName"]}
									at {parseDateTime(stepData["status_updated_at"]) ?? "unavailable timestamp"}</Typography>
								</>
								:
								<Typography>No document link available yet.</Typography>
						}
						<Button variant="contained"
							color="primary"
							onClick={()=> {setEdit(true);}}>
							Update
						</Button>
					</>
			}
		</Box>
	);
};
