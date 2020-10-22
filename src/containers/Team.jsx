import {connect} from "react-redux";
import TeamComponent from "../components/Team";
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

const Team = connect(mapStateToProps, mapDispatchToProps)(TeamComponent);

export default Team;
