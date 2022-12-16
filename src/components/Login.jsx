import "../styles/main.css";

import React, { useState, useEffect } from "react";
import { Box, Container, InputLabel, TextField, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { IncoreButton } from "./styledComponents/IncoreButton";
import Cookies from "universal-cookie";
import { setMenuState } from "../actions/layout";

import HeaderWithMenu from "../components/childComponents/navigation/HeaderWithMenu";
import { isAuthorized } from "../utils/common";

import { useDispatch, useSelector } from "react-redux";

const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
	leftGrid: {
		height: "100vh",
		width: "45vw",
		backgroundColor: "White"
	},
	rightGrid: {
		height: "100vh",
		width: "55vw",
		backgroundSize: "cover",
		backgroundPosition: "0 -150px"
	},
	loginComponent: {
		margin: "auto",
		height: "calc(100vh - 64px)",
		display: "flex"
	},
	outerBox: {
		margin: "auto",
		backgroundColor: "White"
	},
	loginContainer: {
		minWidth: "380px",
		width: "380px",
		height: "370px",
		margin: "auto"
	},
	loginFieldsContainer: {
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
	loginLabel: {
		height: "14px",
		color: "#B0BAC9",
		fontSize: "12px",
		fontWeight: 500,
		letterSpacing: "1.13px",
		lineHeight: "14px",
		marginBottom: theme.spacing(0.5)
	},
	loginLinks: {
		color: "#00619D",
		fontSize: "15px",
		fontWeight: 400,
		marginBottom: theme.spacing(0.5),
		paddingLeft: theme.spacing(0.5)
	},
	loginTextField: {
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
	}
}));

export const Login = () => {
	const classes = useStyles();
	const history = useHistory();

	const globalConfig = useSelector((state) => state.config.globalConfig);

	useEffect(() => {
		if (isAuthorized()) {
			history.push("/");
		}
	}, []);

	const assetConfig = useSelector((state) => state.config.assetConfig);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isAuthFail, setAuthFail] = useState(null);

	const dispatch = useDispatch();

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
		const endpoint = globalConfig.authService;

		let formData = [
			`${encodeURIComponent("grant_type")}=${encodeURIComponent("password")}`,
			`${encodeURIComponent("username")}=${encodeURIComponent(username)}`,
			`${encodeURIComponent("password")}=${encodeURIComponent(password)}`,
			`${encodeURIComponent("client_id")}=${encodeURIComponent(globalConfig.client_id)}`
		];

		const tokenRequest = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: formData.join("&")
		});

		const tokenJson = await tokenRequest.json();

		if (tokenJson["access_token"] !== undefined) {
			cookies.set("Authorization", `bearer ${tokenJson["access_token"]}`, {
				maxAge: tokenJson["expires_in"],
				path: "/"
				// TODO these flag doesn't work; it only affects cross site (localhost to geoserver) though
				// sameSite: "None",
				// secure: true
			});
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
		userMessageContent = <span style={{ color: "Red" }}> Invalid username or password. Please try again. </span>;
	} else if (isAuthFail === false) {
		// This message will never be seen on frontend, only for testing
		userMessageContent = <span style={{ color: "Green" }}> Login Success. </span>;
	}

	return (
		<Grid container>
			<Grid item className={classes.leftGrid}>
				<HeaderWithMenu isAuthenticated={false} />
				<div className={classes.loginComponent}>
					<div className={classes.loginContainer}>
						<div className={classes.title}>Sign In</div>

						<div className={classes.userMsg}>{userMessageContent}</div>
						<Container className={classes.loginFieldsContainer}>
							<Box className="inputGroup">
								<InputLabel className={classes.loginLabel}>USERNAME</InputLabel>
								<TextField
									className={classes.loginTextField}
									value={username}
									size="small"
									placeholder="incoreuser"
									variant="outlined"
									onChange={handleUsernameChange}
								/>
							</Box>

							<Box className="inputGroup">
								<Grid container>
									<Grid item xs={4}>
										<InputLabel className={classes.loginLabel}>PASSWORD</InputLabel>
									</Grid>
									<Grid item xs={8} style={{ textAlign: "right" }}>
										<InputLabel className={classes.loginLinks}>Forgot Password?</InputLabel>
									</Grid>
								</Grid>
								<TextField
									type="password"
									className={classes.loginTextField}
									value={password}
									size="small"
									placeholder="Password"
									variant="outlined"
									onChange={handlePasswordChange}
									onKeyPress={handleKeyPressed}
								/>
							</Box>

							<Box className="inputGroup">
								<IncoreButton variant="contained" color="primary" onClick={handleLogin}>
									Sign In
								</IncoreButton>
							</Box>

							<Grid container>
								<Grid item xs={8} style={{ textAlign: "right" }}>
									<InputLabel className={classes.signupMsg}>Don't have an account? </InputLabel>
								</Grid>
								<Grid item xs={4} style={{ textAlign: "left" }}>
									<InputLabel className={classes.loginLinks}>Sign up</InputLabel>
								</Grid>
							</Grid>
						</Container>
					</div>
				</div>
			</Grid>

			<Grid
				item
				className={classes.rightGrid}
				style={{ backgroundImage: `url(${assetConfig.loginBackgroundImg})` }}
			>
				<img src={assetConfig.poweredByLogo} alt="" style={{ margin: "40px" }} />
			</Grid>
		</Grid>
	);
};
