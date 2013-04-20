
google.maps.event.addDomListener(window, 'load', handleLoadGoogleMap);

dearMyDebris.initDebris = function(features)
{
  features.forEach(function(o)
  {
    var iconOffset = new google.maps.Point(0	, 0);
    var iconPosition = new google.maps.Point(0, 0);
    var iconSize = new google.maps.Size(128, 128);
    var icon = new google.maps.MarkerImage(""+dearMyDebris.imageDirectoryBaseURL + ((o.properties.category!=null)?((o.properties.category)+".png"):"DEB.png"), iconSize, iconPosition, iconOffset);
    var markerOpts =
    {
      position: new google.maps.LatLng(o.geometry.coordinates[1],o.geometry.coordinates[0]),
      map: dearMyDebris.map,
      title: o.properties.name,
      icon: icon
    };
    var marker = new google.maps.Marker(markerOpts);
    var infowindow = new google.maps.InfoWindow({content: dearMyDebris.getContentString(o)});
    google.maps.event.addListener(marker, 'mouseover', function(){infowindow.open(dearMyDebris.map,marker);});
    google.maps.event.addListener(marker, 'mouseout', function(){infowindow.close();});
  });
}

function handleLoadGoogleMap()
{
  var mapOptions = {
    center: new google.maps.LatLng(dearMyDebris.initialViewPoint.latitude, dearMyDebris.initialViewPoint.longitude),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    disableDefaultUI: true
  };
  var map = dearMyDebris.map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);
  dearMyDebris.fetchDebris("");
}

