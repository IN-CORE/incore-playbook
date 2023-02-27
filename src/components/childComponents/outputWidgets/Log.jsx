import React, { useEffect, useRef, useState } from "react";

import { Box, Dialog, DialogActions, DialogContent, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { getOutputFileContent } from "../../../utils/datawolf";
import { useSelector } from "react-redux";
import { exportJson } from "../../../utils/common";
import { IncoreButtonText } from "../../styledComponents/IncoreButtonText";
import GetAppIcon from "@material-ui/icons/GetApp";
import { IncoreTitle } from "../../styledComponents/IncoreTitle";


export default function Log(props) {
	let { executionItem, previewOn, handlePreviewClose, datawolfDatasetConfigItems } = props;

	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);

	const [selectedExecutionName, setSelectedExecutionName] = useState("");
	const [logContent, setLogContent] = useState({});

	const printRef = useRef();

	useEffect(() => {
		setSelectedExecutionName(executionItem["title"]);
		datawolfDatasetConfigItems.map(async (datawolfDatasetConfigItem) => {
			const vName = datawolfDatasetConfigItem.datasets.variableName;
			if (vName.includes("Log")) {
				const temp = await getOutputFileContent(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId);
				setLogContent((prevState) => {
					return {
						...prevState,
						[datawolfDatasetConfigItem.datasets.title]: temp
					};
				});
			}
		});
	}, []);

	const download = async () => {
		if (Object.keys(logContent).length > 0) {
			exportJson(logContent, `logs-${executionItem.id}`);
		}
	};

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
					<Typography className="previewTitle">Selected Data: Logs</Typography>
				</Box>

				{/*logs*/}
				{
					Object.keys(logContent).map((entryKey) => {
						return (
							<Box style={{ margin: "2em auto" }}>
								<IncoreTitle>{entryKey}</IncoreTitle>
								<Box style={{
									padding: "2em",
									backgroundColor: "#EAEAEA",
									fontFamily: "Monospace",
									maxHeight:"500px",
									overflow:"scroll"
								}}>
									<dl>{logContent[entryKey] === "" ? "No logs available..." : logContent[entryKey]}</dl>
								</Box>
							</Box>);
					})
				}
			</DialogContent>
			<DialogActions>
				<IncoreButtonText onClick={download} startIcon={<GetAppIcon />}>
					Download Report
				</IncoreButtonText>
				<IncoreButtonText onClick={handlePreviewClose} startIcon={<CloseIcon />}>
					Close
				</IncoreButtonText>
			</DialogActions>
		</Dialog>
	);
}
