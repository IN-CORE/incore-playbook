import {connect} from "react-redux";
import CommunityHazardsComponent from "../components/CommunityHazards";
import {fetchTornadoes} from "../actions/hazards";


const mapStateToProps = (state) => {
	return {
		tornadoes: state.tornado.tornadoes
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		listTornadoes: (limit, offset) => {
			dispatch(fetchTornadoes(limit, offset));
		}
	};
};

const CommunityHazards = connect(mapStateToProps, mapDispatchToProps)(CommunityHazardsComponent);

export default CommunityHazards;
