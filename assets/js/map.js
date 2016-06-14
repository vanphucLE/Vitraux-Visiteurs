var map;
var panel;
var initialize;
var calculate;
var direction;

function initialize() {
  var latLng = new google.maps.LatLng(48.2973725,4.0721523); // Troyes
  var myOptions = {
    zoom      : 14, // Zoom par défaut
    center    : latLng, // Coordonnées de départ de la carte de type latLng 
    mapTypeId : google.maps.MapTypeId.TERRAIN, 
    maxZoom   : 20,
  };
  
  map      = new google.maps.Map(document.getElementById('map'), myOptions);

  direction = new google.maps.DirectionsRenderer({
    map   : map,
  });

};

function calculate (origin,destination,waypoints){

        var request = {
            origin      : origin,
            destination : destination,
            waypoints: waypoints,
            travelMode  : google.maps.DirectionsTravelMode.WALKING // A pied
        }
        var directionsService = new google.maps.DirectionsService(); 
        directionsService.route(request, function(response, status){ // Envoie de la requête pour calculer le parcours
            if(status == google.maps.DirectionsStatus.OK){
                direction.setDirections(response); // Trace l'itinéraire sur la carte
            }
        });
};
