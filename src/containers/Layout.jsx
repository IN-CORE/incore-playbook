import React from "react";
import {connect} from "react-redux";
import Header from "../components/HeaderWithMenu";
import Footer from "../components/Footer";
import {globals} from "../globals";

const Layout = (props) => {
	let mLeft = 0;
	if(props.layout.isMenuOpen){
		mLeft = globals.menuWidth;
	}
	return(
		<div>
			<Header/>
			<div className="masterContent" style={{marginLeft: mLeft, padding: 8}}>
				{props.children}
			</div>
			<div style={{marginLeft: mLeft}}>
				<Footer />
			</div>


		</div>
	);
};

const mapStateToProps = state => {
	return {
		layout: state.layout
	};
};

export default connect(mapStateToProps)(Layout);
