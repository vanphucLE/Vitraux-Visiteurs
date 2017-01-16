function getLocationVitraux(corpusA,corpusS) {
        var viewpoint = getUrlParameter("viewpoint"),
            spatial = decodeURIComponent(getUrlParameter("spatial")),
            topicids = [getUrlParameter("topic")],
            rowids = [];


    $('#back').attr('href', 'map.html?+&viewpoint=' + viewpoint + '&topic=' + topicids[0]);
    $('.place-name').text(spatial);
    


        Promise.all([requestFactory('http://argos2.hypertopic.org/viewpoint/' + viewpoint,getDataViewpoint)].concat(corpusA.map(function(text){
        return requestFactory(text);
    }))).then(function(corpusData){
            corpusData = cleanData(corpusData)
            affichageStructure(corpusData);
            return Promise.all(corpusS.map(function(text){return requestFactory(text,displayImage)}));
        });


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

    function affichageStructure(dataCorpus){
        dataCorpus.map(function(corpus){
            var tempRowids = []
            corpus.rows.forEach(function(row){
                if(row.value.topic && topicids.indexOf(row.value.topic.id) != -1){
                    tempRowids.push(row.id);
                }
            })

            corpus.rows.forEach(function(row){
                if(tempRowids.indexOf(row.id) != -1 && row.value.spatial && row.value.spatial == spatial){
                            var item_id = row.id,
                                url = 'description.html?id='+item_id+'&topic='+topicids[0]+'&viewpoint='+viewpoint+'&spatial='+spatial,
                                item =  '<li id="' + item_id + '" class="table-view-cell">' +
                                        '<a class="navigate-right" href="' + url + '" data-transition="slide-in">' +
                                        '<div class="stained-glass-desc">' +
                                        '<h3 class="stained-glass-name"></h3>' +
                                        '</div>' +
                                        '<div class="stained-glass-img">' +
                                        '<img class="table-img" src="" >' +
                                        '</div></a></li>';
                             $('#stainted-glass-windows').append(item);
                            rowids.push(row.id);
                }       
            });

        })

    }


    function displayImage(metadataCorpus){
            metadataCorpus.rows.forEach(function(vitrail){
                if(rowids.indexOf(vitrail.key[1]) != -1){
                    if(vitrail.value.name){
                        $("#" + vitrail.key[1]).find('.stained-glass-name').text(vitrail.value.name);
                    }else if(vitrail.value.thumbnail){
                         $("#" + vitrail.key[1]).find("img").attr('src', vitrail.value.thumbnail);
                    }
                    
                }
            })
    }




}
