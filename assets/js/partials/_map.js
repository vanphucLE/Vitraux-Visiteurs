var google;
function getCourseMap(corpus) {
    var viewpoint = getUrlParameter('viewpoint'),
        TROYES_CENTER =  new google.maps.LatLng(48.2973725, 4.0721523),
        topicids = [ getUrlParameter('topic')],
        places_name = [],
        spatialsAdress = [],
        geoApi = navigator.geolocation,
        map;

    function getDataViewpoint(dataViewpoint){
            //Allow us to explore the whole tree from viewpoint in order to get every narrower subject
            function getNarrower(data,topic){
                    data.forEach(function(row){
                        if(row.key[1] == topic && row.value.narrower){
                            topicids.push(row.value.narrower.id); //Add directly to getCourseMap scope
                            getNarrower(dataViewpoint.rows,row.value.narrower.id);
                        }else if(row.key[1] == topicids[0] && row.value.name){ // to display name of tour
                            $('.title').text('Parcours "'+row.value.name+'"')
                        }
                    })
            }
       //The first element of topicids is always the current topic
       getNarrower(dataViewpoint.rows,topicids[0]);
    }

    function findLocation(dataCorpus){
        //We had to process the corpus data after because we do need the viewpoint data to be process before going further
        //We use the same kind of workaround as in the tour page because the data from viewpoint are processed before, hence undefined
        dataCorpus.map(function(thisCorpus){
            if(thisCorpus){
                var rowids = [];
                //Allow us to find every rowId for every topic we are looking for 
                thisCorpus.rows.forEach(function(row){
                    if(row.value.topic && topicids.indexOf(row.value.topic.id) != -1 ){
                            rowids.push(row.id);
                    }
                });

                //Find every location related to the topics
                thisCorpus.rows.forEach(function(row){
                    if(row.value.spatial && rowids.indexOf(row.id) != -1 && places_name.indexOf(row.value.spatial) == -1){
                        places_name.push(row.value.spatial);
                    }
                });

            }
        });   
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

    function getWaypoints(center,place,map){
        var optionRequestPlace = {location: center, radius: 500, query: place},
            googlePlacesService = new google.maps.places.PlacesService(map);
        
        return new Promise(function(resolve,reject){
              googlePlacesService.textSearch(optionRequestPlace,function(textSearch,requestStatus){
                     if(requestStatus === google.maps.places.PlacesServiceStatus.OK){
                            resolve({location: textSearch[0].formatted_address,stopover: true});
                     }else{
                            resolve(null);
                     }
              });
        });
    }
       




    





    // function drawDirections(center,endroits){
    //     var waypoints = [],
    //         p = new Promise(function(resolve,reject){
    //                endroits.map(function(endroit){
    //         var requestPlaces = {
    //             location: center,
    //             radius: 500,
    //             query: endroit
    //         },
    //             servicePlaces = new google.maps.places.PlacesService(map);    
    //         //Text search utilisant l'API Place de Google afin de trouver un endroit par rapport au nom de l'endroit
    //         servicePlaces.textSearch(requestPlaces, function(resultats,statusRq){
    //             if(statusRq === google.maps.places.PlacesServiceStatus.OK){
    //                 waypoints.push({location:resultats[0].formatted_address,stopover:true});
    //                 spatialsAdress.push({lat: resultats[0].geometry.location.lat(),lng:resultats[0].geometry.location.lng(),location:resultats[0].formatted_address,url:'<div><a href="explore.html?topic=' + topic + '&viewpoint=' + viewpoint + '&spatial=' + endroit + '">' + endroit + '</a></div>'})
    //                 if(waypoints.length == endroits.length){
    //                     resolve(waypoints);
    //                 }
    //             }
    //         });

    //     });
    //         })

    //     p.then(function(wp){
    //         calculate(wp[0].location,wp[wp.length-1].location,wp);
    //     })    
     
    // }

    // function calculate(origin, destination, waypoints) {
    //     var directionsService = new google.maps.DirectionsService(),
    //         direction = new google.maps.DirectionsRenderer({map:map,suppressMarkers:true}), //SupressMarkers afin de cacher les markers automatique
    //         request = {
    //                     origin: origin,
    //                     destination: destination,
    //                     waypoints: waypoints,
    //                     travelMode: google.maps.DirectionsTravelMode.WALKING,
    //                     optimizeWaypoints: true
    //     };
    //     directionsService.route(request, function (dataDirection, status) { 
    //         if (status === google.maps.DirectionsStatus.OK) {
    //             addInformation(dataDirection.routes[0].legs);
    //             direction.setDirections(dataDirection);
    //         }
    //     });
    // }

    // function addInformation(infoMarkers){
    //     var duration = 0
    //         increment = ['A','B','C','D','E','F','G','H'];

    //     infoMarkers.map(function(d,i){
    //         var content = spatialsAdress.filter(function(o){
    //             return o.location == d.end_address;
    //         })

    //         // var info = new google.maps.InfoWindow({
    //         //     content: content[0].url
    //         // })

    //         duration += d.duration.value;
            
    //         var marker = new google.maps.Marker({
    //             position: d.end_location,
    //             map: map,
    //             label: increment[i],
    //             animation: google.maps.Animation.DROP,
    //             title: ""
    //         });
    //         marker.addListener('click',function(){
    //             info.open(map,marker);
    //         })
            
    //     })

    //     duration = getCourseDuration(duration/60);
    //     $('#duration').text(duration);

    // }



    // function closestDistance(here,there){
    //     var lat,
    //         lon,
    //         a,
    //         c,
    //         d,
    //         closest;

    //     there.forEach(function(t){
    //         lat = t.lat - here.lat;
    //         lng = t.lng - here.lat;
    //         a = Math.pow((Math.sin(lat/2)),2) + Math.cos(t.lat) * Math.cos(here.lat) * Math.pow((Math.sin(lng/2)),2);
    //         c = 2 * Math.atan()
    //     })
    // }


    Promise.all([requestFactory('http://argos2.hypertopic.org/viewpoint/' + viewpoint,getDataViewpoint)].concat(corpus.map(function(text){
        return requestFactory(text);
    }))).then(function(corpusData){
            findLocation(corpusData)
            console.log(places_name);
            createMap(TROYES_CENTER);
            //return Promise.all(places_name.map(function(place){return getWaypoints(TROYES_CENTER,place,map);}));
        })}





   