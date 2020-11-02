import * as React from "react";
import {withStyles} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";

const styles = {
	thisStepTitle: {
		cursor: "pointer",
		height: "14px",
		width: "120px",
		color: "#00619D",
		fontFamily: "Roboto, sans-serif",
		fontSize: "12px",
		fontWeight: "500",
		letterSpacing: "0",
		lineHeight: "14px",
		margin: "20px 5px 0px 5px"
	},
	thisStepAbout: {
		minHeight: "200px",
		width: "100%",
		color: "#8798AD",
		fontFamily: "Rubik, sans-serif",
		fontSize: "12px",
		letterSpacing: "0",
		lineHeight: "15px",
		margin: "0px 5px 0px 5px"
	},
	learnMoreLink: {
		color: "#00619D",
		lineHeight: "14px"
	}
};

class StepDescription extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			open: true
		};
		this.togglePanel = this.togglePanel.bind(this);
	}

	componentDidMount() {

	}

	togglePanel(){
		this.setState({open: !this.state.open});
	}

	render() {
		const title = this.props.stepInfo.stepTitle;
		const about = this.props.stepInfo.stepAbout.map((paragraph, index) =>
			<p key={index} className="secondary-color">{paragraph}</p>);
		const link = this.props.stepInfo.stepLink;


		return (
			<div>
				<div onClick={(e)=>this.togglePanel(e)} style={styles.thisStepTitle} >
					{title} {this.state.open ? (<ExpandLess style={{fontSize: "small"}} />) : <ExpandMore style={{fontSize: "small"}} />}
				</div>
				{this.state.open ? (
					<div style={styles.thisStepAbout}>
						{about}
						<a style={styles.learnMoreLink} href={link.uri}>{link.text}</a>
					</div>
				) : null}
			</div>
		);
	}
}

export default withStyles(styles)(StepDescription);
