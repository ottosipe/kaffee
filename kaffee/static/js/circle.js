
var colorList = ["#FF0000", "#5CB8FF", "#790EAD", "#009933", "#0000FF", "#FF4719", "#FF47D1"];

var circles_set = {};
var circles = [];

var last_center = {lat: 0, lng: 0}

window.clearCircles = function clear() {
  for(var i in circles) {
    circles[i].setMap(null);
  }

  last_center = {lat: 0, lng: 0}
  circles_set = {}
  circles = [];
}

window.drawCircles = function draw(map) {
  
  var center = map.getCenter();

  dist = Math.sqrt(Math.pow(center.jb - last_center.lat,2) + Math.pow(center.kb - last_center.lng,2));
  console.log(dist);

  if(dist < .004) return;

  window.renderCircle(map, center.jb, center.kb);
  window.renderCircle(map, center.jb + .005, center.kb + .015);
  window.renderCircle(map, center.jb + .005, center.kb - .015);
  window.renderCircle(map, center.jb - .005, center.kb + .015);
  window.renderCircle(map, center.jb - .005, center.kb - .015);

  last_center.lat = center.jb;
  last_center.lng = center.kb;
}

var i = 0;
window.setColor = function color() {
  // thanks paul irish!

  last_center = {lat: 0, lng: 0}
  if(i >= colorList.length) i = 0;
  window.color = colorList[i++];
}

setColor();
window.renderCircle = function render(map, lat, lng) {


  $.get("data", {
    lat: lat,
    lng: lng,
    radius: 800,
    search: window.query // switch to search from box
  }, function(data) {
    // parse json and grab data
    var venues = JSON.parse(data).venues;

/*    new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng), 
      map: map
    });
*/  
    for (var i in venues) {
      var hash = venues[i].name + venues[i].location.lat + venues[i].location.lng;

      if(!(hash in circles_set)) {

        var circleOpts = {
          clickable: false,
          strokeColor: window.color,
          strokeOpacity: 0.8,
          strokeWeight: 0,
          fillColor: window.color,
          fillOpacity: 0.35,
          map: map,
          center: new google.maps.LatLng(venues[i].location.lat,venues[i].location.lng),
          radius: venues[i].stats.checkinsCount / 50 + 20
        };

        circles.push(new google.maps.Circle(circleOpts));
        var centerMarker = {
          icon: '/static/img/grey-dot-small.png',
          map: map,
          position: new google.maps.LatLng(venues[i].location.lat, venues[i].location.lng),
          title: venues[i].name
        };
        circles.push(new google.maps.Marker(centerMarker));

        circles_set[hash] = true;
      }
    }
  });
}
