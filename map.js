// ---------------- Utility Classes & Functions ----------------

class MapboxGLButtonControl {
	constructor({
		className = "",
		title = "",
		eventHandler = evtHndlr
	}) {
		this._className = className;
		this._title = title;
		this._eventHandler = eventHandler;
	}

	onAdd(map) {
		this._btn = document.createElement("button");
		this._btn.className = "mapboxgl-ctrl-icon" + " " + this._className;
		this._btn.type = "button";
		this._btn.title = this._title;
		this._btn.onclick = this._eventHandler;

		this._container = document.createElement("div");
		this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
		this._container.appendChild(this._btn);

		return this._container;
	}

	onRemove() {
		this._container.parentNode.removeChild(this._container);
		this._map = undefined;
	}
}

// Creates a MapboxGL popup object based on a clickable layer
function createPopup(e) {
	// if any of the values from the layer are null, the || operators will default it to the other non-null value on the right-hand side
	var popupContent = "<h1>" + (e.features[0].properties.name || "Missing Name!") + "</h1>";
	popupContent += "\n<h2>" + (e.features[0].properties.tagline || "") + "</h2>";
	popupContent += "<hr>" + (e.features[0].properties.lore || "? ? ?") + (e.features[0].properties.lore2 || "")

	// add the popup to the map
	new mapboxgl.Popup({offset: [0.0, -36.0]}).setLngLat(e.features[0].geometry.coordinates.slice()).setHTML(popupContent).addTo(map);
}