function getLocationVitraux() {
    if (getUrlParameter("viewpoint") !== undefined) {
        var viewpoint = getUrlParameter("viewpoint"),
            topic = getUrlParameter("topic"),
            spatial = decodeURIComponent(getUrlParameter("spatial"));
    }
    $('#back').attr('href', 'map.html?+&viewpoint=' + viewpoint + '&topic=' + topic);
    $('.place-name').text(spatial);
    

       Promise.all([
        requestFactory('http://steatite.hypertopic.org/corpus/Vitraux - Bénel',affichageImageVitraux),
        requestFactory('http://argos2.hypertopic.org/topic/' + viewpoint + '/' + topic,affichageStructure)
        ]);


    function affichageStructure(dataTopic){
        dataTopic.rows.forEach(function(itemTopic){
            if(itemTopic.value.item && itemTopic.value.item.corpus === "Vitraux - Bénel"){
                var name = itemTopic.value.item.name,
                    item_id = itemTopic.value.item.id,
                    display = (localStorage.getItem(item_id)) ? 'inline' : 'none',
                    url = ((localStorage.getItem(item_id)) ? 'description.html' : 'preview.html') + '?id='+item_id+'&topic='+topic+'&viewpoint='+viewpoint+'&spatial='+spatial,
                    item = '<li id="' + item_id + '" class="table-view-cell">' +
                            '<a class="navigate-right" href="' + url + '" data-transition="slide-in">' +
                                '<div class="stained-glass-desc">' +
                                    '<h3 class="stained-glass-name">'+name+'</h3>' +
                                    '<button style="display:' + display + '" class="btn btn-outlined btn-positive">' +
                                    '<span class="fa fa-check"></span> Trouvé</button>' +
                                '</div>' +
                                '<div class="stained-glass-img">' +
                                    '<img class="table-img" src="http://steatite.hypertopic.org/thumbnail/'+item_id+'" >' +
                                '</div></a></li>';
                $('#stainted-glass-windows').append(item);
            }else if(itemTopic.value.name){
                $(".title").text('Parcours "' + itemTopic.value.name + '"');
            }
        });
    }


    function affichageImageVitraux(dataVitraux){
        dataVitraux.rows.forEach(function(itemVitraux){
            if(itemVitraux.value.name){
                $("#" + itemVitraux.key[1]).find('.stained-glass-name').text(itemVitraux.value.name);
                $("#" + itemVitraux.key[1]).find("img").attr('alt', itemVitraux.value.name);
            }
        });
    }


    // $.ajax({
    //     url: 'http://argos2.hypertopic.org/corpus/Vitraux - Bénel',
    //     dataType: 'json',
    //     success: function (corpus) {
    //         $.each(corpus.rows, function (index, c) {
    //             if (c.value.spatial) {
    //                 if (c.value.spatial !== spatial) {
    //                     var selector = $("#" + c.key[1]);
    //                     if (selector.length) {
    //                         selector.remove();
    //                     }
    //                 }
    //             }
    //         });
    //         var nbItems = $("#stainted-glass-windows li").length - 1;
    //         $("#text-info-vitraux1").text(getItemText(nbItems, "le vitrail", "les vitraux"));
    //         $("#text-info-vitraux2").text(getItemText(nbItems, "le", "les"));
    //     }
    // });
}
