import React, { useEffect, useState } from "react";
import { IncoreMenuItem, IncoreSelectBox } from "../../styledComponents/IncoreSelect";
import { Box, Button, ButtonGroup } from "@material-ui/core";
import { assignUserRole } from "../../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";

export const Role = (props) => {
	const { roles, user, editable } = props;

	const dispatch = useDispatch();

	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [selectedRoleId, setSelectedRoleId] = useState(
		user["role"] && user["role"]["id"] ? user["role"]["id"] : null
	);

	const [editRoleOn, setEditRoleOn] = useState(false);
	const setPlaybookUserRole = (globalConfig, selectedUserId, userRole) =>
		dispatch(assignUserRole(globalConfig, selectedUserId, userRole));

	useEffect(() => {
		// if any thing updated in redux, reflect on the selected user
		setSelectedRoleId(user["role"] && user["role"]["id"] ? user["role"]["id"] : null);
	}, [user]);

	const handleRoleSelection = (e) => {
		setSelectedRoleId(e.target.value);
	};

	const handleRoleCancel = () => {
		// Resume to the current state in redux
		setSelectedRoleId(user["role"] && user["role"]["id"] ? user["role"]["id"] : null);
		setEditRoleOn(false);
	};

	const handleRoleSave = () => {
		setPlaybookUserRole(globalConfig, user.id, selectedRoleId);
		setEditRoleOn(false);
	};

	return (
		<>
			{editRoleOn ? (
				<>
					<IncoreSelectBox
						labelId="label"
						id="select"
						variant="outlined"
						onChange={(e) => {
							handleRoleSelection(e);
						}}
						value={selectedRoleId}
					>
						{roles.map((role) => {
							return (
								<IncoreMenuItem value={role["id"]} key={`role-${role["id"]}`}>
									{role["name"]}
								</IncoreMenuItem>
							);
						})}
					</IncoreSelectBox>
					<Box style={{ display: "block" }}>
						<ButtonGroup variant="text">
							<Button
								color="primary"
								style={{ fontSize: "12px", color: "#00619D" }}
								onClick={handleRoleSave}
							>
								<SaveIcon />
							</Button>
							<Button
								color="Secondary"
								style={{ fontSize: "12px", color: "#00619D" }}
								onClick={handleRoleCancel}
							>
								<CancelIcon />
							</Button>
						</ButtonGroup>
					</Box>
				</>
			) : (
				<>
					{selectedRoleId
						? roles.map((role) => {
							if (role["id"] === selectedRoleId) {
								return role["name"];
							}
						  })
						: "None"}
					{
						editable ?
							<Box style={{ display: "block" }}>
								<Button
									style={{ fontSize: "12px", color: "#00619D" }}
									onClick={() => {
										setEditRoleOn(true);
									}}
								>
								    <EditIcon fontSize="small" />
								</Button>
							</Box>
							:
							<></>
					}
				</>
			)}
		</>
	);
};
