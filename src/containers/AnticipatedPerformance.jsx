import {connect} from "react-redux";
import AnticipatedPerformanceComponent from "../components/AnticipatedPerformance";
import { fetchAttributes } from "../actions/attributes";


const mapStateToProps = (state) => {
	return {
		attributes: state.attribute.attributes
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getTopAttributes: (id, sortColumnName) => {
			dispatch(fetchAttributes(id, sortColumnName));
		}
	};
};

const AnticipatedPerformance = connect(mapStateToProps, mapDispatchToProps)(AnticipatedPerformanceComponent);

export default AnticipatedPerformance;
