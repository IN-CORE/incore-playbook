import {connect} from "react-redux";
import BuiltEnvironmentComponent from "../components/BuiltEnvironment";
import {fetchDatasets} from "../actions/datasets";


const mapStateToProps = (state) => {
	return {
		datasets: state.dataset.datasets
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		listDatasets: (limit, offset, dataType) => {
			dispatch(fetchDatasets(limit, offset, dataType));
		}
	};
};

const BuiltEnvironment = connect(mapStateToProps, mapDispatchToProps)(BuiltEnvironmentComponent);

export default BuiltEnvironment;
