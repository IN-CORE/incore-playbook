import * as React from "react";
import {withStyles} from "@material-ui/core";
import AttributesTable from "./AttributesTable";
import Layout from "../containers/Layout";


const styles = {};

class AnticipatedPerformance extends React.Component {

	constructor(props) {
		super(props);

		this.attributeNames = [
			{
				"prettyName": "MEAN DAMAGE",
				"columnName" :"meandamage",
			},
			{
				"prettyName": "BLDG ID",
				"columnName" :"guid",
			},
			{
				"prettyName": "ARCHETYPE",
				"columnName" :"archetype",
			},
			{
				"prettyName": "BUILDING DESCRIPTION",
				"columnName" :"archetype",
			},
			{
				"prettyName": "YEAR",
				"columnName" :"year_built",
			},
			{
				"prettyName": "SQ FT",
				"columnName" :"gsq_foot",
			},

		];

		this.state = {
			selectedId: "incore:5f84acfc45365e253d0744e6",
			sortColumnName: "meandamage"
		};
	}

	componentDidMount() {
		this.props.getTopAttributes(this.state.selectedId, this.state.sortColumnName);
	}

	render() {

		return (
			<Layout>
				{this.props.attributes.length>0 ?<AttributesTable attributeNames={this.attributeNames} attributes={this.props.attributes}/>:null}
			</Layout>
		);
	}
}

export default withStyles(styles)(AnticipatedPerformance);
