import {
	Box,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	Grid,
	IconButton,
	Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CGEBarChart from "../graph/CGEBarChart";
import { CgeResultsTable } from "../table/CgeResultsTable";
import CgeDescription from "../step/CgeDescription";
import React, { useEffect, useState, useRef } from "react";
import {
	IncoreMenuItem,
	IncoreSelectBox,
} from "../../styledComponents/IncoreSelect";
import {
	downloadOutputFile,
	getOutputFileContentJSON,
} from "../../../utils/datawolf";
import { useSelector } from "react-redux";
import { IncoreButtonText } from "../../styledComponents/IncoreButtonText";
import GetAppIcon from "@material-ui/icons/GetApp";
import { downloadImg } from "../../../utils/image";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { IncoreInputLabel } from "../../styledComponents/IncoreInputLabel";

export default function CGE(props) {
	let {
		executionItem,
		previewOn,
		handlePreviewClose,
		datawolfDatasetConfigItems,
		setDownloadDialogOpen,
	} = props;

	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [cgeType, setCgeType] = useState("totalHouseholdIncome");
	const [region, setRegion] = useState(
		globalConfig["allowedRegions"]
			? globalConfig["allowedRegions"][0].value
			: null,
	);
	const [selectedExecutionName, setSelectedExecutionName] = useState("");
	const [cgeHouseholdIncomeContent, setCgeHouseholdIncomeContent] =
		useState(null);
	const [cgeDomesticSupplyContent, setCgeDomesticSupplyContent] =
		useState(null);
	const [cgeEmploymentContent, setCgeEmploymentContent] = useState(null);
	const [cgeEmploymentPreDownload, setCgeEmploymentPreDownload] = useState();
	const [cgeEmploymentPostDownload, setCgeEmploymentPostDownload] = useState();
	const [cgeHouseholdIncomeDownload, setCgeHouseholdIncomeDownload] =
		useState();
	const [cgeDomesticSupplyDownload, setCgeDomesticSupplyDownload] = useState();

	// print container
	const printRef = useRef();

	useEffect(() => {
		setSelectedExecutionName(executionItem["title"]);

		datawolfDatasetConfigItems.map(async (datawolfDatasetConfigItem) => {
			const vName = datawolfDatasetConfigItem.datasets.variableName;
			if (vName === "cgeHouseholdIncomeContent") {
				setCgeHouseholdIncomeContent(
					await getOutputFileContentJSON(
						datawolfConfig,
						executionItem,
						datawolfDatasetConfigItem.datasetId,
					),
				);
			} else if (vName === "cgeDomesticSupplyContent") {
				setCgeDomesticSupplyContent(
					await getOutputFileContentJSON(
						datawolfConfig,
						executionItem,
						datawolfDatasetConfigItem.datasetId,
					),
				);
			} else if (vName === "cgeEmploymentContent") {
				setCgeEmploymentContent(
					await getOutputFileContentJSON(
						datawolfConfig,
						executionItem,
						datawolfDatasetConfigItem.datasetId,
					),
				);
			} else if (vName === "cgeEmploymentPreDownload") {
				setCgeEmploymentPreDownload(
					executionItem["datasets"][datawolfDatasetConfigItem.datasetId],
				);
			} else if (vName === "cgeEmploymentPostDownload") {
				setCgeEmploymentPostDownload(
					executionItem["datasets"][datawolfDatasetConfigItem.datasetId],
				);
			} else if (vName === "cgeHouseholdIncomeDownload") {
				setCgeHouseholdIncomeDownload(
					executionItem["datasets"][datawolfDatasetConfigItem.datasetId],
				);
			} else if (vName === "cgeDomesticSupplyDownload") {
				setCgeDomesticSupplyDownload(
					executionItem["datasets"][datawolfDatasetConfigItem.datasetId],
				);
			}
		});
	}, []);

	const download = async () => {
		setDownloadDialogOpen(true);
		if (cgeType === "totalHouseholdIncome" && cgeHouseholdIncomeDownload) {
			await downloadOutputFile(
				datawolfConfig,
				cgeHouseholdIncomeDownload,
				null,
				`cge-household-income-${executionItem.id}.csv`,
			);
		} else if (cgeType === "domesticSupply" && cgeDomesticSupplyDownload) {
			await downloadOutputFile(
				datawolfConfig,
				cgeDomesticSupplyDownload,
				null,
				`cge-domestic-supply-${executionItem.id}.csv`,
			);
		} else if (
			cgeType === "employment" &&
			cgeEmploymentPreDownload &&
			cgeEmploymentPostDownload
		) {
			await downloadOutputFile(
				datawolfConfig,
				cgeEmploymentPreDownload,
				null,
				`cge-predisaster-demand-${executionItem.id}.csv`,
			);
			await downloadOutputFile(
				datawolfConfig,
				cgeEmploymentPostDownload,
				null,
				`cge-postdisaster-demand-${executionItem.id}.csv`,
			);
		}
	};

	return (
		<Dialog
			open={previewOn}
			onClose={handlePreviewClose}
			maxWidth="lg"
			fullWidth
			scroll="paper"
		>
			<DialogContent className="previewModal" ref={printRef}>
				<IconButton
					aria-label="Close"
					onClick={handlePreviewClose}
					style={{ float: "right" }}
				>
					<CloseIcon fontSize="small" />
				</IconButton>

				{/*title*/}
				{/*TODO wrap into a component*/}
				<Box className="previewTitleSection">
					<Typography className="previewTitle">
						{selectedExecutionName}
					</Typography>
					<Typography className="previewTitle">
						Select Data: CGE Results
					</Typography>
				</Box>

				<Box style={{ padding: "5px 25px 25px 25px" }}>
					<Grid container spacing={3} justify="center">
						<Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
							{/*dropdown*/}
							<Box display="flex" justifyContent="flex-start">
								<Container>
									<Box flexGrow={2}>
										<IncoreInputLabel>Select A Category</IncoreInputLabel>
										<IncoreSelectBox
											labelId="label"
											id="select"
											variant="outlined"
											onChange={(e) => {
												setCgeType(e.target.value);
											}}
											value={cgeType}
											style={{ maxWidth: "500px" }}
										>
											<IncoreMenuItem
												value="totalHouseholdIncome"
												key="totalHouseholdIncome"
											>
												Total Household Income
											</IncoreMenuItem>
											<IncoreMenuItem
												value="domesticSupply"
												key="domesticSupply"
											>
												Domestic Supply
											</IncoreMenuItem>
											<IncoreMenuItem value="employment" key="employment">
												Employment
											</IncoreMenuItem>
										</IncoreSelectBox>
									</Box>
								</Container>

								{/*regions*/}
								<Container>
									{globalConfig["allowedRegions"] ? (
										<Box flexGrow={1}>
											<IncoreInputLabel>Select A Region</IncoreInputLabel>
											<IncoreSelectBox
												labelId="label"
												id="select"
												variant="outlined"
												onChange={(e) => {
													setRegion(e.target.value);
												}}
												value={region}
												style={{ maxWidth: "500px" }}
											>
												{globalConfig["allowedRegions"]
													? globalConfig["allowedRegions"].map(
															(allowedRegion) => {
																return (
																	<IncoreMenuItem
																		value={allowedRegion.value}
																		key={allowedRegion}
																	>
																		{allowedRegion.name}
																	</IncoreMenuItem>
																);
															},
													  )
													: null}
											</IncoreSelectBox>
										</Box>
									) : null}
								</Container>
							</Box>

							{/*table and barchart*/}
							{/*TODO for some reason barchart unit not working*/}
							{(() => {
								if (
									cgeType === "totalHouseholdIncome" &&
									cgeHouseholdIncomeContent
								) {
									return (
										<>
											<Box style={{ margin: "50px 0", maxWidth: "700px" }}>
												<CGEBarChart
													region={region}
													data={cgeHouseholdIncomeContent}
													height="25em"
												/>
											</Box>
											<Box>
												<CgeResultsTable
													region={region}
													resultsJson={cgeHouseholdIncomeContent}
												/>
											</Box>
										</>
									);
								} else if (
									cgeType === "domesticSupply" &&
									cgeDomesticSupplyContent
								) {
									return (
										<>
											<Box style={{ margin: "50px 0", maxWidth: "700px" }}>
												<CGEBarChart
													region={region}
													data={cgeDomesticSupplyContent}
													yAxisLegend="Million of $"
													height="25em"
												/>
											</Box>
											<Box>
												<CgeResultsTable
													region={region}
													resultsJson={cgeDomesticSupplyContent}
													yAxisLegend="Person"
												/>
											</Box>
										</>
									);
								} else if (cgeType === "employment" && cgeEmploymentContent) {
									return (
										<>
											<Box style={{ margin: "50px 0", maxWidth: "700px" }}>
												<CGEBarChart
													region={region}
													data={cgeEmploymentContent}
													title="Employment"
													height="25em"
												/>
											</Box>
											<Box>
												<CgeResultsTable
													region={region}
													resultsJson={cgeEmploymentContent}
												/>
											</Box>
										</>
									);
								}
							})()}
						</Grid>
						<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
							{/*description*/}
							<CgeDescription cgeMetrics={cgeType} />
						</Grid>
					</Grid>
				</Box>
			</DialogContent>
			<DialogActions>
				<IncoreButtonText
					onClick={() => {
						downloadImg(printRef.current, "CGE");
					}}
					startIcon={<CameraAltIcon />}
				>
					Image
				</IncoreButtonText>
				<IncoreButtonText onClick={download} startIcon={<GetAppIcon />}>
					Data
				</IncoreButtonText>
				<IncoreButtonText
					onClick={handlePreviewClose}
					startIcon={<CloseIcon />}
				>
					Close
				</IncoreButtonText>
			</DialogActions>
		</Dialog>
	);
}
