function getDescription() {
    var id = getUrlParameter("id");
    var spatial = getUrlParameter("spatial");
    var viewpoint = getUrlParameter("viewpoint");
    var topic = getUrlParameter("topic");

    $('#back').attr('href', 'explore.html?topic=' + topic + '&viewpoint=' + viewpoint + '&spatial=' + spatial);

    $.ajax({
        url: "http://steatite.hypertopic.org/corpus/Vitraux - Bénel",
        type: "GET",
        dataType: 'json',
        success: function (data) {
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
            $("#vitrail-thumbnail").find("img").attr("src", thumb);
            $("#vitrail-thumbnail").find("img").attr("alt", name);
            $("#vitrail-resource").attr("src", imgUri);
            $("#vitrail-resource").attr("alt", name);
        }
    });
}
