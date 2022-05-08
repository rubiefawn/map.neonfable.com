// ---------------- Map-specific Configuration ----------------

mapCenter = [0, -10];
defaultZoom = 2;

// Mapbox public access token
// This can be found at https://account.mapbox.com/ under Access Tokens, or in the Share menu for your Mapbox map style
mapboxgl.accessToken = "pk.eyJ1IjoibmVvbmZhYmxlIiwiYSI6ImNsMmY3Z3BkYjAxZnMzbm50YjV0dGdqd28ifQ.FsRTdMO04axLM8lE10K7Hw";

// Create a new MapboxGL map, change its default settings
var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/neonfable/cl2wdvd9r001915okcv3tef2g",
	center: mapCenter,
	zoom: defaultZoom,
	maxZoom: 6.0,
	maxPitch: 70,
	pitch: 15,
	maxBounds: [[-3600,-80],[3600,80]]
});

// Add various controls to the map, including a fullscreen button, navigation controls, and attribution.
// Be kind and don't remove the attribution.
map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new MapboxGLButtonControl({ className: "mapbox-gl-home", title: "Reset view", eventHandler: function(e) {map.flyTo({center: mapCenter, zoom: 2, pitch: 15, bearing: 0, speed: 0.5 });} } , "top-right"));
map.addControl(new mapboxgl.AttributionControl({customAttribution: "<a href='https://map.neonfable.com' target='_blank' rel='noopener noreferrer'> <img src='assets/icons/neonfable.svg' alt='Neon Fable logo' class='inline-icon'> Crafted by <b>Neon Fable</b>"}));

// ---------------- JavaScript Events ----------------

// enable click events for clickable layers
map.on("click", "points-of-interest", createCardPopup);

// Change the cursor when it enters and leaves clickable layers
map.on("mouseenter", "points-of-interest", changeCursor);
map.on('mouseleave', "points-of-interest", function () { map.getCanvas().style.cursor = ''; });