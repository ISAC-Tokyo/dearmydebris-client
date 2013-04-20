$(function() {
});

var dearMyDebris = {};

function handleLoadGoogleMap()
{
  var mapOptions = {
    center: new google.maps.LatLng(35.66193375685752, 139.67768669128418),
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    disableDefaultUI: true
  };
  var map = dearMyDebris.map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);
  dearMyDebris.renderMarker("");
}

dearMyDebris.testData =[
    { "type": "Feature",
      "geometry": {"type": "Point", "coordinates": [139.67768669128418,35.66193375685752]},
      "properties": {"name": "VANGUARD 1"}
    },
    { "type": "Feature",
      "geometry": {"type": "Point", "coordinates": [139.67767669128418,35.66093375685752]},
      "properties": {"name": "VANGUARD 1"}
    }
];

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

  var bounds = new google.maps.LatLngBounds();
//  this.debris.forEach(function(o)
  dearMyDebris.testData.forEach(function(o)
  {
    var markerOpts =
    {
      position: new google.maps.LatLng(o.geometry.coordinates[1],o.geometry.coordinates[0]),
      map: dearMyDebris.map,
      title: o.properties.name
    };
    var marker = new google.maps.Marker(markerOpts);
    var infowindow = new google.maps.InfoWindow({content: "<div>"+o.properties.name+"</div>"})
    google.maps.event.addListener(marker, 'mouseover', function(){infowindow.open(dearMyDebris.map,marker);});
    google.maps.event.addListener(marker, 'mouseout', function(){infowindow.close();});
  });
}

