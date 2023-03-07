import { Box, Dialog, DialogActions, DialogContent, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState, useRef } from "react";
import { getOutputFileContent, downloadOutputFile } from "../../../utils/datawolf";
import { useSelector } from "react-redux";
import { IncoreButtonText } from "../../styledComponents/IncoreButtonText";
import GetAppIcon from "@material-ui/icons/GetApp";
import { downloadImg } from "../../../utils/image";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import SectorShocksBarChart from "../graph/SectorShocksBarChart";

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
				setSectorShocksDatasetId(executionItem["datasets"][datawolfDatasetConfigItem.datasetId]);
			}
		});
	}, []);

	const download = async () => {
		if (sectorShocksDatasetId) {
			await downloadOutputFile(datawolfConfig, sectorShocksDatasetId, null,
				`sector-shocks-${executionItem.id}.csv`);
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

				<Box style={{ padding: "5px 25px 25px 25px" }}>
					{/*table and barchart*/}
					{(() => {
						if (sectorShocksContent) {
							return (
								<Box style={{ margin: "50px 0" }}>
									<SectorShocksBarChart
										data={sectorShocksContent}
										xAxisLegend="Sectors"
										yAxisLegend="Capital Shocks"
									/>
								</Box>
							);
						}
					})()}
				</Box>
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
