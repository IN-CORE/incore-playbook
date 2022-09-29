import React, {useState} from "react";

import {Box, Button, Container, Grid, Link,} from "@material-ui/core";

import {IncoreInputLabel} from "../styledComponents/IncoreInputLabel";
import {IncoreButton} from "../styledComponents/IncoreButton";
import {IncoreMenuItem, IncoreSelectBox} from "../styledComponents/IncoreSelect";
import {IncoreTextField} from "../styledComponents/IncoreInput";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";

const useStyles = makeStyles({
	inputGroupProfile: {
		height: "196px",
		width: "481px"
	},
	profileImage: {
		height: "112px",
		width: "112px"
	},
	uploadButton: {
		boxSizing: "border-box",
		height: "32px",
		width: "156px",
		border: "1px solid #8798AD",
		borderRadius: "3px",
		backgroundColor: "#FFFFFF",
		fontSize: "14px",
		fontWeight: 500,
		letterSpacing: "0.53px",
		lineHeight: "17px",
		textAlign: "center",
		textTransform: "None",
		display: "block",
		margin: "auto"
	},
	removeLink: {
		height: "17px",
		color: "#00619D",
		fontSize: "14px",
		letterSpacing: "0.53px",
		lineHeight: "17px",
		textAlign: "center",
		display: "block",
		marginTop: "12px",
	}
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
	const [role, setRole] = useState("");
	const [email, setEmail] = useState("");
	const [profileImageURL, setProfileImageURL] = useState(assetConfig.defaultProfileImg);

	const handleUserSelection = (event) => {
		let index = event.target.value;
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
				<Grid container spacing={3}>
					<Grid item lg={3} md={3} sm={3} xs={12}>
						<img src={profileImageURL} alt="" className={classes.profileImage}/>
					</Grid>
					<Grid item lg={6} md={6} sm={6} xs={12}>
						<Button variant="outlined" component="label" className={classes.uploadButton}>
								Upload an Image
							<input type="file" onChange={handleProfileImageUpload} style={{display: "none"}}/>
						</Button>
						<Link href="#" onClick={handleProfileImageRemove} className={classes.removeLink}>Remove
								Photo</Link>
					</Grid>
				</Grid>
			</Box>
			<Box className="inputGroup">
				<IncoreInputLabel>Full name</IncoreInputLabel>
				<IncoreTextField value={`${firstName} ${lastName}`} variant="outlined"/>
			</Box>
			<Box className="inputGroup">
				<IncoreInputLabel>Display name</IncoreInputLabel>
				<IncoreTextField value={username} variant="outlined"/>
			</Box>
			<Box className="inputGroup">
				<IncoreInputLabel>Role</IncoreInputLabel>
				<IncoreTextField value={role} variant="outlined"/>
			</Box>
			<Box className="inputGroup">
				<IncoreInputLabel>Email</IncoreInputLabel>
				<IncoreTextField value={email} variant="outlined"/>
			</Box>
			<Box className="inputGroup">
				<IncoreButton variant="contained" color="primary"
								  onClick={handleLeaderSave}>Save</IncoreButton>
			</Box>
		</Container>
	);
};
