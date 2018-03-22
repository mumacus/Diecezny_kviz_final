
/* VSEOBECNE */
var vInpute = false;
$(function () {
    $('#mainMenuHide').click(function () { animujMenu(-280); });
    $('#mainMenuShow').click(function () { animujMenu(0); });
    //tabulka
    generujTabulku();

    $('input').blur(function() {
        vInpute = false;
    }).focus(function() {
        vInpute = true;
    });
});

//generovanie tabulky
function generujTabulku(){
    var tabulka = '<table>' +
    '<tr>' +
    '<td colspan="4">' +
    '<h2>Tabuľka výsledkov</h2>' +
    '</td>' +
    '</tr>';
    for(var i = 0; i < zoznamTimov.length; i++){
        tabulka += '<tr id="' + i + '">' +
        '<td>' + zoznamTimov[i] + '</td>' +
          '<td class="out">0</td>' +
          '<td>' +
            '<input class="tabInput" type="text">' +
          '</td>' +
          '<td>' +
            '<button class="tabBtn">+</button>' +
          '</td>' +
        '</tr>';
    }
    tabulka += '</table>';
    $('#scoreTable').html(tabulka);
    nacitajTabulku();
    $('.tabBtn').click(function () { pridajBodyDoTabulky($(this)); });
    $('.tabInput').keydown(function (e) {
        if (e.keyCode == 13) {    //enter
            pridajBodyDoTabulky($(this));
        }
    });
}


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
    } else if(!vInpute && $('#scoreTable').css('display') == 'none'){
        if (e.keyCode == 49 || e.keyCode == 97){                //1
            window.location.href = "index.html";
        } else if (e.keyCode == 50 || e.keyCode == 98){         //2
            window.location.href = "videa.html";
        } else if (e.keyCode == 51 || e.keyCode == 99){         //3
            window.location.href = "piesne.html";
        } else if (e.keyCode == 52 || e.keyCode == 100){        //4
            window.location.href = "slova.html";
        } else if (e.keyCode == 53 || e.keyCode == 101){        //5
            window.location.href = "party.html";
        } else if (e.keyCode == 54 || e.keyCode == 102){        //6
            window.location.href = "odhad.html";
        }
    }
}
