$(function () {

    generujVidea();

    $(window).keydown(function(e) {
        keydownSpolocne(e);
        if (e.keyCode == 32) {       //space
            if ("activeElement" in document) {
                document.activeElement.blur();
            }
            $('#sourceList button').focus().blur();
            hrajVideo();
        }
    });
});

function generujVidea(){
    var videoTlacidla = '';
    for(var i = 0; i < pocetVidei; i++){
        var indexik = i + 1;
        videoTlacidla += '<div><button id="v' + indexik + '">' + indexik + '</button></div>';
    }
    //videoTlacidla += '<p class="stopFloat"></p>';
    $('#sourceList').html(videoTlacidla);

    $('#sourceList button').click(zmenVideo);
}

//zmena videa
function zmenVideo() {
    $('#videoWrapper video')[0].pause();
    $('#videoWrapper video')[0].currentTime = 0;
    var cesta = 'data/video/' + $(this).attr('id') + '.mp4';
    $('#videoWrapper video source').attr({ src: cesta });
    $('#videoWrapper video')[0].load();
}

//prehravanie
function hrajVideo() {
    if ($('#videoWrapper video')[0].paused) {
        $('#videoWrapper video')[0].play();
    } else {
        $('#videoWrapper video')[0].pause();
    }
}
