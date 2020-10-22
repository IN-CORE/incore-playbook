import React from "react";

import {Box, Button, Container, Grid, Link, withStyles,} from "@material-ui/core";

import DefaultProfileImage from "../public/default-profile-img.png";
import {IncoreInputLabel} from "./styledComponents/IncoreInputLabel";
import {IncoreButton} from "./styledComponents/IncoreButton";
import {IncoreMenuItem, IncoreSelectBox} from "./styledComponents/IncoreSelect";
import {IncoreTextField} from "./styledComponents/IncoreInput";

const styles = {
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
};

/**
 * Generate a user info form
 */
class UserInfo extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			firstName: "",
			lastName: "",
			username: "",
			role: "",
			email: "",
			profileImageURL: DefaultProfileImage
		};

		this.handleUserSelection = this.handleUserSelection.bind(this);
		this.handleProfileImageUpload = this.handleProfileImageUpload.bind(this);
		this.handleProfileImageRemove = this.handleProfileImageRemove.bind(this);
		this.handleLeaderSave = this.handleLeaderSave.bind(this);
	}

	handleUserSelection(event) {
		let index = event.target.value;
		this.setState({
			firstName: this.props.userList[index]["firstName"],
			lastName: this.props.userList[index]["lastName"],
			username: this.props.userList[index]["username"],
			role: "Resilience Leader",
			email: this.props.userList[index]["email"],
		});
	}

	handleProfileImageUpload(event) {
		this.setState({
			profileImageURL: URL.createObjectURL(event.target.files[0])
		});
	}

	handleProfileImageRemove(event) {
		this.setState({
			profileImageURL: DefaultProfileImage
		});
	}

	handleLeaderSave() {
		this.props.handleStepStatusChange("complete");
	}


	render() {
		const {classes} = this.props;

		return (
			<Container>
				<Box className="inputGroup">
					<IncoreInputLabel>Select from user list</IncoreInputLabel>
					<IncoreSelectBox labelId="label" id="select" variant="outlined" defaultValue=""
									 onChange={this.handleUserSelection}>
						{
							this.props.userList.map((user, index) => {
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
							<img src={this.state.profileImageURL} alt="" className={classes.profileImage}/>
						</Grid>
						<Grid item lg={6} md={6} sm={6} xs={12}>
							<Button variant="outlined" component="label" className={classes.uploadButton}>
								Upload an Image
								<input type="file" onChange={this.handleProfileImageUpload} style={{display: "none"}}/>
							</Button>
							<Link href="#" onClick={this.handleProfileImageRemove} className={classes.removeLink}>Remove
								Photo</Link>
						</Grid>
					</Grid>
				</Box>
				<Box className="inputGroup">
					<IncoreInputLabel>Full name</IncoreInputLabel>
					<IncoreTextField value={`${this.state.firstName} ${this.state.lastName}`} variant="outlined"/>
				</Box>
				<Box className="inputGroup">
					<IncoreInputLabel>Display name</IncoreInputLabel>
					<IncoreTextField value={this.state.username} variant="outlined"/>
				</Box>
				<Box className="inputGroup">
					<IncoreInputLabel>Role</IncoreInputLabel>
					<IncoreTextField value={this.state.role} variant="outlined"/>
				</Box>
				<Box className="inputGroup">
					<IncoreInputLabel>Email</IncoreInputLabel>
					<IncoreTextField value={this.state.email} variant="outlined"/>
				</Box>
				<Box className="inputGroup">
					<IncoreButton variant="contained" color="primary"
								  onClick={this.handleLeaderSave}>Save</IncoreButton>
				</Box>
			</Container>
		);
	}
}

export default withStyles(styles)(UserInfo);
