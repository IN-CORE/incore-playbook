import React from "react";

const PoweredBy = ({text}) => {

	let preText = "powered by";

	if(text) {
		preText = text;
	}
	return (
		<div style={{display: "flex", alignItems: "center"}}>
			<span style={{height: "auto", fontSize: 12, letterSpacing: "1.13px", fontWeight: 500,
				color: "DarkGrey", padding: "5px 4px 0 4px"}}>
				{preText}
			</span>
			 <img src="../public/resilience-logo.png" alt="IN-CORE" style={{maxHeight: 30}}/>
		</div>
	);
};

export default PoweredBy;
