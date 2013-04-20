
google.maps.event.addDomListener(window, 'load', handleLoadGoogleMap);

dearMyDebris.initDebris = function(features)
{
  features.forEach(function(o)
  {
    var markerOpts =
    {
      position: new google.maps.LatLng(o.geometry.coordinates[1],o.geometry.coordinates[0]),
      map: dearMyDebris.map,
      title: o.properties.name,
      icon: (o.properties.category!=null)?o.properties.category:"images/DEB.png"
    };
    var marker = new google.maps.Marker(markerOpts);
    var followerstring = "";
    o.properties.follower.forEach(function(follower)
    {
      if (followerstring != "")
      {
        followerstring += ",";
      }
      followerstring += follower;
    });
    var infowindow = new google.maps.InfoWindow({content: "<div>"+o.properties.name+"</div><div>followers: "+followerstring+"</div>"})
    google.maps.event.addListener(marker, 'mouseover', function(){infowindow.open(dearMyDebris.map,marker);});
    google.maps.event.addListener(marker, 'mouseout', function(){infowindow.close();});
  });
}

function handleLoadGoogleMap()
{
  var mapOptions = {
    center: new google.maps.LatLng(dearMyDebris.initialViewPoint.latitude, dearMyDebris.initialViewPoint.longitude),
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    disableDefaultUI: true
  };
  var map = dearMyDebris.map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);
  dearMyDebris.fetchDebris("");
}

