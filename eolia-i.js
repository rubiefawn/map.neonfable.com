// ---------------- Map-specific Configuration ----------------

mapCenter = [0, -10];
defaultZoom = 2;

// Create a new MapboxGL map, change its default settings
var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/neonfable/cl2yj41t2000t15k3x0u09nj4",
	center: mapCenter,
	zoom: defaultZoom,
	maxZoom: 6.0,
	maxPitch: 70,
	pitch: 15,
	maxBounds: [[-360,-80],[360,80]]
});

// see ./map.js for boilerplate
addInteractivity(map);