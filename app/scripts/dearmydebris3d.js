
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
    point.setAltitude(o.geometry.coordinates[2]*200);
    placemark.setGeometry(point);

    // setting the icon image
    var icon = dearMyDebris.ge.createIcon('');
    icon.setHref(dearMyDebris.imageDirectoryBaseURL + ((o.properties.category!=null)?(o.properties.category+".png"):"rocket.png"));
    var style = dearMyDebris.ge.createStyle(''); //create a new style
    style.getIconStyle().setIcon(icon); //apply the icon to the style
    placemark.setStyleSelector(style); //apply the style to the placemark

    // Add the placemark to Earth.
    dearMyDebris.ge.getFeatures().appendChild(placemark);

    // adding mouse click event listener
    google.earth.addEventListener(placemark, 'mouseover', function(event)
    {
      event.preventDefault();
      var balloon = dearMyDebris.ge.createHtmlStringBalloon('');

      balloon.setContentString(dearMyDebris.getContentString(o));
      balloon.setFeature(placemark);
      balloon.setCloseButtonEnabled(true);
      dearMyDebris.ge.setBalloon(balloon);
        // $('#follow_btn').on('click', function(e){   
//         	  
		// });

    });
      google.earth.addEventListener(placemark, 'click', function(event){
      	      event.preventDefault();
      	      update_explain(o);
      })
  });

  
}


function update_explain(o)
{
	console.log("inner")
	// $('#debri_name').text(o.properties.name);
	// var t = "Follower";
	// o.properties.follower.forEach(function(text){
		// t += text + "<br />";
	// })
	// $('#debri_followers').text(t);

	//$('#explain_window').innerHTML("test");
	$('#explain_window').show();
	$('#explain_window').html(dearMyDebris.getContentStringToOver(o));
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
  lookAt.setRange(800000); //default is 0.0
  lookAt.setTilt(lookAt.getTilt() + 80.0);
  
  // Update the view in Google Earth.
  dearMyDebris.ge.getView().setAbstractView(lookAt);
  
}

function failureGoogleEarth(instance) {
}

var animRunning = false;
var ANIM_ALTITUDE = 100;


function startAnimation() {
  if (!animRunning) {
  	  dearMyDebris.ge.getOptions().setMouseNavigationEnabled(false);
    dearMyDebris.ge.getOptions().setFlyToSpeed(0.5);
    animRunning = true;
    google.earth.addEventListener(dearMyDebris.ge, 'frameend', tickAnimation);

    // start it off
    tickAnimation();
  }
}

function stopAnimationClick() {
  if (animRunning) {
    google.earth.removeEventListener(dearMyDebris.ge, 'frameend', tickAnimation);
    animRunning = false;
  }
}

function tickAnimation() {
	console.log("est")
  // an example of some camera manipulation that's possible w/ the Earth API
  var camera = dearMyDebris.ge.getView().copyAsCamera(dearMyDebris.ge.ALTITUDE_RELATIVE_TO_GROUND);
  var dest = destination(camera.getLatitude(), camera.getLongitude(), 100,
                         camera.getHeading());

  camera.setAltitude(ANIM_ALTITUDE);
  camera.setLatitude(dest[0]);
  camera.setLongitude(dest[1]);

  dearMyDebris.ge.getView().setAbstractView(camera);
}

/* Helper functions, courtesy of
   http://www.movable-type.co.uk/scripts/latlong.html */
function distance(lat1, lng1, lat2, lng2) {
  var a = Math.sin(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180);
  var b = Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.cos((lng2 - lng1) * Math.PI / 180);
  return 6371000 * Math.acos(a + b);
}

function destination(lat, lng, dist, heading) {
  lat *= Math.PI / 180;
  lng *= Math.PI / 180;
  heading *= Math.PI / 180;
  dist /= 6371000; // angular dist

  var lat2 = Math.asin(Math.sin(lat) * Math.cos(dist) +
                       Math.cos(lat) * Math.sin(dist) * Math.cos(heading));

  return [
      180 / Math.PI * lat2,
      180 / Math.PI *
        (lng + Math.atan2(Math.sin(heading) * Math.sin(dist) * Math.cos(lat2),
                          Math.cos(dist) - Math.sin(lat) * Math.sin(lat2)))];
}
