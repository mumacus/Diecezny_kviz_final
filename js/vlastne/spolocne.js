
/* VSEOBECNE */
$(function () {
    $('#mainMenuHide').click(function () { animujMenu(-280); });
    $('#mainMenuShow').click(function () { animujMenu(0); });
    nacitajTabulku();
    //tabulka
    $('.tabBtn').click(function () { pridajBodyDoTabulky($(this)); });
    $('.tabInput').keydown(function (e) {
        if (e.keyCode == 13) {    //enter
            pridajBodyDoTabulky($(this));
        }
    });
});
//zobrazenie - skrytie menu
function animujMenu() {
    var lavyMargin = (parseInt($('#mainMenu').css('left')) == 0) ? -280 : 0;
    $('#mainMenu').stop().animate({ left: lavyMargin.toString() + 'px' }, 250);
}
//zobrazenie - skrytie tabulky
function toggleTab() {
    $('#scoreTable').fadeToggle(300);
}
//tabulka
function pridajBodyDoTabulky(toto) {
    var index = parseInt(toto.parent().parent().attr('id'));
    var stare = $.cookie('player' + index);
    if (stare === undefined) {
        $.cookie('player' + index, 0, { path: '/' });
        stare = 0;
    }
    var nove = parseInt(stare) + parseInt($('#' + index + ' input').val());
    if (nove || nove === 0) {
        $.cookie('player' + index, nove, { path: '/' });
    }
    nacitajTabulku();
}
//refresh hodnot z tabulky
function nacitajTabulku() {
    var vypisy = $('.out');
    for (var i = 0; i < vypisy.length; i++) {
        var index = parseInt($(vypisy[i]).parent().attr('id'));
        var hodnota = $.cookie('player' + index);
        if (hodnota === undefined) {
            $.cookie('player' + index, 0, { path: '/' });
        }
        $(vypisy[i]).html(hodnota);
        $('#' + index + ' input').val('');
    }
}

//vstupy z klavesnice
function keydownSpolocne(e) {
    if (e.keyCode == 77) {              //M
        animujMenu();
    } else if (e.keyCode == 84) {       //T
        toggleTab();
    } else if (e.keyCode == 27) {       //esc
        $('#scoreTable').fadeOut(300);
    }
}
