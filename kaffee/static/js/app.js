var def = {
	lat: 47.6074,
	lng: -122.3210
};

function mapRender(position) {
	
	google.maps.event.addDomListener(window, 'load', initMap);
	function initMap() {
		var mapOptions = {
			center: new google.maps.LatLng(def.lat, def.lng),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	}
}

function error(msg) {
	console.log("fuck fuck fuck");
}

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(mapRender, error);
} else {
	error('not supported');
}
