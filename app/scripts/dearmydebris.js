
var dearMyDebris={};
dearMyDebris.nextQuery = "";
dearMyDebris.initDebris = function(features)
{
}
dearMyDebris.debris = new Array(0);
dearMyDebris.initialViewPoint = {latitude:35.66193375685752, longitude: 139.67768669128418};
dearMyDebris.queryBase = "http://192.168.27.149:3000/api/v1/debris/index.json";
dearMyDebris.imageDirectoryBaseURL = 'http://192.168.26.160:3000/assets/';

dearMyDebris.fetchDebris = function(query)
{
  $.get(dearMyDebris.queryBase+query).done(function(ret)
  {
    var newfeatures = ret.feature;
    dearMyDebris.initDebris(newfeatures);
    dearMyDebris.debris = dearMyDebris.debris.concat(newfeatures);
    if (ret.meta !== undefined && ret.meta.next != null)
    {
      setTimeOut(dearMyDebris.fetchData(ret.meta.next), 100);
    }
  });
}

function followAction(){
	
	
}

dearMyDebris.getContentString = function(debris)
{
  var ret = "";
  var followerstring = "";
  
  ret += "<div id='balloon_window'>" +
        "<h1>" + debris.properties.name + "</h1>";
  
  debris.properties.follower.forEach(function(follower, i)
  {
    followerstring += follower;
             ret += "<div id='follower_"+i+"' class='follower'>" +
       "<img src = 'images/fbLogo.png'/>" +
	   "<br />" +
	   "<p>"+follower+"</p>"+
	   '<input type="submit" name="button1" value="Follow" onClick="followAction()">' +
	   "</div>";
  });
  
  ret += "<br />";
  
  return ret;
}

