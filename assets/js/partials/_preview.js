function getVitrailId() {
    var id = getUrlParameter("id");
    var topic = getUrlParameter("topic");
    var viewpoint = getUrlParameter("viewpoint");
    var spatial = getUrlParameter("spatial");

    $.ajax({
        url: 'http://steatite.hypertopic.org/corpus/Vitraux - Bénel',
        dataType: 'json',
        success: function (data) {
            $.each(data.rows, function (index, s) {
                if (s.value.resource && s.key[1] === id) {
                    $('.preview-img').attr('src', s.value.resource);
                    $('#found-btn').attr('onclick', 'found("' + id + '","' + spatial + '","' + topic + '","' + viewpoint + '")');
                    $('#back').attr('href', 'explore.html?topic=' + topic + '&viewpoint=' + viewpoint + '&spatial=' + spatial);
                }
                if (s.value.name) {
                    if (s.key[1] === id) {
                        $(".title").text(s.value.name);
                    }
                }
            });
        }
    });
    if (localStorage.getItem(id)) {
        $('#found-btn').text("Description");
    }
}

function found(id, spatial, topic, viewpoint) {
    localStorage.setItem(id, true);
    PUSH({url: 'description.html?id=' + id + '&' + 'topic=' + topic + '&viewpoint=' + viewpoint + '&spatial=' + spatial, transition: 'slide-in'});
}
