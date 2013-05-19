var def = {
	lat: 47.6074,
	lng: -122.3210
};

function mapRender(position) {

	var user_latlng =  new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var mapOptions = {
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
