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

const cardColors = {
	"white": "d16539",
	"blue": "5585b0",
	"black": "583675",
	"red": "ae1d27",
	"green": "356d40",
	"gold": "754d25",
	"colorless": "707570",
	"none": "692d51"
};

// Updates the cursor to a pointer when hovering over points of interest that are clickable
function changeCursor(e) {
	map.getCanvas().style.cursor = '';
	if (e.features[0].properties.clickable) {
		map.getCanvas().style.cursor = "pointer";
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

// Creates a MapboxGL popup object based on a clickable layer but in the style of a MTG card
function createCardPopup(e) {
	if (e.features[0].properties.clickable) {
		var popupContent = `
		<div id="card">
			<div id="card-body" class="card" style="background-color: #${(cardColors[e.features[0].properties.cardcolor] || "692d51")};">
			<div id="top-margin" style="height: 2.15mm;"/></div>
			<h2 id="subtitle" class="card">${(e.features[0].properties.subtitle || "AN UNKNOWN PLACE,")}</h2>
			<h1 id="title" class="card">${(e.features[0].properties.title || "Lost to Time")}</h1>
			<img class="card-art" src="${(e.features[0].properties.image || "https://cdnb.artstation.com/p/assets/images/images/018/234/967/large/victor-hugo-harmatiuk-tryhard-enviroment.jpg?1558657312")}"/>
			<div id="lore" class="lore">${(e.features[0].properties.lore || "The secrets of this place have not yet been revealed.") + (e.features[0].properties.lore2 || "")}</div>
			</div>
			<div style="background-color: black; width: 63mm; height: 6mm; border-radius: 0 0 2.75mm 2.75mm; margins: 0;"></div>
		</div>`
		// add the popup to the map
		var popup = new mapboxgl.Popup({offset: [0.0, -36.0]}).setLngLat(e.features[0].geometry.coordinates.slice()).setHTML(popupContent).addTo(map);
	}
}