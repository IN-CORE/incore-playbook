import React, { useEffect } from "react";
import { IncoreMenuItem, IncoreSelectBox } from "../../styledComponents/IncoreSelect";
import { useDispatch, useSelector } from "react-redux";
import { fetchDatasets } from "../../../actions/datasets";

export default function Buildings(props) {
	const { setDatawolfFormState, datawolfFormState, datawolfParamConfigItem } = props;

	const dispatch = useDispatch();
	const listDatasets = (config, limit, offset, type) => dispatch(fetchDatasets(config, limit, offset, type));
	const globalConfig = useSelector((state) => state.config.globalConfig);
	const buildings = useSelector((state) => state.dataset.buildings);

	useEffect(() => {
		globalConfig.inputDatasetTypes.buildings.map((inputDatasetType) => {
			listDatasets(globalConfig, inputDatasetType["num"], 0, inputDatasetType["type"]);
		});
	}, []);

	// selectedBldgId: {
	// 	"de4649e7-be6b-46ea-f2a8-86e0353b8b61": "6335b2aeac33a63950a9e0b7",
	// 	"4f0c9d2f-e457-4c34-b319-65ccd71131c6": "6335b2aeac33a63950a9e0b7",
	// 	"685f8d28-2d18-43ee-c835-bccb4b20e303": "6335b2aeac33a63950a9e0b7",
	// 	"b1828d34-8f96-454a-d083-9f1a5a0b0ef4": "6335b2aeac33a63950a9e0b7",
	// 	"1a15df03-c590-43ba-bb29-0aa2e86dd4ae": "6335b2aeac33a63950a9e0b7"
	// }
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
			{buildings.map((option) => {
				return (
					<IncoreMenuItem value={option["id"]} key={option["id"]}>
						{option["title"]}
					</IncoreMenuItem>
				);
			})}
		</IncoreSelectBox>
	);
}
