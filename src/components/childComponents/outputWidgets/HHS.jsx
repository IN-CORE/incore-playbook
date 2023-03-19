import React, { useEffect, useRef, useState } from "react";

import { Box, Dialog, DialogActions, DialogContent, Grid, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import HHSBarChart from "../graph/HHSBarChart";
import { IncoreMenuItem, IncoreSelectBox } from "../../styledComponents/IncoreSelect";
import { downloadOutputFile, getOutputFileContentJSON } from "../../../utils/datawolf";
import { useSelector } from "react-redux";
import { IncoreButtonText } from "../../styledComponents/IncoreButtonText";
import GetAppIcon from "@material-ui/icons/GetApp";
import HhsDescription from "../step/HhsDescription";
import { downloadImg } from "../../../utils/image";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

export default function HHS(props) {
	let { executionItem, previewOn, handlePreviewClose, datawolfDatasetConfigItems, setDownloadDialogOpen } = props;

	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);

	const [selectedExecutionName, setSelectedExecutionName] = useState("");
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
							{/*dropdown*/}
							<IncoreSelectBox
								labelId="label"
								id="select"
								variant="outlined"
								onChange={(e) => {
									setT(e.target.value);
								}}
								value={t}
								style={{ maxWidth: "500px" }}
							>
								<IncoreMenuItem value="1" key="1">
									Immediately after the disaster
								</IncoreMenuItem>
								<IncoreMenuItem value="7" key="7">
									6 month post-disaster
								</IncoreMenuItem>
								<IncoreMenuItem value="13" key="13">
									12 months post-disaster
								</IncoreMenuItem>
								<IncoreMenuItem value="25" key="25">
									24 months post-disaster
								</IncoreMenuItem>
								<IncoreMenuItem value="49" key="49">
									48 months post-disaster
								</IncoreMenuItem>
							</IncoreSelectBox>

							{/*table and barchart*/}
							<Box style={{ margin: "50px 0", maxWidth: "700px" }}>
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
