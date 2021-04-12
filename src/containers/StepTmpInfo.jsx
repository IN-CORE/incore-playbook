import {connect} from "react-redux";
import StepTmpInfoComponent from "../components/StepTmpInfo";
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

const StepTmpInfo = connect(mapStateToProps, mapDispatchToProps)(StepTmpInfoComponent);

export default StepTmpInfo;
