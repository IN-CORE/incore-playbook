import React, { useEffect, useState } from "react";
import {
	IncoreMenuItem,
	IncoreSelectBox,
} from "../../styledComponents/IncoreSelect";
import { useDispatch, useSelector } from "react-redux";
import { fetchDatasets } from "../../../actions/datasets";

export default function RetrofitStrategies(props) {
	const {
		setDatawolfFormState,
		datawolfFormState,
		datawolfParamConfigItem,
		clearWidget,
	} = props;

	const dispatch = useDispatch();
	const listDatasets = (config, limit, offset, type) =>
		dispatch(fetchDatasets(config, limit, offset, type));
	const globalConfig = useSelector((state) => state.config.globalConfig);
	const retrofitStrategies = useSelector(
		(state) => state.dataset.retrofitStrategies,
	);

	const [selectedRetrofitStrategy, setSelectedRetrofitStrategy] =
		useState(null);

	useEffect(() => {
		globalConfig.inputDatasetTypes.retrofitStrategies.map(
			(inputDatasetType) => {
				listDatasets(
					globalConfig,
					inputDatasetType["num"],
					0,
					inputDatasetType["type"],
				);
			},
		);
	}, []);

	// clear IncoreSelectBox
	useEffect(() => {
		if (clearWidget) setSelectedRetrofitStrategy(null);
	}, [clearWidget]);

	return (
		<IncoreSelectBox
			labelId="label"
			id="select"
			variant="outlined"
			value={selectedRetrofitStrategy}
			onChange={(e) => {
				let currentVal = e.target.value;
				setSelectedRetrofitStrategy(currentVal);
				if (currentVal === "not_retrofitted") currentVal = "";
				setDatawolfFormState((prevState) => {
					let mapState = {};
					datawolfParamConfigItem.parametersMap.map((pm) => {
						mapState[pm.paramId] = currentVal;
					});
					return {
						...prevState,
						[datawolfParamConfigItem.variableName]: mapState,
					};
				});
			}}
		>
			<IncoreMenuItem value="not_retrofitted" key="not_retrofitted">
				Not Retrofitted
			</IncoreMenuItem>
			{retrofitStrategies.map((option) => {
				return (
					<IncoreMenuItem value={option["id"]} key={option["id"]}>
						{option["title"]}
					</IncoreMenuItem>
				);
			})}
		</IncoreSelectBox>
	);
}
