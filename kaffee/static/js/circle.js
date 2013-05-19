


window.drawCircles = function draw(map) {

  var circles = [];
  $.get("data?lat=47.6074&lng=-122.3210&radius=10000", function(data) {
    // parse json and grab data
    var venues = JSON.parse(data).venues;
    
    for (var i in venues) {
      console.log(venues[i].name)
      var circleOpts = {
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
    }
  });

  
}