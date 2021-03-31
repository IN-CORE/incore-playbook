import {connect} from "react-redux";
import TeamLeaderComponent from "../components/TeamLeader";
import { fetchUserList } from "../actions/userList";


const mapStateToProps = (state) => {
	return {
		userList: state.userList.userList
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPlaybookUserList: () => {
			dispatch(fetchUserList());
		}
	};
};

const TeamLeader = connect(mapStateToProps, mapDispatchToProps)(TeamLeaderComponent);

export default TeamLeader;
