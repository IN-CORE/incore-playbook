import * as React from "react";
import "../styles/main.css";
import LoginComponent from "../components/Login";
import {withStyles} from "@material-ui/core";
import LoginBg from "../public/login-background.jpg";
import HeaderWithMenu from "../components/HeaderWithMenu";
import {isAuthorized} from "../utils/common";

const styles = {
	loginContainer: {
		backgroundImage: `url(${LoginBg})`,
		backgroundSize: "cover",
		height: "100vh"
	}
	,
	leftGrid:{
		height: "100vh",
		width: "40vw",
		backgroundColor: "White"
	},
	loginComponent:{
		margin: "auto",
		height: "calc(100vh - 64px)",
		display: "flex"
	}
};


class Login extends React.Component {
	render() {
		const {classes} = this.props;

		if(isAuthorized()){
			this.props.history.push("/");
		}
		return(
			<div className={classes.loginContainer} >

				<div className={classes.leftGrid}>
					<HeaderWithMenu isAuthenticated={false}/>
					<div className={classes.loginComponent}>
						<LoginComponent/>
					</div>
				</div>

			</div>
		);
	}
}

export default withStyles(styles)(Login);
