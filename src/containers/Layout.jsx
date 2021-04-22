import React, {useEffect} from "react";
import {connect} from "react-redux";
import Header from "../components/HeaderWithMenu";
// import Footer from "../components/Footer";
import {globals} from "../globals";
import { useHistory } from "react-router-dom";

import {isAuthorized} from "../utils/common";

const Layout = (props) => {

	const history = useHistory();

	useEffect(() =>{
		if(!isAuthorized()){
			history.push("/login");
		}
	}, []);

	let mLeft = 0;
	if(props.layout.isMenuOpen){
		mLeft = globals.menuWidth;
	}

	let menuItem = sessionStorage.getItem("menu");
	return(
		<div>
			<Header isAuthenticated={isAuthorized()} menuItem={menuItem}/>
			<div className="masterContent" style={{marginLeft: mLeft, padding: 8,
				backgroundColor: "rgba(248, 249, 255, 0.5)"}}>
				{props.children}
			</div>
			{/*<div style={{marginLeft: mLeft}}>*/}
			{/*	<Footer />*/}
			{/*</div>*/}

		</div>
	);
};

const mapStateToProps = state => {
	return {
		layout: state.layout
	};
};

export default connect(mapStateToProps)(Layout);
