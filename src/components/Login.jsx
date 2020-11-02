import React, {useState} from "react";
import {Box, Container, InputLabel, TextField, Grid} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {makeStyles } from "@material-ui/core/styles";
import {IncoreButton} from "./styledComponents/IncoreButton";
import Cookies from "universal-cookie";
import config from "../app.config";
import {setMenuState} from "../actions/layout";
import {connect} from "react-redux";

const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
	outerBox: {
		margin: "auto",
		backgroundColor: "White",
	},
	loginContainer: {
		minWidth: "380px",
		width: "380px",
		height: "370px",
		margin: "auto"
	},
	loginFieldsContainer:{
		width: "360px",
		marginLeft: 0,
		paddingLeft: 0
	},
	title: {
		height: "32px",
		color: "#2E384D",
		fontSize: "34px",
		fontWeight: "300",
		letterSpacing: 0,
		lineHeight: "32px",
		marginBottom: theme.spacing(2)
	},
	userMsg: {
		color: "#8798AD",
		fontSize: "16px",
		letterSpacing: 0,
		lineHeight: "15px",
		marginBottom: "20px"
	},
	loginLabel:{
		height: "14px",
		color: "#B0BAC9",
		fontSize: "12px",
		fontWeight: 500,
		letterSpacing: "1.13px",
		lineHeight: "14px",
		marginBottom: theme.spacing(0.5)
	},
	loginLinks:{
		color: "#00619D",
		fontSize: "15px",
		fontWeight: 400,
		marginBottom: theme.spacing(0.5),
		paddingLeft: theme.spacing(0.5)
	},
	loginTextField:{
		boxSizing: "border-box",
		border: "1px solid #E0E7FF",
		borderRadius: "5px",
		backgroundColor: "rgba(224,231,255,0.2)",
		width: "100%"
	},
	signupMsg: {
		color: "#BOBAC9",
		fontSize: "15px",
		letterSpacing: 0,
		lineHeight: "15px",
		marginBottom: theme.spacing(2)
	},
}));

const Login = ({dispatch}) => {
	const classes = useStyles();
	const history = useHistory();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isAuthFail, setAuthFail] = useState(null);

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleKeyPressed = (event) => {
		if (event.charCode === 13) {
			handleLogin();
		}
	};

	const handleLogin = async () => {
		const endpoint = config.authService;

		let formData = [
			`${encodeURIComponent("grant_type")  }=${  encodeURIComponent("password")}`,
			`${encodeURIComponent("username")  }=${  encodeURIComponent(username)}`,
			`${encodeURIComponent("password")  }=${  encodeURIComponent(password)}`,
			`${encodeURIComponent("client_id")  }=${  encodeURIComponent(config.client_id)}`,
		];

		const tokenRequest = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: formData.join("&"),
		});

		const tokenJson = await tokenRequest.json();

		if (tokenJson["access_token"] !== undefined) {
			cookies.set("Authorization", `bearer ${tokenJson["access_token"]}`, {maxAge: tokenJson["expires_in"]});
			setAuthFail(false);
			dispatch(setMenuState(true));
			history.push("/");
		} else {
			setAuthFail(true);
		}
		return tokenJson;
	};

	let userMessageContent = <span> Please enter your credentials to proceed </span>;

	if (isAuthFail === true) {
		userMessageContent = <span style={{color: "Red"}}> Invalid username or password. Please try again. </span>;
	} else if (isAuthFail === false){
		// This message will never be seen on frontend, only for testing
		userMessageContent = <span style={{color: "Green"}}> Login Success. </span>;
	}

	return(
		<div className={classes.loginContainer} >
			<div className={classes.title}>
						Sign In
			</div>

			<div className={classes.userMsg}>
				{userMessageContent}
			</div>
			<Container className={classes.loginFieldsContainer}>
				<Box className="inputGroup">
					<InputLabel className={classes.loginLabel}>USERNAME</InputLabel>
					<TextField className={classes.loginTextField} value={username} size="small" placeholder="incoreuser"
										 variant="outlined" onChange={handleUsernameChange}/>
				</Box>

				<Box className="inputGroup">
					<Grid container>
						<Grid item xs={4}>
							<InputLabel className={classes.loginLabel}>PASSWORD</InputLabel>
						</Grid>
						<Grid item xs={8} style={{textAlign: "right"}}>
							<InputLabel className={classes.loginLinks}>Forgot Password?</InputLabel>
						</Grid>
					</Grid>
					<TextField type="password" className={classes.loginTextField} value={password} size="small" placeholder="Password"
										 variant="outlined" onChange={handlePasswordChange} onKeyPress={handleKeyPressed}/>
				</Box>

				<Box className="inputGroup">
					<IncoreButton variant="contained" color="primary"
						onClick={handleLogin}>
						Sign In
					</IncoreButton>
				</Box>

				<Grid container>
					<Grid item xs={8} style={{textAlign: "right"}}>
						<InputLabel className={classes.signupMsg}>Don't have an account? </InputLabel>
					</Grid>
					<Grid item xs={4} style={{textAlign: "left"}}>
						<InputLabel className={classes.loginLinks}>Sign up</InputLabel>
					</Grid>
				</Grid>

			</Container>

		</div>
	);
};

export default connect()(Login);
