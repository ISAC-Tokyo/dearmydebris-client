
google.maps.event.addDomListener(window, 'load', handleLoadGoogleMap);

var beforeInfo;

function  before_close(infoWindow){
	if(beforeInfo)beforeInfo.close();
	beforeInfo = infoWindow;
}

dearMyDebris.initDebris = function(features)
{
  features.forEach(function(o)
  {
    var markerOpts =
    {
      position: new google.maps.LatLng(o.geometry.coordinates[1],o.geometry.coordinates[0]),
      map: dearMyDebris.map,
      title: o.properties.name,
      icon: ""+dearMyDebris.imageDirectoryBaseURL + ((o.properties.category!=null)?((o.properties.category)+".png"):"DEB.png")
    };
    var marker = new google.maps.Marker(markerOpts);
    var infowindow = new google.maps.InfoWindow({content: dearMyDebris.getContentString(o)});
    google.maps.event.addListener(marker, 'click', function(){
    	before_close(infowindow);
    	infowindow.open(dearMyDebris.map,marker);
    });
    // google.maps.event.addListener(marker, 'mouseout', function(){
    	// infowindow.close();
    // });
  });
}

function handleLoadGoogleMap()
{
  var mapOptions = {
    center: new google.maps.LatLng(dearMyDebris.initialViewPoint.latitude, dearMyDebris.initialViewPoint.longitude),
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    disableDefaultUI: true
  };
  var map = dearMyDebris.map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);
  dearMyDebris.fetchDebris("");
}

