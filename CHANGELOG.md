# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).


## [Unreleased]

### Fixed
- Joplin Pole and Substation missing map pin [#436](https://github.com/IN-CORE/incore-playbook/issues/436)


## [0.6.3] - 2024-03-27

### Fixed
- Bugfix on comparison map highlight

### Added
- Add retrofit layer in result widgets [#431](https://github.com/IN-CORE/incore-playbook/issues/431)

## [0.6.2] - 2024-03-27

### Added
- Highlight selected building on the map [#304](https://github.com/IN-CORE/incore-playbook/issues/304)

### Fixed
- Adjust the z-index of the attribute table [#410](https://github.com/IN-CORE/incore-playbook/issues/410)
- Fix Retrofit Strategy Selection to be required [#416](https://github.com/IN-CORE/incore-playbook/issues/416)
- Refactor check on duplicate conditions [#421](https://github.com/IN-CORE/incore-playbook/issues/421)
- Highlight the difference row in tables [#422](https://github.com/IN-CORE/incore-playbook/issues/422)

## [0.6.1] - 2024-03-22

### Added
- Added legend option for maps in the playbook [#259](https://github.com/IN-CORE/incore-playbook/issues/259)
- Add retrofit condition summary button next to the retrofit strategy file in step 2-4[#386](https://github.com/IN-CORE/incore-playbook/issues/386)
- Substation damage comparison [#390](https://github.com/IN-CORE/incore-playbook/issues/390)
- Clear button to clear comparison selection [#393](https://github.com/IN-CORE/incore-playbook/issues/393)
-
### Fixed
- Remove the extra % sign from population dislocation comparison table [#362](https://github.com/IN-CORE/incore-playbook/issues/362)
- Change default basemap and change height of the "Create Hazard" map [#359](https://github.com/IN-CORE/incore-playbook/issues/359)
- Sorted map attributes so there are in the same order during the comparison [#348](https://github.com/IN-CORE/incore-playbook/issues/348)
- Wrong naming of the component ViewResults [#352](https://github.com/IN-CORE/incore-playbook/issues/352)
- Make max damage state consistent with table headers [#374](https://github.com/IN-CORE/incore-playbook/issues/374)
- Comparison key bug [#375](https://github.com/IN-CORE/incore-playbook/issues/375)
- Compare selection style [#357](https://github.com/IN-CORE/incore-playbook/issues/357)
- Fix damage comparison table alignment bug [#358](https://github.com/IN-CORE/incore-playbook/issues/358)
- Fix the yaxis label for the CGE bar chart [#384](https://github.com/IN-CORE/incore-playbook/issues/384)
- Fix table to show null values for absent keys in JSON [#373](https://github.com/IN-CORE/incore-playbook/issues/373)
- Fix some fields are not cleared after submission [#377](https://github.com/IN-CORE/incore-playbook/issues/377)
- Fix the pagination and sorting for View Hazard table [#213](https://github.com/IN-CORE/incore-playbook/issues/213)

### Changed
- Remove screenshot button on comparison interface [#364](https://github.com/IN-CORE/incore-playbook/issues/364)
- Population dislocation layer [#361](https://github.com/IN-CORE/incore-playbook/issues/361)
- Compare interface clean up [#310](https://github.com/IN-CORE/incore-playbook/issues/310)
- Support custom timesteps for HHRS [#258](https://github.com/IN-CORE/incore-playbook/issues/258)

## [0.6.0] - 2024-03-06

### Added
- Adding % (# of building) to table of building damage output. [#261](https://github.com/IN-CORE/incore-playbook/issues/261)
- Add click on map to view more details for a building on output widgets [#284](https://github.com/IN-CORE/incore-playbook/issues/284)
- Github action to publish @incore/incore-playbook to Github package registry [#283](https://github.com/IN-CORE/incore-playbook/issues/283)
- Add HHRS bar chart comparison components [#290](https://github.com/IN-CORE/incore-playbook/issues/290)
- Add MCS and Building Functionality table and bar chart comparison [#308](https://github.com/IN-CORE/incore-playbook/issues/308)
- Add Map comparison and Pole Damage comparison components [#288](https://github.com/IN-CORE/incore-playbook/issues/288)
- Add Sector Shock Bar Chart Comparison [#305](https://github.com/IN-CORE/incore-playbook/issues/305)
- Add Population Dislocation comparison tables [#292](https://github.com/IN-CORE/incore-playbook/issues/292)
- Add Resilience Metrics comparisons [#322](https://github.com/IN-CORE/incore-playbook/issues/322)
- Building Damage Comparison Table [#307](https://github.com/IN-CORE/incore-playbook/issues/307)
- Refactor compare selection improvement [#298](https://github.com/IN-CORE/incore-playbook/issues/298)
- Allow retrofit strategy plan as input [#313](https://github.com/IN-CORE/incore-playbook/issues/313)
- Add Marker to the selected building. [#304](https://github.com/IN-CORE/incore-playbook/issues/304)
- Add Table Overlay to the map to display building information. [#303](https://github.com/IN-CORE/incore-playbook/issues/303)
- Add map component to all the compare widgets that have maps [#317](https://github.com/IN-CORE/incore-playbook/issues/317)
- Integrate click feature into map compare component [#320](https://github.com/IN-CORE/incore-playbook/issues/320)
- Added pre-commit for linting and formatting [#302](https://github.com/IN-CORE/incore-playbook/issues/302)
- Added Retrofit Strategy Builder [#276](https://github.com/IN-CORE/incore-playbook/issues/276)

### Fixed
- Typos in hurricane creation form [#248](https://github.com/IN-CORE/incore-playbook/issues/248)
- Default mapping bounding box coordinates need to flip order [#272](https://github.com/IN-CORE/incore-playbook/issues/272)
- Update hazard previewing due to model change [#269](https://github.com/IN-CORE/incore-playbook/issues/269)
- Fix percentage calculation [#287](https://github.com/IN-CORE/incore-playbook/issues/287)
- Fix building damage stacked barchart bug [#332](https://github.com/IN-CORE/incore-playbook/issues/332)

### Changed
- Replaced Node-Sass with Sass for better platfrom reliablility [#275](https://github.com/IN-CORE/incore-playbook/issues/275)
- Update the ResultTable to use keys dynamically for the FEMA table headers [#285](https://github.com/IN-CORE/incore-playbook/issues/285)
- Increase the max zoom level for the map [#278](https://github.com/IN-CORE/incore-playbook/issues/278)
- Map config's geoserver style changed to general name [#328](https://github.com/IN-CORE/incore-playbook/issues/328)
- Retrofit strategy should be optional in step 3-4 [#349](https://github.com/IN-CORE/incore-playbook/issues/349)
- Added Satellite imagery layer to the map [#260](https://github.com/IN-CORE/incore-playbook/issues/260)
- Changed the dropdown component in step 3-4. [#214](https://github.com/IN-CORE/incore-playbook/issues/214)

## [0.5.8] - 2023-04-05

### Fixed

- Fix the login component CSS to correctly display elements side by side.

## [0.5.7] - 2023-04-05

### Fixed

- Multiple layer hazards such as hurricane, tsunami and flood would need to have each layer style correspondingly. [#250](https://github.com/IN-CORE/incore-playbook/issues/250)

## [0.5.6] - 2023-04-03

### Fixed

- Remove hardfixed config

## [0.5.5] - 2023-03-31

### Changed

- Galveston CGE region label i vs m different than SLC [#239](https://github.com/IN-CORE/incore-playbook/issues/239)

## [0.5.4] - 2023-03-27

### Fixed

- View created hurricane tab content not showing [#226](https://github.com/IN-CORE/incore-playbook/issues/226)
- Fixed wrong layer group name [#211](https://github.com/IN-CORE/incore-playbook/issues/211)
- Reset password link and register new user link [#221](https://github.com/IN-CORE/incore-playbook/issues/221)
- Fixed the function sorting on roles [#219](https://github.com/IN-CORE/incore-playbook/issues/219)
- Map bounding box need to flip X_max with X_min [#235](https://github.com/IN-CORE/incore-playbook/issues/235)

### Changed

- Changed the order of layers on community app [#212](https://github.com/IN-CORE/incore-playbook/issues/212)
- Changed the buttons from texts to icons (change, save, cancel) for roles [#219](https://github.com/IN-CORE/incore-playbook/issues/219)
- Allow overwrite of different incore dataset types [#225](https://github.com/IN-CORE/incore-playbook/issues/225)
- Unified the date formats on tables in Step 2-4 [#232](https://github.com/IN-CORE/incore-playbook/issues/232)
- Add geoserver style name to config file and connect to redux [#231](https://github.com/IN-CORE/incore-playbook/issues/231)

## [0.5.3] - 2023-03-20

### Added

- Added grouping logic in capital shock's bar chart and added colors [#201](https://github.com/IN-CORE/incore-playbook/issues/201)

### Changed

- Add title and description to form validaiton in step 3-4 [#191](https://github.com/IN-CORE/incore-playbook/issues/191)
- UI Changes according to several feedbacks from stress test session [#195](https://github.com/IN-CORE/incore-playbook/issues/195)
- Change sorting logic for step 3-3 to view created hazards first [#197](https://github.com/IN-CORE/incore-playbook/issues/197)
- Removed linking for steps from static html pages [#198](https://github.com/IN-CORE/incore-playbook/issues/198)
- Add validation and styling for coordinates entered in Step 3-3 for tornado and earthquake [#189](https://github.com/IN-CORE/incore-playbook/issues/189)
- Add column to display link to download data and reordered columns [#196](https://github.com/IN-CORE/incore-playbook/issues/196)
- Fixed bounding box error jump to random number when typing weird value [#207](https://github.com/IN-CORE/incore-playbook/pull/207)

## [0.5.2] - 2023-03-15

### Changed

- Check datawolf dataset file descriptor lengths to decide if render widget or not

## [0.5.1] - 2023-03-15

### Added

- Pagination of list dataset and hazard [#70](https://github.com/IN-CORE/incore-playbook/issues/70)
- Toggle switch for showing all datawolf flows [#74](https://github.com/IN-CORE/incore-playbook/issues/74)
- Move created dataset and hazard into a common testbed space [#87](https://github.com/IN-CORE/incore-playbook/issues/87)
- Set Time intervals to periodically requesting datawolf execution status [#60](https://github.com/IN-CORE/incore-playbook/issues/60)
- Allow user to set document uri in each of the step [#81](https://github.com/IN-CORE/incore-playbook/issues/81)
- Github action to publish new version to npm registry [#72](https://github.com/IN-CORE/incore-playbook/issues/72)
- Download Inventories at step 2-3 [#112](https://github.com/IN-CORE/incore-playbook/issues/112)
- Check user groups to only allow user belongs to certain testbed to login [#119](https://github.com/IN-CORE/incore-playbook/issues/119)
- HHRS Bar Chart [#95](https://github.com/IN-CORE/incore-playbook/issues/95)
- A new "Created By" column in step 3-4 to track user executions. Fixed datetime format display in the table. [#120](https://github.com/IN-CORE/incore-playbook/issues/120)
- HHRS Bar Chart [#95](https://github.com/IN-CORE/incore-playbook/issues/95)
- Pagination to view datawolf execution [#151](https://github.com/IN-CORE/incore-playbook/issues/151)
- Admins can see datawolf logs [#147](https://github.com/IN-CORE/incore-playbook/issues/147)
- Barchart for sector shocks [#157](https://github.com/IN-CORE/incore-playbook/issues/157)
- Download pyincore CSV output for each output widget [#172](https://github.com/IN-CORE/incore-playbook/issues/172)

### Changed

- Renamed master branch to main [#28](https://github.com/IN-CORE/incore-playbook/issues/28)
- Made data upload button on and off [#73](https://github.com/IN-CORE/incore-playbook/issues/73)
- Display multiple layers of hazard [#63](https://github.com/IN-CORE/incore-playbook/issues/63)
- Update the layout of document link and each static steps [#109](https://github.com/IN-CORE/incore-playbook/issues/109)
- UI layout change for step 3-3 creating hazards [#96](https://github.com/IN-CORE/incore-playbook/issues/96)
- Step 3-4 datawolf result link clickable logic to update dynamically based on requirements [#61](https://github.com/IN-CORE/incore-playbook/issues/61)
- Change the creator of workflows dynamically based on the current logged in user. [#124](https://github.com/IN-CORE/incore-playbook/issues/124)
- Disable Interdependency widget [#125](https://github.com/IN-CORE/incore-playbook/issues/125)
- UI Changes to navigational sidebar [#141](https://github.com/IN-CORE/incore-playbook/pull/141)

### Fixed

- First time load map layers at step 3-4 "view results" does not show correctly sometimes [#97](https://github.com/IN-CORE/incore-playbook/issues/97)
- Properly check the remote hostname [#104](https://github.com/IN-CORE/incore-playbook/issues/104)
- Logout do not need to call GET in steps [#93](https://github.com/IN-CORE/incore-playbook/issues/93)
- NaN in population dislocation widget [#126](https://github.com/IN-CORE/incore-playbook/issues/126)
- Time interval doesn't work when switching tabs in step 3-4 [#117](https://github.com/IN-CORE/incore-playbook/issues/117)
- User role remains after cancel button clicked [#133](https://github.com/IN-CORE/incore-playbook/issues/133)
- Heatmap display issue in population dislocation view [#137](https://github.com/IN-CORE/incore-playbook/issues/137)
- fix status bar appearance for a smaller screen/ different browser [#139](https://github.com/IN-CORE/incore-playbook/issues/139)
- Pole damage datawolf id for population disloation [#145](https://github.com/IN-CORE/incore-playbook/issues/145)
- Map loading flashes sometime [#140](https://github.com/IN-CORE/incore-playbook/issues/140)
- Document link reset to empty [#161](https://github.com/IN-CORE/incore-playbook/issues/161)
- Occasional interval not working issue with added cleanup [#163](https://github.com/IN-CORE/incore-playbook/issues/163)
- UI tweaks such as tab indicator color, select box, cge descriptions and etc [#150](https://github.com/IN-CORE/incore-playbook/issues/150)
- Clear all layers shouldn't prevent new drawing [#175](https://github.com/IN-CORE/incore-playbook/issues/175)

## [0.3.0] - 2021-11-16

### Added

- Description component for CGE data [#2](https://github.com/IN-CORE/incore-playbook/issues/2)
- CGE and Population Dislocation table components [#1](https://github.com/IN-CORE/incore-playbook/issues/1)
- Connect "run analysis" with datawolf workflow [#7](https://github.com/IN-CORE/incore-playbook/issues/7)
- Github action to auto build [#4](https://github.com/IN-CORE/incore-playbook/issues/4)
- Component to display resilience metrics [#14](https://github.com/IN-CORE/incore-playbook/issues/14)
- Enable Download of CGE and Population Dislocation outputs [#16](https://github.com/IN-CORE/incore-playbook/issues/16)

### Fixed

- Fix ESlint warnings and errors [#10](https://github.com/IN-CORE/incore-playbook/issues/10)

### Changed

- CGE and Population Dislocation table with additional column and rows [#13](https://github.com/IN-CORE/incore-playbook/issues/13)

## [0.2.0] - 2021-04-22

### Added

- Included HTML content for each step of the playbook on the steps pages. Enabled all the menu items [INCORE1-1045](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1045)
- Introduction HTML explaining each section of the playbook steps [INCORE1-1090](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1090)
- Ability to upload datasets related to EPF and interdependency [INCORE1-1119](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1119)
- Visualization for Monte Carlo Simulation analysis [INCORE1-1126](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1126)
- Visualization for EPF damage [INCORE1-1050](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1050)
- Visualization for Building Functionality [INCORE1-1049](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1049)
- Visualization for Building Functionality without Interdependency [INCORE1-1129](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1129)

### Updated

- Results View screen to include all the analyses related to Building Functionality [INCORE1-1091](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1091)
- Improvements to "Create Datasets" screens to support other datatypes [INCORE1-1074](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1074)
- "Run Analysis" functinality to use the new datawold workflow that runs all the analyses related to Building Functionality [INCORE1-1100](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1100)
- Margins and whitespaces to make the content more compact and scale better to screen sizes [INCORE1-1094](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1094)

### Fixed

- Bug related to logout not clearing the cookie when the cookie is set from homepage login [INCORE1-1114](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1114)

## [0.1.0] - 2020-11-11

### Added

- Initial setups for the repository [INCORE1-804](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-804)
- Create login component [INCORE1-812](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-812)
- Add playbook app layout with header, footer and sidebar [INCORE1-813](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-813)
- Get attributes from geoserver and create attribute table component [INCORE1-814](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-814)
- Create team page component [INCORE1-817](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-817)
- Create step status component [INCORE1-818](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-818)
- Create step description component [INCORE1-819](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-819)
- Upgrade react and other packages with warnings [INCORE1-823](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-823)
- Create run analysis page component [INCORE1-824](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-824)
- Create community hazard component [INCORE1-827](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-827)
- Update dockerfile and routes [INCORE1-828](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-828)
- Create building environment page [INCORE1-839](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-839)
- Create incore playbook menus [INCORE1-840](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-840)
- Analysis component [INCORE1-848](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-848)
- Stacked barchart component for displaying grouped damage results [INCORE1-855](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-855)
- Adjust the CSS styles [INCORE1-856](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-856)
- Adjust the styles of breadcrumbs, menu items and etc [INCORE1-858](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-858)
