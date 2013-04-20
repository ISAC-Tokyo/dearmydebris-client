
var dearMyDebris={};
dearMyDebris.nextQuery = "";
dearMyDebris.initDebris = function(features)
{
}
dearMyDebris.debris = new Array(0);

dearMyDebris.fetchDebris = function(query)
{
  $.get('http://192.168.26.160:3000/api/v1/debris/index.json'+query).done(function(ret)
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



