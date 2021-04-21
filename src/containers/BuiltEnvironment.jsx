import {connect} from "react-redux";
import BuiltEnvironmentComponent from "../components/BuiltEnvironment";
import {fetchDatasets} from "../actions/datasets";


const mapStateToProps = (state) => {
	return {
		buildings: state.dataset.buildings,
		epfs: state.dataset.epfs,
		interdNetworks: state.dataset.interdNetworks
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		listDatasets: (limit, offset, type) => {
			dispatch(fetchDatasets(limit, offset, type));
		}
	};
};

const BuiltEnvironment = connect(mapStateToProps, mapDispatchToProps)(BuiltEnvironmentComponent);

export default BuiltEnvironment;
