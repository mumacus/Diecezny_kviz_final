$(function () {

    generujOdhad();

    //vstupy z klavesnice
    $(window).keydown(function (e) {
        keydownSpolocne(e);
        //odhad
        if (e.keyCode == 13) {       //enter
            zobrazOtazku();
        } else if (e.keyCode == 32) {       //space
            zatocKolesom();
        } else if (e.keyCode == 37) {       //lava sipka
            zmena(-1);
        } else if (e.keyCode == 39) {       //prava sipka
            zmena(1);
        } else if (e.keyCode == 75) {       //K
            $('#kolesoHolder').fadeToggle(300);
        } else if (e.keyCode == 27) {       //esc
            $('#kolesoHolder').fadeOut(300);
        }
    });
});
var uhol;
var hudbaKoleso = new Audio('data/audio/misc/koleso.mp3');
$(hudbaKoleso).attr('loop', '');
function zatocKolesom(){
    if($('#kolesoHolder').css('display') != 'none'){
        hudbaKoleso.currentTime = 0;
        hudbaKoleso.play();
        var nahoda = Math.floor(Math.random() * 16);
        uhol = nahoda * 22.5;
        var velkyUhol = uhol + 360 * pocetOtoceni;
        animujTocenie(velkyUhol, casTocenia, function(){
            var konec = new Audio('data/audio/misc/koniec.mp3');
            hudbaKoleso.pause();
            konec.play();
            animujTocenie(uhol, 0);
        });
    }
}

function animujTocenie(uhlik, trvanie, koniec){
    $('#kolesoHolder .koleso').stop().animate({ borderSpacing: uhlik }, {
        step: function(now,fx) {
            $(this).css('-webkit-transform','rotate('+now+'deg)');
            $(this).css('-moz-transform','rotate('+now+'deg)');
            $(this).css('transform','rotate('+now+'deg)');
        },
        duration: trvanie,
        easing: 'swing',
        complete: koniec
    });
}

function zobrazOtazku(){
    $('#odhadOtazka').stop().fadeToggle(200, function(){});
}

function generujOdhad(){
    var odhadTlacidla = '';
    for(var i = 0; i < zoznamOtazokOdhad.length; i++){
        var indexik = i + 1;
        odhadTlacidla += '<button>' +
        '<span class="otazka" hidden>' + zoznamOtazokOdhad[i] + '</span>' +
        '</button>';
    }
    odhadTlacidla += '<p class="stopFloat"></p>';
    $('#sourceListOdhad').html(odhadTlacidla);

    $('#odhadOtazka').html($('#sourceListOdhad button').first().children('span.otazka').html());
    $('#sourceListOdhad button').first().addClass('active');
    $('#sourceListOdhad button').click(function () { zmena(false, $(this)) });
}

function zmena(smer, toto) {
    if (smer !== false) {
        var novyIndex = $('#sourceListOdhad button.active').index('#sourceListOdhad button') + smer;
        if (novyIndex < 0) novyIndex = $('#sourceListOdhad button').length - 1;
        else if (novyIndex >= $('#sourceListOdhad button').length) novyIndex = 0;
        toto = $('#sourceListOdhad button').eq(novyIndex);
    }
    var index = toto.index() + 1;
    $('#sourceListOdhad button.active').removeClass('active');
    toto.addClass('active');
    $('#odhadOtazka').fadeOut(200, function () {
        $('#odhadOtazka').html(toto.children('span.otazka').html());
    });
    zmenObrazok(index);
    if ("activeElement" in document) {
        document.activeElement.blur();
    }
    $('#sourceList button').focus().blur();
}
function zmenObrazok(index) {
    $('#odhadObr').fadeOut(200, function () {
        var cesta = "url('data/images/odhad/o" + index + ".jpg')";
        $(this).css('background-image', cesta).fadeIn(200);
    });
}
