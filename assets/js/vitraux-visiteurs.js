$(document).ready(function () {

//    var getUrl = window.location;
//    var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];

//    window.addEventListener('push', getCourses());
    getCourses();

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
                '<span class="locations"></span> lieux' +
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
    var courseList = new List('courses', options);
    var viewpoints = [
        {
            "id": "56e092d8a6179a788c74b618b29801c0",
            "name": "Histoire des religions"
        },
        {
            "id": "a76306e4f17ed4f79e7e481eb9a1bd06",
            "name": "Histoire de l'art"
        }
    ];

    function getCourses() {
        // GET Corpus Before
        $.ajax({
            type: 'GET',
            url: 'http://argos2.hypertopic.org/corpus/Vitraux - Bénel',
            dataType: 'json',
            success: function (corpus) {

                $.each(viewpoints, function (index, vp) {
                    $.ajax({
                        type: 'GET',
                        url: 'http://argos2.hypertopic.org/viewpoint/' + vp.id,
                        dataType: 'json',
                        success: function (data) {
                            $.each(data.rows, function (index, row) {
                                var topic_title = '';
                                var topic_id = '';
                                var items = [];
                                var locations = [];
                                var link = '';
                                // If topic exists (leaf)
                                if (row.value.narrower) {
                                    $('#courses-num').text(parseInt($('#courses-num').text()) + 1);
                                    topic_title = row.value.narrower.name;
                                    topic_id = row.value.narrower.id;
                                    link = 'map.html?viewpoint=' + vp.id + '&topic=' + topic_id;
                                    courseList.add({
                                        'id': topic_id,
                                        'course-title': 'Parcours "' + topic_title + '"',
                                        'course-vp': "— " + vp.name,
                                        'distance': '0',
                                        'locations': '0',
                                        'duration': '0',
                                        'items-nb': '0 Vitraux'
                                    });
                                    var item = courseList.get('id', topic_id)[0];
                                    item.values({
                                        'topic-link': link
                                    });

                                    $.each(corpus.rows, function (index, row) {
                                        if (row.value.topic) {
                                            if (row.value.topic['viewpoint'] === vp.id && row.value.topic['id'] === topic_id) {
                                                items.push(row.id);
                                                var item_count = parseInt(item.values()['items-nb'].replace(/^\D+/g, '')) + 1;
                                                item.values({
                                                    'items-nb': item_count + ' ' + getItemText(item_count)
                                                });
                                            }
                                        }
                                    });
                                    $.each(corpus.rows, function (index, row) {
                                        if (row.value.spatial) {
                                            if ($.inArray(row.id, items) > -1) {
                                                locations.push(row.value.spatial);
                                            }
                                        }
                                    });
                                    locations = uniq(locations);
                                    var locations_nb = locations.length;
                                    var duration = getParsedDuration(locations_nb * 30);
                                    item.values({
                                        'locations': locations_nb,
                                        'duration': duration
                                    });
                                }
                            });
                        }
                    });
                });
            }
        });
    }

    function uniq(a) {
        var seen = {};
        return a.filter(function (item) {
            return seen.hasOwnProperty(item) ? false : (seen[item] = true);
        });
    }

    function getItemText(count) {
        if (count === 1) {
            return 'Vitrail';
        } else {
            return 'Vitraux';
        }
    }

    function getParsedDuration(total_min) {
        var hours = Math.floor(total_min / 60);
        var minutes = total_min % 60;
        if (hours === 0) {
            if (minutes === 0) {
                return '0';
            }
            return minutes + ' min';
        } else {
            if (minutes === 0) {
                return hours + ' h';
            }
            return hours + 'h' + minutes;
        }
    }
});
