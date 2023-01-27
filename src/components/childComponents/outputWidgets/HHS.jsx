import { Box, Dialog, DialogActions, DialogContent, Grid, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import HHSBarChart from "../graph/HHSBarChart";
import CgeDescription from "../step/CgeDescription";
import React, { useEffect, useState } from "react";
import { IncoreMenuItem, IncoreSelectBox } from "../../styledComponents/IncoreSelect";
import { getOutputFileContentJSON } from "../../../utils/datawolf";
import { useSelector } from "react-redux";
import { exportJson } from "../../../utils/common";
import { IncoreButtonText } from "../../styledComponents/IncoreButtonText";
import GetAppIcon from "@material-ui/icons/GetApp";
import HhsDescription from "../step/HhsDescription";

export default function HHS(props) {
	let { executionItem, previewOn, handlePreviewClose, datawolfDatasetConfigItems } = props;

	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);

	const [selectedExecutionName, setSelectedExecutionName] = useState("");
	const [HHSBarChartContent, setHHSBarChartContent] = useState({"1":[], "7":[], "13":[], "25":[], "49":[]});
	const [t, setT] = useState("1");

	useEffect(() => {
		setSelectedExecutionName(executionItem["title"]);
		// datawolfDatasetConfigItems.map(async (datawolfDatasetConfigItem) => {
		// 	const vName = datawolfDatasetConfigItem.datasets.variableName;
		// 	if (vName === "HHSBarChartContent") {
		// 		setHHSBarChartContent(
		// 			await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId)
		// 		);
		// 	}
		// });
		// TODO remove hardcoding
		setHHSBarChartContent({
			"1": [
				7000,
				180,
				174,
				25147,
				0
			],
			"7": [
				1843,
				2419,
				1323,
				26916,
				0
			],
			"13": [
				1654,
				2157,
				875,
				27812,
				3
			],
			"25": [
				1489,
				1698,
				600,
				28616,
				98
			],
			"49": [
				1138,
				1175,
				333,
				29404,
				451
			]
		});
	}, []);

	const download = async () => {
		if (HHSBarChartContent) {
			exportJson(HHSBarChartContent, `hhs-${executionItem.id}`);
		}
	};

	return (
		<Dialog open={previewOn} onClose={handlePreviewClose} maxWidth="lg" fullWidth scroll="paper">
			<DialogContent className="previewModal">
				<IconButton aria-label="Close" onClick={handlePreviewClose} style={{ float: "right" }}>
					<CloseIcon fontSize="small" />
				</IconButton>

				{/*title*/}
				{/*TODO wrap into a component*/}
				<Box className="previewTitleSection">
					<Typography className="previewTitle">{selectedExecutionName}</Typography>
					<Typography className="previewTitle">Select Data: Housing Recovery Stage Across Households</Typography>
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
								{
									HHSBarChartContent ?
										<HHSBarChart
											data={HHSBarChartContent[t]}
											xAxisLegend="Housing Recovery Stage"
											yAxisLegend="Frequency"
										/>
										:
										null
								}

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
