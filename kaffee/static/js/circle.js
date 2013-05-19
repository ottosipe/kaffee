
// Create an object containing LatLng, population.
var shops = [
{
  center: new google.maps.LatLng(47.6143, -122.3270),
  size: 142
},
{
  center: new google.maps.LatLng(47.6093, -122.3423),
  size: 407
},
{ 
  center: new google.maps.LatLng(47.6071, -122.3153),
  size: 192
}]

circles = [];
window.drawCircles = function draw(map) {

  for (var i in shops) {
    var circleOpts = {
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 0,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: shops[i].center,
      radius: shops[i].size
    };

    circles.push(new google.maps.Circle(circleOpts));
  }
}