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
      { "saturation": 19 },
      { "lightness": -7 }
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
  }, {
    "featureType": "all",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  }, {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      { "visibility": "off" }
    ]
  }, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      { "visibility": "on" }
    ]
  }
];

window.query = "";
$(function() {

  $("#clear").click(function(e){
    e.preventDefault();
    window.clearCircles();
    $("#query").val("");
  })

  $("#search_form").submit(function(e) {
    e.preventDefault();
    window.query = $("#query").val();

    if (window.query == "") return;

    window.setColor();
    window.drawCircles(window.map);
  })
})


window.userLoc = {
	lat: 47.6074,
	lng: -122.3210
};

google.maps.visualRefresh = true;

function mapRender(position) {

  if(position) {
    userLoc.lat = position.coords.latitude;
    userLoc.lng = position.coords.longitude;
  }
  
	var user_latlng =  new google.maps.LatLng(userLoc.lat, userLoc.lng);
	var mapOptions = {
		disableDefaultUI: true,
		center: user_latlng,
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
    maxZoom: 17,
    minZoom: 15
	};

	window.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  var t_recenter = _.throttle(recenter, 3000);
  function recenter() {
    window.drawCircles(map);
  }
  
  google.maps.event.addListener(map, 'dragend', function() {
    // call throttled recenter function
    t_recenter();
  });

	new google.maps.Marker({
    icon: '/static/img/person_icon.png',
		position: user_latlng, 
		map: map, 
		title:"You are here! (at least within a "+position.coords.accuracy+" meter radius)"
	});

	map.setOptions({styles: styles});

}

function error(msg) {
	console.log(msg);
	var position = {
		coords: {
			latitude: userLoc.lat,
			longitude: userLoc.lng
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
