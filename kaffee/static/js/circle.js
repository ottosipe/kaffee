

var circles = [];
window.drawCircles = function draw(map, center) {

  $.get("data", {
    lat: center.jb,
    lng: center.kb,
    radius: 800,
    search: "coffee" // switch to search from box
  }, function(data) {
    // parse json and grab data
    var venues = JSON.parse(data).venues;
    console.log(data);             

                                                                  // TODO, dont replot things.... just dont re render redoundant stuff.
                                                                  // also, query four corners of map too on pg load
    for(var i in circles) {
      circles[i].setMap(null);
    }

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
    }
  });

  
}