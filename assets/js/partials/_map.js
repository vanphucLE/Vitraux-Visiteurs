var google;
function getCourseMap(corpus) {
    var viewpoint = getUrlParameter('viewpoint'),
        TROYES_CENTER =  new google.maps.LatLng(48.2973725, 4.0721523),
        topicids = [ getUrlParameter('topic')],
        places_name = [],
        urls = [],
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
                            urls.push('<a href="explore.html?topic='+topicids[0]+'&viewpoint='+viewpoint+'&spatial='+place+'">'+place+'</a>' )
                            resolve({location: textSearch[0].formatted_address,stopover: true});
                     }else{
                            resolve(null);
                     }
              });
        });
    }
       

    function setRoute(start,waypoints,map,infoWindowData){
        var googleDirectionService = new google.maps.DirectionsService(),
            googleDirectionRenderer = new google.maps.DirectionsRenderer({map:map,suppressMarkers:true}),
            options = {origin: start, destination: start, waypoints: waypoints,travelMode: google.maps.DirectionsTravelMode.WALKING, optimizeWaypoints: true};
            return new Promise(function(resolve,reject){
                googleDirectionService.route(options,function(direction,requestStatus){
                    if(requestStatus == google.maps.DirectionsStatus.OK){
                        googleDirectionRenderer.setDirections(direction);

                        /*
                         * The waypoints order we get from google is different from
                         * the waypoint order we had before, since the urls array
                         * is based on the first order, we have to fix it
                        */
                        direction.request.waypoints.forEach(function(wpX,i){
                            waypoints.forEach(function(wpY,j){
                                if(wpX.location === wpY.location && i != j){
                                    infoWindowData[j] = infoWindowData[i]
                                }
                            });
                        });
        

                        customizeMarkers(direction.routes[0],map,infoWindowData);

                    }
                })
            })

        function customizeMarkers(directionData,map,infoWindowData){
            var locationTracker = [],
                duration = 0,
                order = directionData.waypoint_order;

           directionData.legs.map(function(thisMarker,index){
                if(locationTracker.indexOf(thisMarker.end_location.toString()) == -1){
                    var marker = new google.maps.Marker({position: thisMarker.end_location,map:map,label: (index+1).toString()}),
                        info = new google.maps.InfoWindow({content: infoWindowData[order[index]]});

                    duration += thisMarker.duration.value;
                    locationTracker.push(thisMarker.end_location.toString()); //So we don't have to compare the whole object
                    marker.addListener('click',function(){
                        info.open(map,marker);
                    });
                }
                
            });   
        }
    }


    




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
            //Clean data from undefined data
            corpusData = cleanData(corpusData);
            findLocation(corpusData)
            createMap(TROYES_CENTER);
            return Promise.all(places_name.map(function(place){return getWaypoints(TROYES_CENTER,place,map);}));
        }).then(function(waypoints){
            waypoints = cleanData(waypoints);
            return setRoute(waypoints[0].location,waypoints,map,urls)
        })
}





   