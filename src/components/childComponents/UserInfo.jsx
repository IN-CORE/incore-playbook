import React, {useEffect, useState} from "react";

import {Box, Container, Link,} from "@material-ui/core";

import {IncoreInputLabel} from "../styledComponents/IncoreInputLabel";
import {IncoreButton} from "../styledComponents/IncoreButton";
import {IncoreMenuItem, IncoreSelectBox} from "../styledComponents/IncoreSelect";
import {IncoreTextField} from "../styledComponents/IncoreInput";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import Gravatar from "react-gravatar";
import EditIcon from "@material-ui/icons/Edit";
import {assignUserRole, fetchUserList} from "../../actions/user";


const useStyles = makeStyles({
	defaultProfileImage: {
		height: "200px",
		width: "200px"
	},
	avatar: {
		position: "relative",
		width: "100%",
		height: "100%"
	},
	avatarEdit: {
		position: "absolute",
		bottom: "5%",
		left: "170px",
		color: "#FFFFFF"
	},
});

/**
 * Generate a user info form
 */
export const UserInfo = (props) => {

	const {handleStepStatusChange} = props;

	const assetConfig = useSelector((state) => state.config.assetConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const classes = useStyles();

	const dispatch = useDispatch();
	const getPlaybookUserList = () => dispatch(fetchUserList());
	const setPlaybookUserRole = (globalConfig, selectedUserId, userRole) => dispatch(assignUserRole(globalConfig, selectedUserId, userRole));
	const userList = useSelector((state) => state.userList.userList);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [selectedUser, setSelectedUser] = useState({});
	const [role, setRole] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {getPlaybookUserList();}, []);

	const handleUserSelection = (event) => {
		let index = event.target.value;
		if (index >= 0){
			setSelectedUser(userList[index]);
			setFirstName(userList[index]["firstName"]);
			setLastName(userList[index]["lastName"]);
			setUsername(userList[index]["username"]);
			setRole("Resilience Leader");
			setEmail(userList[index]["email"]);
		}
		else{
			setSelectedUser({});
			setFirstName("");
			setLastName("");
			setUsername("");
			setRole("");
			setEmail("");
		}
	};

	const handleLeaderSave = () => {
		// role 1 is leader
		// role 2 is member
		setPlaybookUserRole(globalConfig, selectedUser.id, 1);
		getPlaybookUserList();
	};

	return (
		<Container>
			<Box className="inputGroup">
				<IncoreInputLabel>Select from user list</IncoreInputLabel>
				<IncoreSelectBox labelId="label" id="select" variant="outlined" defaultValue=""
									 onChange={handleUserSelection}>
					<IncoreMenuItem value={-1} key="none">None</IncoreMenuItem>
					{
						userList.map((user, index) => {
							return (
								<IncoreMenuItem value={index} key={user["username"]}>
									{user["firstName"]} {user["lastName"]}
									{user["role"] && user["role"]["name"] === "leader" ? "* ": ""}
								</IncoreMenuItem>
							);
						})
					}
				</IncoreSelectBox>
			</Box>
			<Box>
				<IncoreInputLabel>Profile Photo</IncoreInputLabel>
				<Box>
					{
						selectedUser["email"] !== undefined ?
							<Box className={classes.avatar}>
								<Gravatar
									className={classes.avatarImg}
									size={200}
									email={selectedUser["email"]}
									rating="g"
								/>
								<Link href={globalConfig.setGravatarURL} target="_blank" className={classes.avatarEdit}>
									<EditIcon fontSize="default" />
								</Link>
							</Box>
							:
							<img src={assetConfig.defaultProfileImg} alt="" className={classes.defaultProfileImage}/>
					}
				</Box>
			</Box>
			<Box className="inputGroup">
				<IncoreInputLabel>Full name</IncoreInputLabel>
				<IncoreTextField value={`${firstName} ${lastName}`} variant="outlined" disabled/>
			</Box>
			<Box className="inputGroup">
				<IncoreInputLabel>Display name</IncoreInputLabel>
				<IncoreTextField value={username} variant="outlined" disabled/>
			</Box>
			<Box className="inputGroup">
				<IncoreInputLabel>Role</IncoreInputLabel>
				<IncoreTextField value={role} variant="outlined" disabled/>
			</Box>
			<Box className="inputGroup">
				<IncoreInputLabel>Email</IncoreInputLabel>
				<IncoreTextField value={email} variant="outlined" disabled/>
			</Box>
			<Box className="inputGroup">
				<IncoreButton variant="contained" color="primary"
								  onClick={handleLeaderSave}>Save</IncoreButton>
			</Box>
		</Container>
	);
};
