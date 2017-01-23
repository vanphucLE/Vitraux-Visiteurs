function getDescription(viewpoints,corpusS) {
    var id = getUrlParameter("id");
    var spatial = getUrlParameter("spatial");
    var viewpoint = getUrlParameter("viewpoint");
    var topic = getUrlParameter("topic");

    $('#back').attr('href', 'explore.html?topic=' + topic + '&viewpoint=' + viewpoint + '&spatial=' + spatial);

      Promise.all(viewpoints.map(function(vp){
        return requestFactory('http://argos2.hypertopic.org/viewpoint/' + vp,getTheme)
      }).concat(corpusS.map(function(text){
        return requestFactory(text,displayImage);
    })));


function displayImage(data) {
            var name, thumb, imgUri;
            $.each(data.rows, function (index, r) {
                if (r.key[1] === id) {
                    if (r.value.name) {
                        name = r.value.name;
                    } else if (r.value.thumbnail) {
                        thumb = r.value.thumbnail;
                    } else if (r.value.resource) {
                        imgUri = r.value.resource;
                    }
                }
            });
            $(".title").text(name);
            $("#vitrailModal").find('.title').text(name + " [Zoom]");
            $("#vitrailModal").find('a.btn').attr('href', imgUri);
            $("#vitrail-thumbnail-new").find("img").attr("src", thumb);
            $("#vitrail-thumbnail-new").find("img").attr("alt", name);
            $("#vitrail-resource").attr("src", imgUri);
            $("#vitrail-resource").attr("alt", name);
        }

function getTheme(data){
            var topicsArray = [],
                topicTemp = [],
                topics = [];
            $('#description-complete').append('<div id="'+data.rows[0].key[0]+'"><h3>'+data.rows[0].value.name+'</h3></div>');
            data.rows.forEach(function(row){
                if(row.value.item && row.value.item.id == id){
                    topicTemp.push(row.key[1]);
                }
            })
            var f = function(r,t){
                var name = "",
                    broader;
                r.rows.forEach(function(e){
                    if(e.key[1] == t){
                        if(e.value.name){
                            name = e.value.name
                        }else if(e.value.broader){
                            broader = e.value.broader;
                        }
                    }
                })
                topics.push(name);
                if(broader){
                    f(r,broader.id);
                }
            }


            topicTemp.map(function(t){
                f(data,t);
                topicsArray.push(topics);
                topics = []
            });
            topicsArray.map(function(e){
                e = e.reverse().join(' > ');
                $('#'+data.rows[0].key[0]).append('<p class="content-padded description">'+e+'</p>')
            })
            
           
            

}


}

