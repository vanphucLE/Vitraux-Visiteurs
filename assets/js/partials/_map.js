var google;
var map;
var calculate;
var direction;
var waypoints = [];

function getCourseMap() {
    var viewpoint = getUrlParameter('viewpoint'),
        topic = getUrlParameter('topic'),
        topicId = [],
        spatials = [];


    Promise.all([
        requestFactory('http://argos2.hypertopic.org/corpus/Vitraux - Bénel',affichageMenu),
        requestFactory('http://argos2.hypertopic.org/topic/' + viewpoint + '/' + topic,affichageParcours)
        
        ]).then(function(){
            initialize();
            spatials.map(function(endroit){
                var request 
            })
        })

    function affichageParcours(dataTopic){
        dataTopic.rows.forEach(function(row){
            if(row.value.item){
                topicId.push(row.value.item.id);
            }else if(row.value.name){
                $('.title').text('Parcours' + ' "' + row.value.name + '"');
            }
        })
    }

    function affichageMenu(dataCorpus){
        dataCorpus.rows.forEach(function(row){
            if(row.value.spatial && topicId.indexOf(row.key[1]) !== -1 && spatials.indexOf(row.value.spatial) === -1){
                spatials.push(row.value.spatial);
                $('.table-view').append('<li class="table-view-cell"><a class="navigate-right" href="explore.html?topic=' + topic + '&viewpoint=' + viewpoint + '&spatial=' + row.value.spatial + '" data-transition="slide-in">' + row.value.spatial + '</a></li>');
            }
        })

    }

//     var topicids = [];
//     var spatial = [];
//     $.ajax({
//         url: 'http://argos2.hypertopic.org/topic/' + viewpoint + '/' + topic,
//         dataType: 'json',
//         success: function (data) {
//             $.each(data.rows, function (index, r) {
//                 if (r.value.item) {
//                     topicids.push(r.value.item.id);
//                 } else if (r.value.name) {
//                     $('.title').text('Parcours' + ' "' + r.value.name + '"');
//                 }
//             });
//             $.ajax({
//                 url: 'http://argos2.hypertopic.org/corpus/Vitraux - Bénel',
//                 dataType: 'json',
//                 success: function (data) {
//                     $.each(data.rows, function (index, s) {
//                         if (s.value.spatial && topicids.indexOf(s.key[1]) !== -1 && spatial.indexOf(s.value.spatial) === -1) {
//                             spatial.push(s.value.spatial);

//                             $('.table-view').append('<li class="table-view-cell"><a class="navigate-right" href="explore.html?topic=' + topic + '&viewpoint=' + viewpoint + '&spatial=' + s.value.spatial + '" data-transition="slide-in">' + s.value.spatial + '</a></li>');
//                             if (s.value.spatial === "Église Saint-Remi, Troyes" || s.value.spatial === "Église Saint-Remy, Troyes") {
//                                 s.value.spatial = "3 Place Saint-Remi 10000 Troyes";
//                             }

//                             var troyes = new google.maps.LatLng(48.2973725, 4.0721523);
//                             var request = {
//                                 location: troyes,
//                                 radius: '500',
//                                 query: s.value.spatial
//                             };
//                             service = new google.maps.places.PlacesService(map);
//                             service.textSearch(request, callback);
//                         }
//                     });
//                 }
//             });
//         }
//     });
// }

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        var place = results[0];
        waypoints.push({
            location: place.formatted_address,
            stopover: true
        });
        calculate(waypoints[0].location, waypoints[waypoints.length - 1].location, waypoints);
    }
}

function initialize() {
    var latLng = new google.maps.LatLng(48.2973725, 4.0721523); // Troyes
    var myOptions = {
        zoom: 14, // Zoom par défaut
        center: latLng, // Coordonnées de départ de la carte de type latLng 
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        maxZoom: 20
    };

    map = new google.maps.Map(document.getElementById('map'), myOptions);

    direction = new google.maps.DirectionsRenderer({
        map: map
    });
}

function calculate(origin, destination, waypoints) {
    var request = {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: google.maps.DirectionsTravelMode.WALKING // A pied
    };
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function (response, status) { // Envoie de la requête pour calculer le parcours
        if (status === google.maps.DirectionsStatus.OK) {
            direction.setDirections(response); // Trace l'itinéraire sur la carte
        }
    });
}
}
