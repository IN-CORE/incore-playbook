import {connect} from "react-redux";
import IntroductionComponent from "../components/Introduction";
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

const Introduction = connect(mapStateToProps, mapDispatchToProps)(IntroductionComponent);

export default Introduction;
