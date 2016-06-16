
if($('#to_church').length){
    $(document).ready(description());
}
function adaptOverlay(){
  var imgwidth = $("#thumb_vitrail").width();
  var imgheight = $("#thumb_vitrail").height();
  $(".overlay").css("width",imgwidth);
  $(".overlay-text").css("width",imgwidth);
  $(".overlay").css("height",imgheight);
}

function description(){
var id = getUrlVars()["id"];
var eglise = getUrlVars()["eglise"];
var viewpoint = getUrlVars()["viewpoint"];
var topic = getUrlVars()["topic"];

$('#to_church').attr('href','explore.html?topic='+topic+'&viewpoint='+viewpoint+'&eglise='+eglise);

$("a#topic").prop("href","explore.html?topic=" + topic + "&viewpoint=" + viewpoint + "&eglise=" + eglise );
    $.ajax({
        url : "http://steatite.hypertopic.org/corpus/Vitraux - Bénel",
        type : "GET",
        dataType: 'json',
        success: function(data){
            for (var i in data["rows"]){
      if (data["rows"][i]["key"][1] == id ){
        if (typeof data["rows"][i]["value"]["name"] != 'undefined')
          name = data["rows"][i]["value"]["name"];
        if (typeof data["rows"][i]["value"]["thumbnail"] != 'undefined')
          thumb = data["rows"][i]["value"]["thumbnail"];
        if (typeof data["rows"][i]["value"]["resource"] != 'undefined')
          img = data["rows"][i]["value"]["resource"];
      }
    }
    if ($("span#nom_vitrail").html() !="Sans Nom" ){
      $("span#nom_vitrail").html(name);
    }
    $("img#thumb_vitrail").prop("src",thumb);
    $("a#img-resource").prop("href",img);
    setTimeout(adaptOverlay(),1000);
        }
    });
$.ajax({
  url :"http://argos2.hypertopic.org/viewpoint/56e092d8a6179a788c74b618b29801c0",
  type : "GET",
        dataType: 'json',
  success: function(data){
    for (var i in data["rows"]){
      if (typeof data["rows"][i]["value"]["item"] != 'undefined'){
        if (data["rows"][i]["value"]["item"]["id"] == id ){
          if (typeof data["rows"][i]["value"]["item"]["name"] != 'undefined')
            name = data["rows"][i]["value"]["item"]["name"];
        }
      }
    }
    $("span#nom_vitrail").html(name);
  }
});
$.ajax({
  url :"http://argos2.hypertopic.org/viewpoint/a76306e4f17ed4f79e7e481eb9a1bd06",
  type : "GET",
        dataType: 'json',
  success: function(data){
    for (var i in data["rows"]){
      if (typeof data["rows"][i]["value"]["item"] != 'undefined'){
        if (data["rows"][i]["value"]["item"]["id"] == id ){
          if (typeof data["rows"][i]["value"]["item"]["name"] != 'undefined')
            name = data["rows"][i]["value"]["item"]["name"];
        }
      }
    }
    $("span#nom_vitrail").html(name);
  }
});
}
