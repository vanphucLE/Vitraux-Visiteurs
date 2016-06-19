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

window.addEventListener('push', checkPage);
$(document).ready(checkPage);
