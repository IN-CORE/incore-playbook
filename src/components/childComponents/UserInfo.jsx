import React, {useState} from "react";

import {Box, Button, Container, Grid, Link,} from "@material-ui/core";

import {IncoreInputLabel} from "../styledComponents/IncoreInputLabel";
import {IncoreButton} from "../styledComponents/IncoreButton";
import {IncoreMenuItem, IncoreSelectBox} from "../styledComponents/IncoreSelect";
import {IncoreTextField} from "../styledComponents/IncoreInput";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import Gravatar from "react-gravatar";
import {globals as defaultGlobalConfig} from "../../globals";
import EditIcon from "@material-ui/icons/Edit";


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

	const assetConfig = useSelector((state) => state.config.assetConfig);

	const classes = useStyles();

	const {userList, handleStepStatusChange} = props;

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [selectedUser, setSelectedUser] = useState({});
	const [role, setRole] = useState("");
	const [email, setEmail] = useState("");
	const [profileImageURL, setProfileImageURL] = useState(assetConfig.defaultProfileImg);

	const handleUserSelection = (event) => {
		let index = event.target.value;
		setSelectedUser(userList[index]);
		setFirstName(userList[index]["firstName"]);
		setLastName(userList[index]["lastName"]);
		setUsername(userList[index]["username"]);
		setRole("Resilience Leader");
		setEmail(userList[index]["email"]);
	};

	const handleProfileImageUpload = (event) => {
		setProfileImageURL(URL.createObjectURL(event.target.files[0]));
	};

	const handleProfileImageRemove = () => {
		setProfileImageURL(assetConfig.defaultProfileImage);
	};

	const handleLeaderSave = () => {
		handleStepStatusChange("complete");
	};

	return (
		<Container>
			<Box className="inputGroup">
				<IncoreInputLabel>Select from user list</IncoreInputLabel>
				<IncoreSelectBox labelId="label" id="select" variant="outlined" defaultValue=""
									 onChange={handleUserSelection}>
					{
						userList.map((user, index) => {
							return (
								<IncoreMenuItem value={index}
									key={user["username"]}>{user["username"]}</IncoreMenuItem>
							);
						})
					}
				</IncoreSelectBox>
			</Box>
			<Box className={classes.inputGroupProfile}>
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
								<Link href={defaultGlobalConfig.setGravatarURL} target="_blank" className={classes.avatarEdit}>
									<EditIcon fontSize="default" />
								</Link>
							</Box>
							:
							<img src={profileImageURL} alt="" className={classes.defaultProfileImage}/>
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
