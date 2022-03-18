import * as React from "react";
import {Map as OLMap, View} from "ol";
import {defaults as defaultControls} from "ol/control";
import LayerSwitcher from "./LayerSwitcher";

export const MapContext = React.createContext({});

class Map extends React.Component {
	fallbackContainer = React.createRef();

	mapContainer = React.createRef();

	static defaultProps = {
		children: null,
		id: "",
		className: "",
		projection: "EPSG:3857",
		center: [0, 0],
		zoom: 7,
		minZoom: 0,
		maxZoom: 14,
		extent: undefined,
		controls: [],
		layers: [],
		layerSwitcherOptions: null,
		updateMap: null,
		events: null
	};

	componentDidMount() {
		const {
			projection,
			center,
			zoom,
			minZoom,
			maxZoom,
			extent,
			controls,
			layers,
			layerSwitcherOptions,
			updateMap,
			events
		} = this.props;

		this.map = new OLMap({
			target: this.mapContainer.current || this.fallbackContainer.current,
			view: new View({
				projection,
				center,
				zoom,
				minZoom,
				maxZoom,
				extent
			}),
			layers,
			controls: defaultControls().extend(controls)
		});

		if (events) {
			Object.entries(events).forEach(([event, handler]) => {
				this.map.on(event, handler);
			});
		}

		if (layerSwitcherOptions) {
			const layerSwitcher = new LayerSwitcher(layerSwitcherOptions);
			this.map.addControl(layerSwitcher);
		}

		if (updateMap) {
			updateMap(this.map);
		}

		this.forceUpdate();
	}

	map;

	renderChildren = (children) => {
		return React.Children.map(children, (child) => {
			if (!child || !child.props) {
				return child;
			}

			const nestedChildren = child.props.children ?
				this.renderChildren(child.props.children) :
				[];

			if (child.props.mapcontainer) {
				return React.cloneElement(
					child,
					{
						ref: this.mapContainer
					},
					[...nestedChildren]
				);
			}

			if (nestedChildren.length) {
				return React.cloneElement(child, {children: nestedChildren});
			}
			return child;
		});
	};

	render() {
		const {children, id, className} = this.props;

		const data = {
			map: this.map
		};

		return (
			<div
				id={id}
				className={`ol-map ${className}`}
				ref={this.fallbackContainer}
			>
				<MapContext.Provider value={data}>
					{this.renderChildren(children)}
				</MapContext.Provider>
			</div>
		);
	}
}

export default Map;
