import React, { useEffect, useRef, useState } from "react";

import { Box, Dialog, DialogActions, DialogContent, Grid, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import HHSBarChart from "../graph/HHSBarChart";
import CgeDescription from "../step/CgeDescription";
import React, { useEffect, useState } from "react";
import { IncoreMenuItem, IncoreSelectBox } from "../../styledComponents/IncoreSelect";
import { downloadOutputFile, getOutputFileContentJSON } from "../../../utils/datawolf";
import { useSelector } from "react-redux";
import { IncoreButtonText } from "../../styledComponents/IncoreButtonText";
import GetAppIcon from "@material-ui/icons/GetApp";
import HhsDescription from "../step/HhsDescription";

export default function HHS(props) {
	let { executionItem, previewOn, handlePreviewClose, datawolfDatasetConfigItems, setDownloadDialogOpen } = props;

	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);

	const [selectedExecutionName, setSelectedExecutionName] = useState("");
	const [HHSBarChartContent, setHHSBarChartContent] = useState({
		t0: [],
		t1: [],
		t6: [],
		t12: [],
		t24: []
	});
	const [t, setT] = useState("t0");

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
			t0: [3033, 3138, 3857, 4862, 0],
			t1: [1773, 2410, 2452, 8255, 0],
			t6: [820, 1066, 515, 12489, 0],
			t12: [485, 513, 134, 13614, 609],
			t24: [60, 62, 10, 14149, 144]
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
								<IncoreMenuItem value="t0" key="t0">
									Immediately after the disaster
								</IncoreMenuItem>
								<IncoreMenuItem value="t1" key="t1">
									1 month post-disaster
								</IncoreMenuItem>
								<IncoreMenuItem value="t6" key="t6">
									6 months post-disaster
								</IncoreMenuItem>
								<IncoreMenuItem value="t12" key="t12">
									12 months post-disaster
								</IncoreMenuItem>
								<IncoreMenuItem value="t24" key="t24">
									24 months post-disaster
								</IncoreMenuItem>
							</IncoreSelectBox>

							{/*table and barchart*/}
							<Box style={{ margin: "50px 0", maxWidth: "700px" }}>
								<HHSBarChart
									data={HHSBarChartContent[t]}
									xAxisLegend="Housing Recovery Stage"
									yAxisLegend="Frequency"
								/>
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
