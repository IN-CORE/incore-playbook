import React, { useEffect, useState } from "react";
import { IncoreMenuItem, IncoreSelectBox } from "../../styledComponents/IncoreSelect";
import { useDispatch, useSelector } from "react-redux";
import { fetchHazards } from "../../../actions/hazards";
import { getHazardTypePlural } from "../../../utils/common";

export default function Hazards(props) {
	const { setDatawolfFormState, datawolfFormState, datawolfParamConfigItem } = props;
	const alllowedHazardTypes = useSelector((state) => state.config.allowedHazardTypes);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	// pre-populate those; will be used in the dropdown line 34
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
			// limit set to 200, for future reference, might change
			listHazards(globalConfig, hazardType, 200);
		});
	}, []);

	// hazard dropdown
	useEffect(() => {
		if (datawolfFormState.selectedHazardType) {
			let hazardType = Object.values(datawolfFormState.selectedHazardType)[0];
			if (hazardType && hazardType !== "") {
				setHazards(eval(getHazardTypePlural(hazardType)));
			}
		}
	}, [datawolfFormState.selectedHazardType]);

	return (
		<IncoreSelectBox
			labelId="label"
			id="select"
			variant="outlined"
			onChange={(e) => {
				let currentVal = e.target.value;
				setDatawolfFormState((prevState) => {
					let mapState = {};
					datawolfParamConfigItem.parametersMap.map((pm) => {
						mapState[pm.paramId] = currentVal;
					});
					return { ...prevState, [datawolfParamConfigItem.variableName]: mapState };
				});
			}}
			// parameters belong to the same variable should have the same value; just pick one
			value={
				datawolfFormState[datawolfParamConfigItem.variableName][
					Object.keys(datawolfFormState[datawolfParamConfigItem.variableName])[0]
				] ?? ""
			}
		>
			{hazards.map((option) => {
				return (
					<IncoreMenuItem value={option["id"]} key={option["id"]}>
						{option["name"]}
					</IncoreMenuItem>
				);
			})}
		</IncoreSelectBox>
	);
}
