// ---------------- Mapbox GL stuff ----------------
// MapboxGLButtonControl is used to add the reset view "home" button

// Mapbox public access token
mapboxgl.accessToken = "pk.eyJ1IjoibmVvbmZhYmxlIiwiYSI6ImNsMmY3Z3BkYjAxZnMzbm50YjV0dGdqd28ifQ.FsRTdMO04axLM8lE10K7Hw";

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

// Updates the cursor to a pointer when hovering over points of interest that are clickable
function changeCursor(e) {
	map.getCanvas()
		.style.cursor = "";
	if (e.features[0].properties.clickable) {
		map.getCanvas()
			.style.cursor = "pointer";
	}
}

// Map controls and event boilerplate
function addInteractivity(map) {
	// Be kind and don't remove the attribution.
	map.addControl(new mapboxgl.FullscreenControl());
	map.addControl(new mapboxgl.NavigationControl());
	map.addControl(new MapboxGLButtonControl({ className: "mapbox-gl-home", title: "Reset view", eventHandler: function(e) {map.flyTo({center: defaultCenter, zoom: defaultZoom, pitch: defaultPitch, bearing: 0, speed: 0.5 });} } , "top-right"));
	map.addControl(new mapboxgl.AttributionControl({customAttribution: "<a href='https://map.neonfable.com' target='_blank' rel='noopener noreferrer'> <img src='assets/icons/neonfable.svg' alt='Neon Fable logo' class='inline-icon'> Crafted by <b>Neon Fable</b>"}));

	map.on("click", "points-of-interest", createCardPopup);
	map.on("mouseenter", "points-of-interest", changeCursor);
	map.on('mouseleave', "points-of-interest", function () { map.getCanvas().style.cursor = ''; });
}

// ---------------- Card-style popups ----------------
const cardColors = {
	white: "d16539",
	blue: "5585b0",
	black: "583675",
	red: "ae1d27",
	green: "356d40",
	gold: "754d25",
	colorless: "707570",
	none: "692d51",
};

// Creates a MapboxGL popup object based on a clickable layer but in the style of a MTG card
function createCardPopup(e) {
	if (e.features[0].properties.clickable) {
		var cardArt = e.features[0].properties.image;
		var artistName = e.features[0].properties.artist;
		var artistLink = e.features[0].properties.attribution;

		// Set default image & attribution if any one of these three are missing
		if (!e.features[0].properties.image || !e.features[0].properties.attribution || !e.features[0].properties.artist) {
			cardArt = "https://cdnb.artstation.com/p/assets/images/images/024/068/475/large/ian-sannar-untitled-2.jpg?1581228248";
			artistName = "Fawn";
			artistLink = "https://www.artstation.com/innoxenxe";
		}

		var popupContent = `
		<div id="card">
			<div id="card-body" class="card" style="background-color: #${cardColors[e.features[0].properties.cardcolor] || "692d51"};">
			<div id="top-margin" style="height: 2.15mm;"/></div>
			<h2 id="subtitle" class="card">${e.features[0].properties.subtitle || "AN UNKNOWN PLACE,"}</h2>
			<h1 id="title" class="card">${e.features[0].properties.title || "Lost to Time"}</h1>
			<img class="card-art" src="${cardArt}"/>
			<div id="lore" class="lore">${(e.features[0].properties.lore || "The secrets of this place have not yet been revealed.") + (e.features[0].properties.lore2 || "")}</div>
			</div>
			<div class="card-art-attr"><a href="${artistLink}" target='_blank' rel='noopener noreferrer' class="card-link">🖌 ${artistName}</a></div>
		</div>`;
		// AnimatedPopup courtesy of https://nagix.github.io/mapbox-gl-animated-popup/
		var popup = new AnimatedPopup({
				offset: 25,
				openingAnimation: {
					duration: 150,
					easing: "easeOutCubic",
					transform: "scale",
				},
				closingAnimation: {
					duration: 300,
					easing: "easeInCubic",
					transform: "scale",
				},
				anchor: "center",
			})
			.setLngLat(e.features[0].geometry.coordinates.slice())
			.setHTML(popupContent)
			.addTo(map);
	}
}