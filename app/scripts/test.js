
$(function() {
});

var dearMyDebris = {};


function handleLoadGoogleMap()
{
  var mapOptions = {
    center: new google.maps.LatLng(35.6860932602017,139.75201606750488),
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    disableDefaultUI: true
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);
}

dearMyDebris.renderPath = function()
{
  var bounds = new google.maps.LatLngBounds();
  var path = dearMyDebris.debris.map(function(c)
  {
    var latlng = new google.maps.LatLng(
      parseFloat(c[0]),
      parseFloat(c[1])
      );
    bounds.extend(latlng);
    return latlng;
  });
  var polyline = new google.maps.Polyline({
    path: path,
    strokeColor: "#0D67AF",
    strokeOpacity: 0.7,
    strokeWeight: 10
  });
  polyline.setMap(this.map);
}

dearMyDebris.renderMarker = function(query)
{
  $.get('' + query).done(function(ret)
  {
    ret.objects.forEach(function(o)
    {
      var markerOpts =
      {
        position: new google.maps.LatLng(o.geom.geometries[0].coordinates[1],o.geom.geometries[0].coordinates[0]),
        map: this.map,
        title: o.features.name
      };
      var marker = new google.maps.Marker(markerOpts);
    });
  });
}

