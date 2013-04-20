
google.load("earth", "1");
google.setOnLoadCallback(init);

dearMyDebris.initDebris = function(features)
{
  features.forEach(function(o)
  {
    var placemark = dearMyDebris.ge.createPlacemark('');
    placemark.setName(o.properties.name);
    var point = dearMyDebris.ge.createPoint('');
    point.setLatitude(o.geometry.coordinates[1]);
    point.setLongitude(o.geometry.coordinates[0]);
    point.setAltitudeMode(dearMyDebris.ge.ALTITUDE_RELATIVE_TO_GROUND);
    point.setExtrude(true);
    point.setAltitude(o.geometry.coordinates[2]);
    placemark.setGeometry(point);
    // Add the placemark to Earth.
    dearMyDebris.ge.getFeatures().appendChild(placemark);
  });
}


function init()
{
  google.earth.createInstance('map3d', initGoogleEarth, failureGoogleEarth);
}

function initGoogleEarth(instance) {
  dearMyDebris.ge = instance;
  dearMyDebris.ge.getWindow().setVisibility(true);
  dearMyDebris.ge.getNavigationControl().setVisibility(dearMyDebris.ge.VISIBILITY_SHOW);
  
  dearMyDebris.fetchDebris("");
}

function failureGoogleEarth(instance) {
}

getScreenSize = function()
{
  if ( window.innerWidth )
  {
    var width = window.innerWidth;
  }
  else if ( document.documentElement && document.documentElement.clientWidth != 0 )
  {
    var width =  document.documentElement.clientWidth;
  }
  else if ( document.body )
  {
    var width = document.body.clientWidth;
  }
  if ( window.innerHeight )
  {
    var height = window.innerHeight;
  }
  else if ( document.documentElement && document.documentElement.clientHeight != 0 )
  {
    var height =  document.documentElement.clientHeight;
  }
  else if ( document.body )
  {
    var height =  document.body.clientHeight;
  }
  this.width = width;
  this.height = height;
  return this;
}
