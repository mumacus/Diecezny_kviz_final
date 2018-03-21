$(function () {
    //zmena videa
    $('#sourceList button').click(zmenVideo);
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
