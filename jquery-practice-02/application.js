$(document).ready(start);

function start() {
    drawBlocks(500);
    initButtons();
}

function drawBlocks(n) {
    var html = '';
    n = parseInt(n);
    if(n < 1) {
        n = 50;
    }
    if(n > 500) {
        n = 500;
    }
    for(var i = 0; i < n; i++) {
        html += '<div class="block ' + getRandomColor() + '"></div>'
    }
    $('#blocks-will-be-here').html(html);
}

function getRandomColor() {
    var colors = ['red', 'green', 'blue'];
    var maxRandom = colors.length; // 3
    var finalRandom = getRandomNumber(maxRandom); // 0..2
    return colors[finalRandom]; // 'red' || 'green' || 'blue'
}

function getRandomNumber(max) {
    var random = Math.random() * max; // example: 0.33343*3 = 1.0002
    var randomInteger = Math.floor( random ); // 1
    return randomInteger;
}


function initButtons() {
    $('a#toggle-red').button().click(toggleRed);
    $('a#toggle-green').button().click(toggleGreen);
    $('a#toggle-blue').button().click(toggleBlue);
}

function toggleRed() {
    $('.block.red').toggle();
}
function toggleGreen() {
    $('.block.green').toggle();
}
function toggleBlue() {
    $('.block.blue').toggle();
}