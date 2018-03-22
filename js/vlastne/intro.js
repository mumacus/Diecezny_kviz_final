var isPlaying = false;

$(function () {
    $(window).keydown(function(e) {
        keydownSpolocne(e);
        if (e.keyCode == 32) {       //space
            if ("activeElement" in document) {
                document.activeElement.blur();
            }
            hrajVideo();
        } else if (e.keyCode == 27) {       //esc
            skryVideo();
        }  else if (e.keyCode == 82) {       //R
            $('#videoWrapperIntro video')[0].pause()
            $('#videoWrapperIntro video')[0].currentTime = 0;
        }
    });
});

//prehravanie
function hrajVideo() {
    if($('#videoWrapperIntro').css('display') == 'none'){
        $('#videoWrapperIntro').fadeIn(200, function() {
            if ($('#videoWrapperIntro video')[0].paused) {
                $('#videoWrapperIntro video')[0].play();
            } else {
                $('#videoWrapperIntro video')[0].pause();
            }
        });
    } else {
        if ($('#videoWrapperIntro video')[0].paused) {
            $('#videoWrapperIntro video')[0].play();
        } else {
            $('#videoWrapperIntro video')[0].pause();
        }
    }
}
function skryVideo() {
    $('#videoWrapperIntro video')[0].pause();
    $('#videoWrapperIntro').fadeOut(200);
}
