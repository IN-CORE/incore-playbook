import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./childComponents/navigation/HeaderWithMenu";
// import Footer from "../components/Footer";
import { menuWidth } from "../globals";
import { useHistory } from "react-router-dom";

import { isAuthorized } from "../utils/common";

export const Layout = (props) => {
	const { children } = props;
	const layout = useSelector((state) => state.layout);

	const history = useHistory();

	useEffect(() => {
		if (!isAuthorized()) {
			history.push("/login");
		}
	}, []);

	let mLeft = 0;
	if (layout.isMenuOpen) {
		mLeft = menuWidth;
	}

	let menuItem = sessionStorage.getItem("menu");
	return (
		<div>
			<Header isAuthenticated={isAuthorized()} menuItem={menuItem} />
			<div
				className="masterContent"
				style={{ marginLeft: mLeft, padding: 8, backgroundColor: "rgba(248, 249, 255, 0.5)" }}
			>
				{children}
			</div>
			{/*<div style={{marginLeft: mLeft}}>*/}
			{/*	<Footer />*/}
			{/*</div>*/}
		</div>
	);
};
