import React, { useEffect, useRef, useState } from "react";

import { Box, Dialog, DialogActions, DialogContent, Grid, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { IncoreMenuItem, IncoreSelectBox } from "../../styledComponents/IncoreSelect";
import { getOutputFileContent, getOutputFileContentJSON } from "../../../utils/datawolf";
import { useSelector } from "react-redux";
import { exportJson } from "../../../utils/common";
import { IncoreButtonText } from "../../styledComponents/IncoreButtonText";
import GetAppIcon from "@material-ui/icons/GetApp";
import { downloadImg } from "../../../utils/image";


export default function Log(props) {
	let { executionItem, previewOn, handlePreviewClose, datawolfDatasetConfigItems } = props;

	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);

	const [selectedExecutionName, setSelectedExecutionName] = useState("");
	const [logContent, setLogContent] = useState({});
	const [t, setT] = useState("1");

	const printRef = useRef();

	useEffect(() => {
		setSelectedExecutionName(executionItem["title"]);
		datawolfDatasetConfigItems.map(async (datawolfDatasetConfigItem) => {
			const vName = datawolfDatasetConfigItem.datasets.variableName;
			if (vName.includes("Log")) {
				setLogContent(async (prevState) => {
					return {
						...prevState,
						[datawolfDatasetConfigItem.datasets.title]: await getOutputFileContent(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId)
					};
				});
			}
		});
	}, []);

	// const download = async () => {
	// 	if (HHSBarChartContent) {
	// 		exportJson(HHSBarChartContent, `hhs-${executionItem.id}`);
	// 	}
	// };

	return (
		<Dialog open={previewOn} onClose={handlePreviewClose} maxWidth="lg" fullWidth scroll="paper">
			<DialogContent className="previewModal" ref={printRef}>
				<IconButton aria-label="Close" onClick={handlePreviewClose} style={{ float: "right" }}>
					<CloseIcon fontSize="small" />
				</IconButton>

				{/*title*/}
				{/*TODO wrap into a component*/}
				<Box className="previewTitleSection">
					<Typography className="previewTitle">{selectedExecutionName}</Typography>
					<Typography className="previewTitle">Execution Logs</Typography>
				</Box>

				{/*logs*/}
				<Box>
					{
						Object.keys(logContent).map((entryKey)=>{
							return (<>
								<p>{entryKey}</p>
								<p>{logContent[entryKey]}</p>
							</>);
						})
					}
				</Box>
			</DialogContent>
			<DialogActions>
				{/*<IncoreButtonText onClick={download} startIcon={<GetAppIcon />}>*/}
				{/*	Download Report*/}
				{/*</IncoreButtonText>*/}
				<IncoreButtonText onClick={handlePreviewClose} startIcon={<CloseIcon />}>
					Close
				</IncoreButtonText>
			</DialogActions>
		</Dialog>
	);
}
