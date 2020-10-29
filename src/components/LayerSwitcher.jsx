import LayerSwitcher from "ol-layerswitcher/src/ol-layerswitcher";

class CustomLayerSwitcher extends LayerSwitcher {
	constructor(options) {
		const { onShow, onHide, ...originalOptions } = options;
		super(originalOptions);
		this.onShow = onShow;
		this.onHide = onHide;
	}

	showPanel() {
		super.showPanel();
		if (this.onShow) {
			this.onShow();
		}
	}

	hidePanel() {
		super.hidePanel();
		if (this.onHide) {
			this.onHide();
		}
	}
}

export default CustomLayerSwitcher;
