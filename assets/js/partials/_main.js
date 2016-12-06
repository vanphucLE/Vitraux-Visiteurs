var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var uniq = function (a) {
    var seen = {};
    return a.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
};

var getItemText = function (count, sing, plur) {
    return (count === 1) ? sing : plur;
};

var getCourseDuration = function (total_min) {
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
};

var checkPage = function () {
    var page = $('div.content').attr('id');
    switch (page) {
        case 'courses':
            initList();
            getCoursesList();
            break;
        case 'map-page':
            initialize();
            getCourseMap();
            break;
        case 'explore-page':
            getLocationVitraux();
            break;
        case 'preview-page':
            getVitrailId();
            break;
        case 'description-page':
            getDescription();
            break;
    }
};


function requestFactory(url,display){
          var request =  $.ajax({
                    type: 'GET',
                    url: url,
                    dataType: 'json',
                    success: function(data){
                        display(data);
                    }
                })

         return request;
}

window.addEventListener('push', checkPage);
$(document).ready(checkPage);
