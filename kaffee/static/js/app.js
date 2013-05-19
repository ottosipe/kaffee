var styles = [
  {
    "featureType": "poi",
    "elementType": "labels.icon",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "elementType": "labels.text.stroke",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "#808080" }
    ]
  },{
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "transit",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "water",
    "stylers": [
      { "visibility": "on" },
      { "saturation": 39 },
      { "lightness": -27 }
    ]
  },{
    "featureType": "water",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "administrative.neighborhood",
    "stylers": [
      { "visibility": "off" }
    ]
  }
];

var def = {
	lat: 47.6074,
	lng: -122.3210
};

function mapRender(position) {

	var user_latlng =  new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var mapOptions = {
		disableDefaultUI: true,
		center: user_latlng,
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	new google.maps.Marker({
		position: user_latlng, 
		map: map, 
		title:"You are here! (at least within a "+position.coords.accuracy+" meter radius)"
	});

	map.setOptions({styles: styles});

	window.drawCircles(map);
}

function error(msg) {
	console.log(msg);
	var position = {
		coords: {
			latitude: def.lat,
			longitude: def. lng
		},
		noloc: true
	};
	mapRender(position);
}

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(mapRender, error);
} else {
	error("not supported on this browser");
}
