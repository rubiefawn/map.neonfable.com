// ---------------- Map-specific Configuration ----------------

mapCenter = [0, -10];
defaultZoom = 2;

// Create a new MapboxGL map, change its default settings
var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/neonfable/cl2i3rd7n000x14ms3oa3sllu",
	center: mapCenter,
	zoom: defaultZoom,
	maxZoom: 6.0,
	maxPitch: 70,
	pitch: 15,
	maxBounds: [[-360,-80],[360,80]]
});

// see ./map.js for boilerplate
addInteractivity(map);