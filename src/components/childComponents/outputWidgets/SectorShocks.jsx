import { Box, Dialog, DialogActions, DialogContent, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState, useRef } from "react";
import { getOutputFileContent, downloadOutputFile } from "../../../utils/datawolf";
import { useSelector } from "react-redux";
import { IncoreButtonText } from "../../styledComponents/IncoreButtonText";
import GetAppIcon from "@material-ui/icons/GetApp";
import { downloadImg } from "../../../utils/image";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

export default function SectorShocks(props) {
	let { executionItem, previewOn, handlePreviewClose, datawolfDatasetConfigItems } = props;

	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);

	const [selectedExecutionName, setSelectedExecutionName] = useState("");
	const [sectorShocksContent, setSectorShocksContent] = useState(null);
	const [sectorShocksDatasetId, setSectorShocksDatasetId] = useState(null);

	// print container
	const printRef = useRef();

	useEffect(()=> {
		setSelectedExecutionName(executionItem["title"]);

		datawolfDatasetConfigItems.map(async (datawolfDatasetConfigItem) => {
			const vName = datawolfDatasetConfigItem.datasets.variableName;
			if (vName === "sectorShocksContent") {
				setSectorShocksContent(
					await getOutputFileContent(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId)
				);
				setSectorShocksDatasetId(datawolfDatasetConfigItem.datasetId);
			}
		});
	}, []);

	const download = async () => {
		if (sectorShocksDatasetId) {
			downloadOutputFile(datawolfConfig, executionItem, sectorShocksDatasetId, null,
				`sector-shocks-${executionItem.id}`);
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
					<Typography className="previewTitle">Select Data: Sector Shocks Results</Typography>
				</Box>

				{/*<Box style={{ padding: "5px 25px 25px 25px" }}>*/}
				{/*	<Grid container spacing={3} justify="center">*/}
				{/*		<Grid item xs={12} sm={12} md={8} lg={8} xl={8}>*/}
				{/*			/!*table and barchart*!/*/}
				{/*			{(() => {*/}
				{/*				if (sectorShocksContent) {*/}
				{/*					return (*/}
				{/*						<>*/}
				{/*							<Box style={{ margin: "50px 0", maxWidth: "700px" }}>*/}
				{/*								<CGEBarChart*/}
				{/*									data={cgeHouseholdIncomeContent}*/}
				{/*									yAxisLegend="Million of $"*/}
				{/*								/>*/}
				{/*							</Box>*/}
				{/*							<Box>*/}
				{/*								<CgeResultsTable resultsJson={cgeHouseholdIncomeContent} />*/}
				{/*							</Box>*/}
				{/*						</>*/}
				{/*					);*/}
				{/*				}*/}
				{/*			})()}*/}
				{/*		</Grid>*/}
				{/*	</Grid>*/}
				{/*</Box>*/}
			</DialogContent>
			<DialogActions>
				<IncoreButtonText onClick={()=>{downloadImg(printRef.current, "SectorShocks");}}
								  startIcon={<CameraAltIcon/>}>Image</IncoreButtonText>
				<IncoreButtonText onClick={download} startIcon={<GetAppIcon/>}>Data</IncoreButtonText>
				<IncoreButtonText onClick={handlePreviewClose} startIcon={<CloseIcon/>}>Close</IncoreButtonText>
			</DialogActions>
		</Dialog>
	);
}
