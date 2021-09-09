import {connect} from "react-redux";
import BuiltEnvironmentComponent from "../components/BuiltEnvironment";
import {fetchDatasets} from "../actions/datasets";


const mapStateToProps = (state) => {
	return {
		buildings: state.dataset.buildings,
		epfs: state.dataset.epfs,
		interdNetworks: state.dataset.interdNetworks,
		sectorShocks: state.dataset.sectorShocks,
		cgeSams: state.dataset.cgeSams,
		cgeBbs: state.dataset.cgeBbs,
		cgeIouts: state.dataset.cgeIouts,
		cgeMiscs: state.dataset.cgeMiscs,
		cgeMischs: state.dataset.cgeMischs,
		cgeLandcaps: state.dataset.cgeLandcaps,
		cgeEmploys: state.dataset.cgeEmploys,
		cgeIgtds: state.dataset.cgeIgtds,
		cgeTauffs: state.dataset.cgeTauffs,
		cgeJobcrs: state.dataset.cgeJobcrs,
		cgeOutcrs: state.dataset.cgeOutcrs,
		huas: state.dataset.huas,
		blockGroups: state.dataset.blockGroups,
		valueLosses: state.dataset.valueLosses
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
