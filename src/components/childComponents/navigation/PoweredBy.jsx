import React from "react";
import {useSelector} from "react-redux";

const PoweredBy = ({text}) => {
	const assetConfig = useSelector((state) => state.config.assetConfig);
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
			 <img src={assetConfig.poweredByLogo} alt="IN-CORE" style={{maxHeight: 30}}/>
		</div>
	);
};

export default PoweredBy;
