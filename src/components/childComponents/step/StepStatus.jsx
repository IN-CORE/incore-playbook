import React, {useState} from "react";
import "../../../styles/step-status.css";
import { processStatus } from "../../../globals";

export default function StepStatus(props){

	const [activeKey, setActiveKey] = useState("inprogress");

	return (
		<div>
			<div className={"stepStatus"}>
				Step Status
			</div>
			<div className={"statusBox"}>
				{processStatus.map((status, index) => (
					<div key={index} className={`statusInfo ${ activeKey === status.key ? "active": ""}`} >
						<div style={{paddingTop:2, cursor: "pointer"}} onClick={()=>{setActiveKey(status.key);}}>
							{status.name}</div>
					</div>))}
			</div>
		</div>
	);
}
