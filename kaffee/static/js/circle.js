
var colorList = ["#FF0000", "#5CB8FF", "#790EAD", "#009933", "#0000FF", "#FF4719", "#FF47D1"];

var circles = [];

window.clearCircles = function clear() {
  for(var i in circles) {
      circles[i].setMap(null);
    }
}

window.drawCircles = function draw(map, center) {

  $.get("data", {
    lat: center.jb,
    lng: center.kb,
    radius: 800,
    search: window.query // switch to search from box
  }, function(data) {
    // parse json and grab data
    var venues = JSON.parse(data).venues;
       
    window.clearCircles();

    for (var i in venues) {
      console.log(venues[i].name)
      var circleOpts = {
        clickable: false,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 0,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: new google.maps.LatLng(venues[i].location.lat,venues[i].location.lng),
        radius: venues[i].stats.checkinsCount / 40 + 10
      };

      circles.push(new google.maps.Circle(circleOpts));
      var centerCircle = {
        clickable: false,
        strokeColor: '#000000',
        strokeOpacity: 1,
        strokeWeight: 0,
        fillColor: '#000000',
        fillOpacity: 1,
        map: map,
        center: new google.maps.LatLng(venues[i].location.lat, venues[i].location.lng),
        radius: 3
      };
      circles.push(new google.maps.Circle(centerCircle));
    }
  });

  
}
