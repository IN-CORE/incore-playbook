import React from "react";
import PoleDamageCompare from "./PoleDamageCompare";
import CGECompare from "./CGECompare";
import PopDislocationCompare from "./PopDislocationCompare";
import SubstationDamageCompare from "./SubstationDamageCompare";
import SectorShocksCompare from "./SectorShocksCompare";
import BldgDamageCompare from "./BldgDamageCompare";
import HHSCompare from "./HHSCompare";
import BldgMCSCompare from "./BldgMCSCompare";
import BldgFunctionalityCompare from "./BldgFunctionalityCompare";
import ResilienceMetricsCompare from "./ResilienceMetricsCompare";

export const registeredCompareWidgets = {
	BldgDamage: <BldgDamageCompare />,
	BldgMCS: <BldgMCSCompare />,
	BldgFunctionality: <BldgFunctionalityCompare />,
	PoleDamage: <PoleDamageCompare />,
	// eslint-disable-next-line react/jsx-pascal-case
	CGE: <CGECompare />,
	PopDislocation: <PopDislocationCompare />,
	ResilienceMetrics: <ResilienceMetricsCompare />,
	SubstationDamage: <SubstationDamageCompare />,
	// eslint-disable-next-line react/jsx-pascal-case
	HHS: <HHSCompare />,
	SectorShocks: <SectorShocksCompare />,
};
