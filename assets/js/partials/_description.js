function getDescription(corpusS) {
    var id = getUrlParameter("id");
    var spatial = getUrlParameter("spatial");
    var viewpoint = getUrlParameter("viewpoint");
    var topic = getUrlParameter("topic");

    $('#back').attr('href', 'explore.html?topic=' + topic + '&viewpoint=' + viewpoint + '&spatial=' + spatial);

      Promise.all([requestFactory('http://argos2.hypertopic.org/viewpoint/' + viewpoint,getTheme)].concat(corpusS.map(function(text){
        return requestFactory(text,displayImage);
    })))


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

    //getTheme(viewpoint,topic);


function getTheme(data){

}


function getTheme(data){
            var topics = [];
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
            f(data,topic);
            topics = topics.reverse().join(' > ');
            $('#description-complete').append('<div><h3>'+data.rows[0].value.name+'</h3><p class="content-padded description">'+topics+'</p></div>');

}


}

