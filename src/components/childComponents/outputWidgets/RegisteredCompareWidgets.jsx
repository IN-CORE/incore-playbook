import React from "react";
import PoleDamageCompare from "./PoleDamageCompare";
import BldgMCS from "./BldgMCS";
import BldgFunctionality from "./BldgFunctionality";
import CGECompare from "./CGECompare";
import PopDislocationCompare from "./PopDislocationCompare";
import ResilienceMetrics from "./ResilienceMetrics";
import SubstationDamage from "./SubstationDamage";
import SectorShocksCompare from "./SectorShocksCompare";
import BldgDamageCompare from "./BldgDamageCompare";
import HHSCompare from "./HHSCompare";

export const registeredCompareWidgets = {
	BldgDamage: <BldgDamageCompare />,
	PoleDamage: <PoleDamageCompare />,
	BldgMCS: <BldgMCS />,
	BldgFunctionality: <BldgFunctionality />,
	// eslint-disable-next-line react/jsx-pascal-case
	CGE: <CGECompare />,
	PopDislocation: <PopDislocationCompare />,
	ResilienceMetrics: <ResilienceMetrics />,
	SubstationDamage: <SubstationDamage />,
	// eslint-disable-next-line react/jsx-pascal-case
	HHS: <HHSCompare />,
	SectorShocks: <SectorShocksCompare />
};
