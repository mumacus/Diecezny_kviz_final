$(function () {

    generujParty();

    //vstupy z klavesnice
    $(window).keydown(function (e) {
        keydownSpolocne(e);
        keydownCasAbody(e);
        //party
        if (e.keyCode == 13) {       //enter
            $('#partyText').stop().fadeToggle();
        } else if (e.keyCode == 37) {       //lava sipka
            zmena(-1);
        } else if (e.keyCode == 39) {       //prava sipka
            zmena(1);
        }
    });
});

function generujParty(){
    var partyTlacidla = '';
    for(var i = 0; i < zoznamOtazok.length; i++){
        var indexik = i + 1;
        partyTlacidla += '<button><span hidden>' + indexik +
        '. ' + zoznamOtazok[i] + '</span></button>';
    }
    partyTlacidla += '<p class="stopFloat"></p>';
    $('#sourceListParty').html(partyTlacidla);

    $('#partyText').html($('#sourceListParty button').first().children('span').html());
    $('#sourceListParty button').first().addClass('active');
    $('#sourceListParty button').click(function () { zmena(false, $(this)) });
}

function zmena(smer, toto) {
    if (smer !== false) {
        var novyIndex = $('#sourceListParty button.active').index('#sourceListParty button') + smer;
        if (novyIndex < 0) novyIndex = $('#sourceListParty button').length - 1;
        else if (novyIndex >= $('#sourceListParty button').length) novyIndex = 0;
        toto = $('#sourceListParty button').eq(novyIndex);
    }
    var index = toto.index() + 1;
    $('#sourceListParty button.active').removeClass('active');
    toto.addClass('active');
    $('#partyText').fadeOut(200, function () {
        $(this).html(toto.children('span').html());
    });
    zmenObrazok(index);
    if ("activeElement" in document) {
        document.activeElement.blur();
    }
    $('#sourceList button').focus().blur();
}
function zmenObrazok(index) {
    $('#partyObr').fadeOut(200, function () {
        var cesta = "url('data/images/party/p" + index + ".jpg')";
        $(this).css('background-image', cesta).fadeIn(200);
    });
}
