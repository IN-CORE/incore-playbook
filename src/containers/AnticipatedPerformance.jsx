import {connect} from "react-redux";
import AnticipatedPerformanceComponent from "../components/AnticipatedPerformance";
import { fetchAttributes } from "../actions/attributes";
import { fetchExecutions } from "../actions/datawolf";
import {fetchTornadoes} from "../actions/hazards";
import {fetchDatasets} from "../actions/datasets";


const mapStateToProps = (state) => {
	return {
		attributes: state.attribute.attributes,
		executions: state.execution.executions,
		tornadoes: state.tornado.tornadoes,
		datasets: state.dataset.datasets
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getTopAttributes: (id, sortColumnName) => {
			dispatch(fetchAttributes(id, sortColumnName));
		},
		getExecutionList: () => {
			dispatch(fetchExecutions());
		},
		listTornadoes: (limit, offset) => {
			dispatch(fetchTornadoes(limit, offset));
		},
		listDatasets: (limit, offset) => {
			dispatch(fetchDatasets(limit, offset));
		}
	};
};

const AnticipatedPerformance = connect(mapStateToProps, mapDispatchToProps)(AnticipatedPerformanceComponent);

export default AnticipatedPerformance;
