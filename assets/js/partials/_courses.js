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
        //Nous enregistrons directement l'id et le nom du viewpoint car il s'agit à chaque fois du premier objet
        var viewpoint_id = dataViewpoint.rows[0].key[0],
            viewpoint_name = dataViewpoint.rows[0].value.name;
        $.each(dataViewpoint.rows, function(indexRow,row){
            // Si le topic existe
            if(row.value.narrower){
                 //Ajoute +1 au compteur du nombre de parcours
                 $('#courses-num').text(parseInt($('#courses-num').text()) + 1);
                 courseList.add({
                        'id': row.value.narrower.id,
                        'course-title': 'Parcours "' + row.value.narrower.name + '"',
                        'course-vp': "— " + viewpoint_name,
                        'distance': 0,
                        'locations': 0,
                        'locations_name' : [],
                        'duration': 0,
                        'items-nb': 0,
                        'topic-link' : 'map.html?viewpoint=' + viewpoint_id + '&topic=' + row.value.narrower.id
                 });
            }
        })
    }

    function displayCorpus(dataCorpus){
    
      //Cette partie de la fonction permet d'afficher le nombre de vitraux pour chaque parcours
       $.each(dataCorpus.rows,function(index,row){
           if(row.value.topic){
                var currentItem = courseList.get('id',row.value.topic.id)[0];
                //Important, car il est possible que une item ne soit pas dans la liste
                if(typeof currentItem != 'undefined'){
                    currentItem.values({
                        'items-nb' : currentItem.values()['items-nb'] + 1,
                    });
                }
           }
       });

      //Cette partie de la fonction permet d'afficher le nombre de lieux pour chaque parcours
      $.each(dataCorpus.rows,function(indexSpatial,rowSpatial){
         if(rowSpatial.value.spatial){
            var id_row = rowSpatial.id,
                lieu = rowSpatial.value.spatial;
            $.each(dataCorpus.rows,function(indexTopic,rowTopic){
                if(rowTopic.value.topic && rowTopic.id == id_row){
                    console.log(rowTopic);
                    if(rowTopic.value.topic == "c0eb2f317cb1354cbb188e474e5b5a3a" ){
                        console.log(lieu);
                    }
                   var currentItem = courseList.get('id',rowTopic.value.topic.id)[0];
                   //Il est important de vérifier que la location n'est pas déjà présente(éviter les doublons)
                   if(typeof currentItem != 'undefined' && currentItem.values()['locations_name'].indexOf(lieu) == -1){
                         var locationNames = currentItem.values()['locations_name'].push(lieu);
                         currentItem.values({
                             'locations' : currentItem.values()['locations'] + 1
                         })
                   }

                }
            })
         }
      })
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
