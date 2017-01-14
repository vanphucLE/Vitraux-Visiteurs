function initList() {
    // List.js
    var options = {
        valueNames: [
            'course-title',
            'course-vp',
            'distance',
            'locations',
            'duration',
            'items-nb',
            {data: ['id']},
            {attr: 'href', name: 'topic-link'}
        ],
        item: '<li class="table-view-cell course" data-id="">' +
                '<a class="navigate-right topic-link" href="#" data-transition="slide-in" data-ignore="push">' +
                '<div class="media-body">' +
                '<div class="course-header">' +
                '<h2 class="course-title"></h2>' +
                '<p class="course-vp"></p>' +
                '</div>' +
                '<div class="course-abstract clearfix">' +
                '<div>' +
                '<p>' +
                '<span class="fa fa-flag-o"></span> ' +
                '<span class="distance"></span> km' +
                '</p>' +
                '<p>' +
                '<span class="fa fa-map-marker"></span> ' +
                '<span class="locations"></span>' +
                '</p>' +
                '</div>' +
                '<div>' +
                '<p>' +
                '<span class="fa fa-clock-o"></span> ' +
                '<span class="duration"></span>' +
                '</p>' +
                '<p><span class="items-nb"></span>' +
                '<span class="item-text"><span>' +
                '</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</a>' +
                '</li>'
    };
    courseList = new List('courses', options);
}


function getCoursesList() {
    var viewpoints = [
        {
            "id": "56e092d8a6179a788c74b618b29801c0",
            "name": "Histoire des religions"
        },
        {
            "id": "a76306e4f17ed4f79e7e481eb9a1bd06",
            "name": "Histoire de l'art"
        }
    ],
        corpus = ['http://argos2.hypertopic.org/corpus/Vitraux - Bénel',
                  'http://argos2.hypertopic.org/corpus/Vitraux%20-%20Dr.%20Krieger',
                  'http://argos2.hypertopic.org/corpus/Vitraux%20-%20Recensement'];


    function displayViewPoint(dataViewpoint){
        //VP's id and VP's name are always the first item from the list in the hierachy
        var viewpoint_id = dataViewpoint.rows[0].key[0],
            viewpoint_name = dataViewpoint.rows[0].value.name,
            topics = [];

        dataViewpoint.rows.forEach(function(rowX){
            var idTopic = rowX.key[1],
                name = "",
                broader = "";

            //if topic id is undefined and if the topic has already been processed in order to avoid any useless computation
            if(idTopic && topics.indexOf(rowX.key[1]) == -1){
                 topics.push(rowX.key[1]);
                 //Recherche de l'id du sujet broader
                 dataViewpoint.rows.forEach(function(rowY){
                    if(rowY.key[1] == idTopic && rowY.value.broader){
                            broader = rowY.value.broader.id;
                    }
                })
                //Find topic's name
                dataViewpoint.rows.forEach(function(rowY){
                    if(rowY.key[1] == idTopic && rowY.value.name){
                            name = rowY.value.name;
                    }
                })

                $('#courses-num').text(parseInt($('#courses-num').text()) + 1);
                courseList.add({
                        'id': idTopic,
                        'course-title': 'Parcours "' + name + '"',
                        'course-vp': "— " + viewpoint_name,
                        'broader_id': broader,
                        'distance': 0,
                        'locations': 0,
                        'locations_name' : [],
                        'duration': "NC",
                        'items-nb': 0,
                        'topic-link' : 'map.html?viewpoint=' + viewpoint_id + '&topic=' +idTopic
                 });
            }
        })    
    }




    function displayCorpus(dataCorpus){
        //Get number of stained glass
       dataCorpus.rows.forEach(function(row){
            if(row.value.topic){
                var itemTemp = courseList.get('id',row.value.topic.id)[0];
                //Add +1 for the current subject and his broader subject
                while(itemTemp){
                    itemTemp.values({'items-nb' : itemTemp.values()['items-nb'] + 1 })
                    itemTemp = courseList.get('id',itemTemp.values()['broader_id'])[0];
                }
            }
       });

       //Get number of places for this particular tour
       dataCorpus.rows.forEach(function(rowX){
            if(rowX.value.spatial){
                var id = rowX.id,
                    place = rowX.value.spatial;
                //Time to look for the topic concerned by the spatial variable
                dataCorpus.rows.forEach(function(rowY){
                    if(rowY.value.topic && rowY.id == id){
                        var itemTemp = courseList.get('id',rowY.value.topic.id)[0];
                        while(itemTemp){
                            if(itemTemp.values()['locations_name'].indexOf(place) == -1){
                                itemTemp.values()['locations_name'].push(place);
                                itemTemp.values({'locations' : itemTemp.values()['locations'] + 1 })
                            }
                            itemTemp = courseList.get('id',itemTemp.values()['broader_id'])[0];
                        }
                    }
                }); //Second loop
            }
       }); // First loop

       courseList.sort('locations',{order:"desc"});
    }  


      Promise.all(viewpoints.map(function(viewPointObject){
            return requestFactory('http://argos2.hypertopic.org/viewpoint/'+viewPointObject['id'],displayViewPoint);
        }).concat(corpus.map(function(corpusObject){
                return requestFactory(corpusObject);
        }))
      ).then(function(results){
        // Il y a un résultat pour chaque requête mais si l'affichage est parallélisé cela renvoie "undefined",
        // Cela signifie que les données présentent sont des données que l'on souhaite traiter par la suite.
            results.map(function(result){
                if(typeof result !== "undefined"){
                    displayCorpus(result);
                }
            });

      });
}
