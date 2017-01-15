var google;
function getCourseMap(corpus) {
    var viewpoint = getUrlParameter('viewpoint'),
        TROYES_CENTER =  new google.maps.LatLng(48.2973725, 4.0721523),
        topicids = [ getUrlParameter('topic')],
        places_name = [],
        urls = [],
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
                       
                            resolve({waypoint: {location: textSearch[0].formatted_address,stopover: true},place:place});
                     }else{
                            resolve(null);
                     }
              });
        });
    }
       

    function setRoute(dataWaypoint,map){
      
        var googleDirectionService = new google.maps.DirectionsService(),
            googleDirectionRenderer = new google.maps.DirectionsRenderer({map:map,suppressMarkers:true}),
            waypoints = dataWaypoint.map(function(data){return data.waypoint}),
            options = {origin: waypoints[0].location, destination: waypoints[0].location, waypoints: waypoints,travelMode: google.maps.DirectionsTravelMode.WALKING, optimizeWaypoints: true};
            
            return new Promise(function(resolve,reject){
                googleDirectionService.route(options,function(direction,requestStatus){
                    if(requestStatus == google.maps.DirectionsStatus.OK){
                        googleDirectionRenderer.setDirections(direction);
                        customizeMarkers(direction.routes[0],map,dataWaypoint);

                    }
                })
            })

        //Allow us to manually put marker on the map so we can customize the marker with a infowindow containing the link toward explore
        function customizeMarkers(directionData,map,dataWaypoint){
            var locationTracker = [],
                duration = 0,
                order = directionData.waypoint_order;

           directionData.legs.map(function(thisMarker,index){
                if(locationTracker.indexOf(thisMarker.end_location.toString()) == -1){
                    var marker = new google.maps.Marker({position: thisMarker.end_location,map:map,label: (index+1).toString()}),
                        currentPlace = dataWaypoint[order[index]].place,
                        info = new google.maps.InfoWindow({
                            content: '<a href="explore.html?topic='+topicids[0]+'&viewpoint='+viewpoint+'&spatial='+currentPlace+'">'+currentPlace+'</a>'
                        });

                    duration += thisMarker.duration.value;
                    locationTracker.push(thisMarker.end_location.toString()); //So we don't have to compare the whole object
                    marker.addListener('click',function(){
                        info.open(map,marker);
                    });
                }
                
            });   
        }

        /*
        * When we get the waypoints from google direction service,
        * the order is different from the waypoint we get from
        * the text search service.Since the urls array is based on
        * the first one, we need to rearrange those with the order
        * which was chose by Google Direction Service
        */

        function fixWaypointsOrder(waypoints1,waypoints2,urls){
            var urlNew = []
            waypoints1.forEach(function(wpX,i){
                waypoints2.forEach(function(wpY,j){
                    if(wpX.location == wpY.location){
                        urlNew[i] = urls[j];
                    }
                })
            });
            return urlNew
        }

    }


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
            return setRoute(waypoints,map)
        })
}





   