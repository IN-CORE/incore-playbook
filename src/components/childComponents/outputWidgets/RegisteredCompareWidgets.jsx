import React from "react";
import BldgMCS from "./BldgMCS";
import BldgFunctionality from "./BldgFunctionality";
import CGE from "./CGE";
import PopDislocation from "./PopDislocation";
import ResilienceMetrics from "./ResilienceMetrics";
import SectorShocks from "./SectorShocks";
import BldgDamageCompare from "./BldgDamageCompare";
import HHSCompare from "./HHSCompare";

export const registeredCompareWidgets = {
	BldgDamage: <BldgDamageCompare />,
	BldgMCS: <BldgMCS />,
	BldgFunctionality: <BldgFunctionality />,
	// eslint-disable-next-line react/jsx-pascal-case
	CGE: <CGE />,
	PopDislocation: <PopDislocation />,
	ResilienceMetrics: <ResilienceMetrics />,
	// eslint-disable-next-line react/jsx-pascal-case
	HHS: <HHSCompare />,
	SectorShocks: <SectorShocks />
};
