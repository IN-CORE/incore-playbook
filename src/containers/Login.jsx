import * as React from "react";
import "../styles/main.css";
import LoginComponent from "../components/Login";
import {withStyles} from "@material-ui/core";
import LoginBg from "../public/login-background.jpg";
import Powered from "../public/powered-by-incore.svg";
import HeaderWithMenu from "../components/childComponents/navigation/HeaderWithMenu";
import {isAuthorized} from "../utils/common";
import Grid from "@material-ui/core/Grid";

const styles = {
	leftGrid:{
		height: "100vh",
		width: "45vw",
		backgroundColor: "White"
	},
	rightGrid:{
		height: "100vh",
		width: "55vw",
		backgroundImage:  `url(${LoginBg})`,
		backgroundSize: "cover",
		backgroundPosition: "0 -150px"
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
			<Grid container>
				<Grid item className={classes.leftGrid}>
					<HeaderWithMenu isAuthenticated={false}/>
					<div className={classes.loginComponent}>
						<LoginComponent/>
					</div>
				</Grid>

				<Grid item className={classes.rightGrid} >
					<img src={Powered} alt="" style={{margin: "40px"}}/>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(Login);
