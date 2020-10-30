import {connect} from "react-redux";
import AnticipatedPerformanceComponent from "../components/AnticipatedPerformance";
import { fetchAttributes } from "../actions/attributes";
import { fetchExecutions } from "../actions/datawolf";


const mapStateToProps = (state) => {
	return {
		attributes: state.attribute.attributes,
		executions: state.execution.executions
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getTopAttributes: (id, sortColumnName) => {
			dispatch(fetchAttributes(id, sortColumnName));
		},
		getExecutionList: () => {
			dispatch(fetchExecutions());
		}
	};
};

const AnticipatedPerformance = connect(mapStateToProps, mapDispatchToProps)(AnticipatedPerformanceComponent);

export default AnticipatedPerformance;
