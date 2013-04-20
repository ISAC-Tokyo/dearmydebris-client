
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

dearMyDebris.getContentString = function(debris)
{
  var ret = "";
  var followerstring = "";
  debris.properties.follower.forEach(function(follower)
  {
    if (followerstring != "")
    {
      followerstring += ",";
    }
    followerstring += follower;
  });
  ret += "<div>"+debris.properties.name+"</div><div>followers: "+followerstring+"</div>";
  return ret;
}

