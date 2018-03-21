

//   obcas nepiska


var nazovStranky = document.location.pathname.match(/[^\/]+$/)[0];
nazovStranky = nazovStranky.substring(0, 5);

var body = 0;
var defaultCountdown = 10;
var countdown = defaultCountdown;
var timeLeft = parseFloat(maxTime);
var timerRuns = false;
var maxTime = $.cookie('maxTime' + nazovStranky);
if (maxTime !== undefined) {
    $('#' + nazovStranky + 'Nastavenie input').val(maxTime);
}

$(function () {
    //casovac
    changeMaxTime();
    $('#' + nazovStranky + 'Nastavenie input').on('input', changeMaxTime);
    setInterval(timerLoop, 2 * halfTime);
});

var halfTime = 50;
var vtedy = $.now();
function timerLoop() {  //opakovana funkcia
    var teraz = $.now();
    var delta = (teraz - vtedy) / 1000;
    if (timerRuns) {
        timeLeft -= delta;
        if (timeLeft <= 0) fajront();
    }
    var zobrazenyCas = timeLeft.toFixed(1);
    if (zobrazenyCas == countdown) {
        var dobre = new Audio('data/audio/misc/beep.mp3');
        dobre.play();
        countdown -= 1;
        if (countdown == 0) countdown = defaultCountdown;
    }

    var minuty = Math.floor(timeLeft / 60);
    var vypisanyCas = timeLeft.toFixed(1);
    if (minuty > 0) {
        var zvysok = timeLeft - minuty * 60;
        vypisanyCas = '' + minuty + ':' + zvysok.toFixed(1);
    }

    $('#' + nazovStranky + 'Cas').html(vypisanyCas);
    $('#' + nazovStranky + 'Body').html(body);
    vtedy = teraz;
}

function pridajBod() {
    var dobre = new Audio('data/audio/misc/dobre.mp3');
    dobre.play();
    body += 1;
}
function neuberBod() {
    var zle = new Audio('data/audio/misc/zle.mp3');
    zle.play();
}
function fajront() {
    if(nazovStranky == 'party'){
        var bomba = new Audio('data/audio/misc/explosiveEnd.mp3');
        bomba.play();
        timerRuns = false;
        timeLeft = 0;
        setTimeout(function () {
            var konec = new Audio('data/audio/misc/koniec.mp3');
            konec.play();
        }, 1200);
    } else {
        var konec = new Audio('data/audio/misc/koniec.mp3');
        konec.play();
        timerRuns = false;
        timeLeft = 0;
    }
}
function spustiCasovac() {
    timerRuns = !timerRuns;
}
function changeMaxTime() {
    maxTime = parseInt($('#' + nazovStranky + 'Nastavenie input').val());
    $.cookie('maxTime' + nazovStranky + '', maxTime, { path: '/' });
    timerRuns = false;
    timeLeft = maxTime;
    body = 0;
    if (maxTime <= defaultCountdown)
        countdown = maxTime - 1;
    else
        countdown = defaultCountdown;
}

function keydownCasAbody (e){
    if (e.keyCode == 32) {       //space
        if ("activeElement" in document) {
            document.activeElement.blur();
        }
        spustiCasovac();
    }
    //nastavenia
    else if (e.keyCode == 79) {       //O
        $('#' + nazovStranky + 'Nastavenie').slideToggle(200, function(){
            $('#' + nazovStranky + 'Nastavenie input').focus();
        });
    }
    //body
    else if (e.keyCode == 107) {       //+
        body += 1;
    } else if (e.keyCode == 109 || e.keyCode == 173) {       //-
        body -= 1;
    } else if (timerRuns && e.keyCode == 66) {       //B
        neuberBod();
    } else if (timerRuns && e.keyCode == 78) {       //N
        pridajBod();
    } else if (e.keyCode == 82) {       //R
        changeMaxTime();
    }
}
