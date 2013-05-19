

var circles_set = {};
var circles = [];

var last_center = {lat: 0, lng: 0}

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

window.renderCircle = function render(map, lat, lng) {


  $.get("data", {
    lat: lat,
    lng: lng,
    radius: 800,
    search: "coffee" // switch to search from box
  }, function(data) {
    // parse json and grab data
    var venues = JSON.parse(data).venues;

                                                                  // TODO, dont replot things.... just dont re render redoundant stuff.
                                                                  // also, query four corners of map too on pg load


    new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng), 
      map: map
    });

    for (var i in venues) {
      var hash = venues[i].name + venues[i].location.lat + venues[i].location.lng;

      if(!(hash in circles_set)) {

        var circleOpts = {
          clickable: false,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 0,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: map,
          center: new google.maps.LatLng(venues[i].location.lat,venues[i].location.lng),
          radius: venues[i].stats.checkinsCount / 30 + 10
        };

        circles.push(new google.maps.Circle(circleOpts));
        circles_set[hash] = true;
      }
    }
  });
}