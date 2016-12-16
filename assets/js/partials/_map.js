var google;
function getCourseMap() {
    var viewpoint = getUrlParameter('viewpoint'),
        topic = getUrlParameter('topic'),
        troyes =  new google.maps.LatLng(48.2973725, 4.0721523),
        topicids = [],
        spatials = [],
        spatialsAdress = [],
        map;
    function affichageParcours(dataTopic){
        dataTopic.rows.forEach(function(row){
          if(row.value.name){
                $('.title').text('Parcours' + ' "' + row.value.name + '"');
            }
        })
    }

    function affichageMenu(dataCorpus){
        
        //Trouver l'id des row permettant de retrouver les endroits
        dataCorpus.rows.forEach(function(row){
            if(row.value.topic && row.value.topic.id == topic){
                topicids.push(row.id);
            }
        });
        
        //Trouver les endroits, afficher le menu
        dataCorpus.rows.forEach(function(row){
            if(row.value.spatial && topicids.indexOf(row.id) != -1 && spatials.indexOf(row.value.spatial) == -1){
                spatials.push(row.value.spatial);
            }
        })
    } 

    function createMap(center){
           var options = {
                zoom: 14,
                center: center,
                mapTypeId: google.maps.MapTypeId.TERRAIN,
                maxZoom: 20
            };
            map = new google.maps.Map(document.getElementById('map'), options);
               
    }

    function drawDirections(center,endroits){
        var waypoints = [],
            p = new Promise(function(resolve,reject){
                   endroits.map(function(endroit){
            var requestPlaces = {
                location: center,
                radius: 500,
                query: endroit
            },
                servicePlaces = new google.maps.places.PlacesService(map);    
            //Text search utilisant l'API Place de Google afin de trouver un endroit par rapport au nom de l'endroit
            servicePlaces.textSearch(requestPlaces, function(resultats,statusRq){
                if(statusRq === google.maps.places.PlacesServiceStatus.OK){
                    waypoints.push({location:resultats[0].formatted_address,stopover:true});
                    spatialsAdress.push({location:resultats[0].formatted_address,url:'<div><a href="explore.html?topic=' + topic + '&viewpoint=' + viewpoint + '&spatial=' + endroit + '">' + endroit + '</a></div>'})
                    if(waypoints.length == endroits.length){
                        resolve(waypoints);
                    }
                }
            });

        });
            })

        p.then(function(wp){
            calculate(wp[0].location,wp[wp.length-1].location,wp);
        })    
     
    }

    function calculate(origin, destination, waypoints) {
        var directionsService = new google.maps.DirectionsService(),
            direction = new google.maps.DirectionsRenderer({map:map,suppressMarkers:true}), //SupressMarkers afin de cacher les markers automatique
            request = {
                        origin: origin,
                        destination: destination,
                        waypoints: waypoints,
                        travelMode: google.maps.DirectionsTravelMode.WALKING,
                        optimizeWaypoints: true
        };
      
        directionsService.route(request, function (dataDirection, status) { 
            if (status === google.maps.DirectionsStatus.OK) {
                addInformation(dataDirection.routes[0].legs);
                direction.setDirections(dataDirection);
            }
        });
    }

    function addInformation(infoMarkers){
        var duration = 0
            increment = ['A','B','C','D','E','F','G','H'];
        infoMarkers.map(function(d,i){
            var content = spatialsAdress.filter(function(o){
                return o.location == d.end_address;
            })

            var info = new google.maps.InfoWindow({
                content: content[0].url
            })

            duration += d.duration.value;
            
            var marker = new google.maps.Marker({
                position: d.end_location,
                map: map,
                label: increment[i],
                animation: google.maps.Animation.DROP,
                title: ""
            });
            marker.addListener('click',function(){
                info.open(map,marker);
            })
            
        })

        duration = getCourseDuration(duration/60);
        $('#duration').text(duration);

    }





    Promise.all([
        requestFactory('http://argos2.hypertopic.org/corpus/Vitraux - Bénel',affichageMenu),
        requestFactory('http://argos2.hypertopic.org/topic/' + viewpoint + '/' + topic,affichageParcours)
        ]).then(function(){
            createMap(troyes);
            drawDirections(troyes,spatials);
        });
}





   