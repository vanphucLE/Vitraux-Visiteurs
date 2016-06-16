
if($('#trouve').length){
  $(document).ready(getVitrailID());
}
if($('.table-view').length){
    $(document).ready(genererVitraux());
}

function genererVitraux(){
$(document).ready(function () {

if(getUrlVars()["viewpoint"]!=undefined){
  var viewpoint= getUrlVars()["viewpoint"];
  var topic = getUrlVars()["topic"];
  var eglise = decodeURIComponent(getUrlVars()["eglise"]);
}
else{
  var viewpoint= '56e092d8a6179a788c74b618b29801c0';
  var topic = '4991b7b717da9a4d8a769e8664b136a0';
  var eglise = 'Église Sainte-Madeleine, Troyes';
}


$('.title').append(eglise);
$.ajax({
  url: 'http://argos2.hypertopic.org/topic/'+viewpoint+'/'+topic,
  dataType: 'json',
  success: function(data) {
    var i = 1;
    for (var r of data.rows) {
      if (r.value.item && r.value.item.corpus=="Vitraux - Bénel") {
        if (r.value.item.name && r.value.item.name!="Sans nom") {

          var name = r.value.item.name;
          }
          else{
            var name ="";
          }
          var display = "none";
          if(localStorage.getItem(r.value.item.id)){
            var display = "inline";
          }
        var picture_id = r.value.item.id;
        $('.table-view').append('<li  id="'+i+'" class="table-view-cell"><a class="navigate-right" href="preview.html?id='+picture_id+'&topic='+topic+'&viewpoint='+viewpoint+'&eglise='+eglise+'" data-transition="slide-in"> <div id="'+picture_id+'-name">'+name+'</div> <img  id="'+picture_id+'" class="table_image" data-transition="slide-in" src=""></a><button style="display:'+display+'"class="btn btn-positive"><span class="icon icon-check"></span>Trouvé</button></li>');
      }
      if(r.value.name){
        $(".title").prepend(r.value.name + " - ");
      }

      i++;
    }

    $.ajax({
      url: 'http://steatite.hypertopic.org/corpus/Vitraux - Bénel',
      dataType: 'json',
      success: function(data) {
        for (var s of data.rows) {
          if (s.value.thumbnail) {
            $('#'+s.key[1]).attr('src',s.value.thumbnail);
          }
          if(s.value.name){

              $("#"+s.key[1]+"-name").text(s.value.name);



          }
        }
      }
    });
    $.ajax({
      url: 'http://argos2.hypertopic.org/corpus/Vitraux - Bénel',
      dataType: 'json',
      success: function(data) {
        for (var s of data.rows) {
         if (s.value.spatial) {
            if(s.value.spatial != eglise){
              $('#'+s.key[1]).parent().parent().remove();
            }
          }

        }
      }
    });
  }
});
});
}

function getUrlVars() {
var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
vars[key] = value;
});
return vars;
}

function getVitrailID(){

var id = getUrlVars()["id"];
var topic = getUrlVars()["topic"];
var viewpoint = getUrlVars()["viewpoint"];
var eglise = getUrlVars()["eglise"];

$.ajax({
  url: 'http://steatite.hypertopic.org/corpus/Vitraux - Bénel',
  dataType: 'json',
  success: function(data) {
    for (var s of data.rows) {
      if (s.value.resource && s.key[1] == id) {
        $('.preview_image').attr('src',s.value.resource);
          $('#trouve').attr('onclick','found("'+id+'","'+eglise+'","'+topic+'","'+viewpoint+'")');

      $('#retour').attr('href','explore.html?topic='+topic+'&viewpoint='+viewpoint+'&eglise='+eglise);

      }
      if(s.value.name){
        if(s.key[1]==id){
        $(".title").text(s.value.name);
}
    }
  }
  }
});
if(localStorage.getItem(id)){
    $('#trouve').text("Description");
}
}

function found(id, eglise, topic, viewpoint){
  console.log(id);
  localStorage.setItem(id, true);
  console.log(localStorage.getItem(id));
  PUSH({url: 'description.html?id='+id+'&'+'topic='+topic+'&viewpoint='+viewpoint+'&eglise='+eglise, transition: 'slide-out'});
}
