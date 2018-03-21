$(function () {
    //zmena audia
    $('#playBtn').click(hrajAudio);
    $('#sourceList button').click(zmenAudio);

    //vstupy z klavesnice
    $(window).keydown(function (e) {

        keydownSpolocne(e);
        if (e.keyCode == 32) {       //space
            if ("activeElement" in document) {
                document.activeElement.blur();
            }
            $('#playBtn').focus().blur();
            hrajAudio();
        } else if (e.keyCode == 13) {       //enter
            zmenObrazok();
        } else if (e.keyCode == 82) {       //R
            $('#audioWrapper audio')[0].pause()
            $('#audioWrapper audio')[0].currentTime = 0;
        }
    });
});

function hrajAudio() {
    if ($('#audioWrapper audio')[0].paused) {
        $('#audioWrapper audio')[0].play();
    } else {
        $('#audioWrapper audio')[0].pause();
    }
    //pre istotu
    $('#playBtn').focus().blur();
}
function zmenAudio() {
    $('#audioWrapper audio')[0].pause();
    $('#audioWrapper audio')[0].currentTime = 0;
    var cesta = 'data/audio/piesne/' + $(this).attr('id') + '.mp3';
    $('#audioWrapper audio source').attr({ src: cesta });
    $('#audioWrapper audio')[0].load();
    zmenObrazok(true);
}
function zmenObrazok(origosh) {
    $('#audioWrapper audio')[0].pause();
    if (origosh !== true) {
        var vyhra = new Audio('data/audio/misc/koniec.mp3');
        vyhra.play();
    }
    $('#otaznik').fadeOut(200, function () {
        var cesta = $('#audioWrapper audio source').attr('src');
        var index = cesta.charAt(cesta.length - 5);
        if (origosh === true) cesta = "url('data/images/otaznik.png')";
        else cesta = "url('data/images/piesne/a" + index + ".jpg')";
        $(this).css('background-image', cesta).fadeIn(200);
    });
    //pre istotu
    $('#playBtn').focus().blur();
}
