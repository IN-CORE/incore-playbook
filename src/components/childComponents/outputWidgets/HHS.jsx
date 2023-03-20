import React, { useEffect, useRef, useState } from "react";

import { Box, Container, Dialog, DialogActions, DialogContent, Grid, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import HHSBarChart from "../graph/HHSBarChart";
import { downloadOutputFile, getOutputFileContentJSON } from "../../../utils/datawolf";
import { useSelector } from "react-redux";
import { IncoreButtonText } from "../../styledComponents/IncoreButtonText";
import GetAppIcon from "@material-ui/icons/GetApp";
import HhsDescription from "../step/HhsDescription";
import { downloadImg } from "../../../utils/image";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import HhsSlider from "../form/HhsSlider";
import { IncoreTitle } from "../../styledComponents/IncoreTitle";
import { IncoreInputLabel } from "../../styledComponents/IncoreInputLabel";

export default function HHS(props) {
	let { executionItem, previewOn, handlePreviewClose, datawolfDatasetConfigItems, setDownloadDialogOpen } = props;

	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);

	const [selectedExecutionName, setSelectedExecutionName] = useState("");
	const [marks, setMarks] = useState([
		{
			value: 1,
			label: "0",
		},
		{
			value: 7,
			label: "6",
		},
		{
			value: 13,
			label: "12",
		},
		{
			value: 25,
			label: "24",
		},
		{
			value: 49,
			label: "48",
		},
	]);

	const [HHSBarChartContent, setHHSBarChartContent] = useState({ 1: [], 7: [], 13: [], 25: [], 49: [] });
	const [HhsDownload, setHhsDownload] = useState();
	const [t, setT] = useState("1");

	const printRef = useRef();

	useEffect(() => {
		setSelectedExecutionName(executionItem["title"]);
		datawolfDatasetConfigItems.map(async (datawolfDatasetConfigItem) => {
			const vName = datawolfDatasetConfigItem.datasets.variableName;
			if (vName === "HHSBarChartContent") {
				setHHSBarChartContent(
					await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId)
				);
			} else if (vName === "HhsDownload") {
				setHhsDownload(executionItem["datasets"][datawolfDatasetConfigItem.datasetId]);
			}
		});
	}, []);

	const download = async () => {
		setDownloadDialogOpen(true);
		if (HhsDownload) {
			await downloadOutputFile(datawolfConfig, HhsDownload, null, `hhs-${executionItem.id}.csv`);
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
					<Typography className="previewTitle">
						Select Data: Housing Recovery Stage Across Households
					</Typography>
				</Box>

				<Box style={{ padding: "5px 25px 25px 25px" }}>
					<Grid container spacing={3} justify="center">
						<Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
							<Box style={{ maxWidth: "700px" }}>
								{/*Sliders*/}
								<Container style={{width: "80%", margin: 0}}>
									<IncoreInputLabel id="discrete-slider-restrict" gutterBottom>
										Months after the disaster
									</IncoreInputLabel>
									<HhsSlider marks={marks}
											   value={t}
											   handleChange={(e, newValue) => {setT(newValue);}}/>
								</Container>
								{HHSBarChartContent ? (
									<HHSBarChart
										data={HHSBarChartContent[t]}
										height={"25em"}
										xAxisLegend="Housing Recovery Stage"
										yAxisLegend="Frequency"
									/>
								) : null}
							</Box>
						</Grid>
						{/*description*/}
						<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
							<HhsDescription />
						</Grid>
					</Grid>
				</Box>
			</DialogContent>
			<DialogActions>
				<IncoreButtonText
					onClick={() => {
						downloadImg(printRef.current, "HHS");
					}}
					startIcon={<CameraAltIcon />}
				>
					Image
				</IncoreButtonText>
				<IncoreButtonText onClick={download} startIcon={<GetAppIcon />}>
					Download
				</IncoreButtonText>
				<IncoreButtonText onClick={handlePreviewClose} startIcon={<CloseIcon />}>
					Close
				</IncoreButtonText>
			</DialogActions>
		</Dialog>
	);
}
