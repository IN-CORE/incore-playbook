import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Grid, makeStyles, Tab, Tabs} from "@material-ui/core";
import {Layout} from "./Layout";

import ViewResult from "./childComponents/ViewResult";
import RunAnalysis from "./childComponents/RunAnalysis";
import PageBanner from "./childComponents/navigation/Banner";
import {fetchExecutions} from "../actions/datawolf";
import {fetchTornadoes} from "../actions/hazards";
import {fetchDatasets} from "../actions/datasets";


const useStyles = makeStyles({
	tab: {
		height: "22px",
		color: "#69707F",
		fontSize: "18px",
		fontWeight: "500",
		letterSpacing: 0,
		lineHeight: "22px",
		textAlign: "center",
		textTransform:"capitalize"
	},
});

export const AnticipatedPerformance = () => {

	const classes = useStyles();

	const [currTabIndex, setCurrTabIndex] = useState(0);

	// Redux connect equivalent
	const dispatch = useDispatch();
	const getExecutionList = () => dispatch(fetchExecutions());
	const listTornadoes =  (limit, offset) => dispatch(fetchTornadoes(limit, offset));
	const listDatasets = (limit, offset, type) => dispatch(fetchDatasets(limit, offset, type));

	const executions = useSelector((state) => state.execution.executions);
	const tornadoes = useSelector((state) => state.tornado.tornadoes);
	const buildings = useSelector((state) => state.dataset.buildings);
	const epfs = useSelector((state) => state.dataset.epfs);
	const interdNetworks= useSelector((state) => state.dataset.interdNetworks);
	const sectorShocks = useSelector((state) => state.dataset.sectorShocks);
	const huas = useSelector((state) => state.dataset.huas);
	const blockGroups = useSelector((state) => state.dataset.blockGroups);
	const valueLosses = useSelector((state) => state.dataset.valueLosses);

	return (
		<Layout>
			<div className="firstDivInContent">
				<PageBanner parentStep="Determine Goals & Objectives"
					childStep="Determine Anticipated Performance" taskNo="3" subtaskNo="3-4"/>
				<Box className="outerBox">
					<Grid container spacing={3} className="innerBox">
						<Grid item className="gridItem">
							<Tabs TabIndicatorProps={{style: {background: "#00619D"}}}
								aria-label="determine anticipated performance tabs"
								value={currTabIndex}
								className={classes.tabs}
								  onChange={(e, value) => { setCurrTabIndex(value);}}>
								<Tab label="run analysis" className={classes.tab}
									 style={currTabIndex === 0? {color: "#00619D"}: {}}/>
								<Tab label="view results" className={classes.tab}
									 style={currTabIndex === 1? {color: "#00619D"}: {}}/>
							</Tabs>
							<RunAnalysis value={currTabIndex} index={0}
										 listTornadoes={listTornadoes}
										 tornadoes={tornadoes}
										 listDatasets={listDatasets}
										 buildings={buildings}
										 epfs={epfs}
										 interdNetworks={interdNetworks}
										 sectorShocks={sectorShocks}
										 huas={huas}
										 blockGroups={blockGroups}
										 valueLosses={valueLosses}
										 getExecutionList={getExecutionList}
										 gotoViewResultTab={()=> {setCurrTabIndex(1);}}
							/>
							<ViewResult value={currTabIndex} index={1}
								getExecutionList={getExecutionList}
								executions={executions}
							/>

						</Grid>
					</Grid>
				</Box>
			</div>
		</Layout>
	);
}
