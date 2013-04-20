
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
  // setting the camera
  var lookAt = dearMyDebris.ge.createLookAt('');
  lookAt.setLatitude(dearMyDebris.initialViewPoint.latitude);
  lookAt.setLongitude(dearMyDebris.initialViewPoint.longitude);
  lookAt.setRange(1500*1000); //default is 0.0
  lookAt.setTilt(lookAt.getTilt() + 30.0);
  // Update the view in Google Earth.
  dearMyDebris.ge.getView().setAbstractView(lookAt);
}

function failureGoogleEarth(instance) {
}

