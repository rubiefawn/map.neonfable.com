// ---------------- Map-specific Configuration ----------------

mapCenter = [0, 0.08];
defaultZoom = 10.0;
minimumZoom = 9.0;

// Mapbox public access token
// This can be found at https://account.mapbox.com/ under Access Tokens, or in the Share menu for your Mapbox map style
mapboxgl.accessToken = "pk.eyJ1IjoiaWFuc2FubmFyIiwiYSI6ImNrOHdnajF6MDB3YXQzbm1oMm95eWltaTMifQ.cv0Yq39pzSZ5dFMI0jC7BQ";

// Create a new MapboxGL map, change its default settings
var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/iansannar/ckru7lulb4epc17pcn857p7wu",
	center: mapCenter,
	zoom: defaultZoom,
	maxZoom: 14.0,
	minZoom: minimumZoom,
	maxPitch: 68,
	maxBounds: [[-1.5,-1.5],[1.5,1.5]]
});

// Add various controls to the map, including a fullscreen button, navigation controls, and attribution.
// Be kind and don't remove the attribution.
map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new MapboxGLButtonControl({ className: "mapbox-gl-home", title: "Reset view", eventHandler: function(e) {map.flyTo({	center: mapCenter, zoom: defaultZoom, pitch: 0, bearing: 0, speed: 0.5 });} } , "top-right"));
map.addControl(new mapboxgl.AttributionControl({customAttribution: "<a href='https://www.fiverr.com/neonfable/make-you-an-interactive-map-for-your-roleplaying-game'> <img src='assets/icons/neonfable.svg' alt='Neon Fable logo' class='inline-icon'> Crafted by <b>Neon Fable</b>"}));

// ---------------- JavaScript Events ----------------

// enable click events for clickable layers
map.on("click", "points-of-interest", createPopup);
map.on("click", "cities", createPopup);

// Change the cursor when it enters and leaves clickable layers
map.on("mouseenter", "cities", function() { map.getCanvas().style.cursor = "pointer"; });
map.on("mouseenter", "points-of-interest", function() { map.getCanvas().style.cursor = "pointer"; });
map.on('mouseleave', "cities", function () { map.getCanvas().style.cursor = ''; });
map.on('mouseleave', "points-of-interest", function () { map.getCanvas().style.cursor = ''; });