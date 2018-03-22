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
        }
    });
});
var uhol;
function zatocKolesom(){
    var nahoda = Math.floor(Math.random() * 16);
    uhol = nahoda * 22.5;
    var velkyUhol = uhol + 360 * 4;
    $('#kolesoHolder .koleso').stop().animate({ borderSpacing: velkyUhol }, {
        step: function(now,fx) {
            $(this).css('-webkit-transform','rotate('+now+'deg)');
            $(this).css('-moz-transform','rotate('+now+'deg)');
            $(this).css('transform','rotate('+now+'deg)');
        },
        duration: 2000,
        easing: 'swing',
        complete: function(){
            $('#kolesoHolder .koleso').css('-webkit-transform', 'rotate(' + uhol + 'deg)');
            $('#kolesoHolder .koleso').css('-moz-transform', 'rotate(' + uhol + 'deg)');
            $('#kolesoHolder .koleso').css('transform', 'rotate(' + uhol + 'deg)');
        }
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
