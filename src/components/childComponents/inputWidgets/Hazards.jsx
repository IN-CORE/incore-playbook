import React, {useEffect, useState} from "react";
import {IncoreMenuItem, IncoreSelectBox} from "../../styledComponents/IncoreSelect";
import {useDispatch, useSelector} from "react-redux";
import {fetchHazards} from "../../../actions/hazards";


export default function Hazards(props) {

	const {setDatawolfFormState, datawolfFormState, datawolfParamConfigItem} = props;
	const alllowedHazardTypes = useSelector((state) => state.config.allowedHazardTypes);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const tornadoes = useSelector((state) => state.hazard.tornadoes);
	const earthquakes = useSelector((state) => state.hazard.earthquakes);
	const hurricanes = useSelector((state) => state.hazard.hurricanes);
	const tsunamis = useSelector((state) => state.hazard.tsunamis);
	const floods = useSelector((state) => state.hazard.floods);

	const dispatch = useDispatch();
	const listHazards = (hazardType, limit, offset) => dispatch(fetchHazards(hazardType, limit, offset));

	const [hazards, setHazards] = useState([]);

	useEffect(() => {
		alllowedHazardTypes.map((hazardType) => {
			listHazards(globalConfig, hazardType);
		});
	},[]);

	// hazard dropdown
	useEffect(() => {
		let hazardType = Object.values(datawolfFormState.selectedHazardType)[0];
		if (hazardType === "earthquakes"){
			setHazards(earthquakes);
		}
		else if (hazardType === "tornadoes"){
			setHazards(tornadoes);
		}
		else if (hazardType === "tsunamis"){
			setHazards(tsunamis);
		}
		else if (hazardType === "floods"){
			setHazards(floods);
		}
		else if (hazardType === "hurricanes"){
			setHazards(hurricanes);
		}
	}, [datawolfFormState.selectedHazardType]);

	return (
		<IncoreSelectBox labelId="label" id="select" variant="outlined"
						 onChange={(e) => {
							 let currentVal = e.target.value;
							 setDatawolfFormState(prevState =>
								 ({...prevState, [datawolfParamConfigItem.parameters.variableName]: {[datawolfParamConfigItem.paramId]: currentVal}}));
						 }}
						 value={datawolfFormState[datawolfParamConfigItem.parameters.variableName][datawolfParamConfigItem.paramId] ?? ""}>
			{
				hazards.map((option) => {
					return (
						<IncoreMenuItem value={option["id"]} key={option["id"]}>{option["name"]}</IncoreMenuItem>
					);
				})
			}
		</IncoreSelectBox>
	);
}
