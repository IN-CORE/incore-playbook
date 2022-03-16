import React, {useEffect, useState} from "react";
import {
	Box,
	Grid,
} from "@material-ui/core";
import {UserInfo} from "./childComponents/UserInfo";
import StepStatus from "./childComponents/step/StepStatus";
import PageBanner from "./childComponents/navigation/Banner";
import {Layout} from "./Layout";
import StepInfo from "./StepInfo";
import fullHtml from "../public/steps/1-1.html";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserList} from "../actions/userList";


export const TeamLeader = () => {
	const [activeKey, setActiveKey] = useState("in-progress");
	const dispatch = useDispatch();
	const getPlaybookUserList = () => dispatch(fetchUserList());
	const userList = useSelector((state) => state.userList.userList);

	useEffect(() => {getPlaybookUserList();}, []);

	// TODO need to configure stepStatus to accept this status
	// might need to put the status into redux
	const handleStepStatusChange = (status) => {
		setActiveKey(status);
	};

	return (
		<Layout>
			<div className="firstDivInContent">
				<PageBanner parentStep="Form a Collaborative Planning Team"
					childStep="Identify a Resilience Leader for the Community" taskNo="1" subtaskNo="1-1"/>
				<Box className="outerBox">
					<Grid container spacing={3} className="innerBox">
						<Grid item xl={5} lg={5} md={5} sm={5} xs={12} className="gridItem">
							<UserInfo userList={userList} handleStepStatusChange={handleStepStatusChange}/>
						</Grid>
						<Grid item xl={7} lg={7} md={7} sm={7} xs={12} className="gridItem">
							<StepStatus activeKey={activeKey} setActiveKey={setActiveKey}/>
							<StepInfo fullHtml={fullHtml} />
						</Grid>
					</Grid>
				</Box>
			</div>
		</Layout>
	);

}

export default TeamLeader;
