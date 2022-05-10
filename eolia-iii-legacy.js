// ---------------- Map-specific configuration ----------------

mapCenter = [0, -10];
defaultZoom = 2;

//old account access token
mapboxgl.accessToken = "pk.eyJ1IjoiaWFuc2FubmFyIiwiYSI6ImNrOHdnajF6MDB3YXQzbm1oMm95eWltaTMifQ.cv0Yq39pzSZ5dFMI0jC7BQ";

// Create a new MapboxGL map, change its default settings
var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/iansannar/ck9rz6wkb1yeu1ioz2iflnjaf",
	center: mapCenter,
	zoom: defaultZoom,
	maxZoom: 6.0,
	maxPitch: 70,
	pitch: 15,
	maxBounds: [[-360,-80],[360,80]]
});

// Add various controls to the map, including a fullscreen button, navigation controls, and attribution.
// Be kind and don't remove the attribution.
map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new MapboxGLButtonControl({ className: "mapbox-gl-home", title: "Reset view", eventHandler: function(e) {map.flyTo({center: mapCenter, zoom: 2, pitch: 15, bearing: 0, speed: 0.5 });} } , "top-right"));
map.addControl(new mapboxgl.AttributionControl({customAttribution: "<a href='https://map.neonfable.com' target='_blank' rel='noopener noreferrer'> <img src='assets/icons/neonfable.svg' alt='Neon Fable logo' class='inline-icon'> Crafted by <b>Neon Fable</b>"}));

// ---------------- Popup functions ----------------

function createPopup(e) {
	var popupContent = "<h1>" + (e.features[0].properties.name || "Missing Name!") + "</h1>";
	popupContent += "\n<h2>" + (e.features[0].properties.tagline || "") + "</h2>";
	popupContent += "<hr>" + (e.features[0].properties.lore || "? ? ?") + (e.features[0].properties.lore2 || "");

	new mapboxgl.Popup({ offset: [0.0, -36.0] }).setLngLat(e.features[0].geometry.coordinates.slice()).setHTML(popupContent).addTo(map);
}

// ---------------- JavaScript events ----------------

// enable click events for clickable layers
map.on("click", "points-of-interest", createPopup);
map.on("click", "cities", createPopup);

// Change the cursor when it enters and leaves clickable layers
map.on("mouseenter", "cities", function() { map.getCanvas().style.cursor = "pointer"; });
map.on("mouseenter", "points-of-interest", function() { map.getCanvas().style.cursor = "pointer"; });
map.on('mouseleave', "cities", function () { map.getCanvas().style.cursor = ''; });
map.on('mouseleave', "points-of-interest", function () { map.getCanvas().style.cursor = ''; });