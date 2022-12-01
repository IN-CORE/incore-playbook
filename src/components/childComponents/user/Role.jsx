import React, {useEffect, useState} from "react";
import {IncoreMenuItem, IncoreSelectBox} from "../../styledComponents/IncoreSelect";
import {Box, Button, ButtonGroup} from "@material-ui/core";
import {assignUserRole} from "../../../actions/user";
import {useDispatch, useSelector} from "react-redux";

export const Role = (props) => {

	const {roles, user} = props;

	const dispatch = useDispatch();

	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [selectedRole, setSelectedRole] = useState(2);
	const [editRoleOn, setEditRoleOn] = useState(false);
	const setPlaybookUserRole = (globalConfig, selectedUserId, userRole) => dispatch(assignUserRole(globalConfig, selectedUserId, userRole));

	const handleRoleSave = (selectedRole) => {
		setPlaybookUserRole(globalConfig, user.id, selectedRole);
		setEditRoleOn(false);
	};


	return (
		<>
			{
				editRoleOn ?
					<>
						<IncoreSelectBox labelId="label" id="select" variant="outlined"
										 onChange={(e) => { setSelectedRole(e.target.value); }}
										 value={selectedRole}
						>
							{
								roles.map((role) => {
									return (<IncoreMenuItem value={role["id"]} key={`role-${role["id"]}`}>
										{role["name"]}
									</IncoreMenuItem>);
								})
							}
						</IncoreSelectBox>
						<Box style={{"display": "block"}}>
							<ButtonGroup variant="text">
								<Button color="primary" style={{fontSize: "12px", color: "#00619D"}}
									onClick={handleRoleSave}>Save</Button>
								<Button color="Secondary" style={{fontSize: "12px", color: "#00619D"}}
									onClick={() => {setEditRoleOn(false);}}>Cancel</Button>
							</ButtonGroup>
						</Box>
					</>
					:
					<>
						{user["role"] && user["role"]["name"] ? user["role"]["name"] : "None"}
						<Box style={{"display": "block"}}>
							<Button style={{fontSize: "12px", color: "#00619D"}}
								onClick={() => {setEditRoleOn(true);}}>Change</Button>
						</Box>
					</>
			}
		</>
	);
};
