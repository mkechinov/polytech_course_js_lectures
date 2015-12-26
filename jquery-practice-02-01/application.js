//document.addEventListener('DOMContentLoaded', start);
$(document).ready(start);

function start() {

    $('#date').datepicker();

    var html = '';
    var a = getRandom(500, 1000);
    for(var i = 0; i < a; i++) {
        html += '<div class="block ' + getRandomColor() + '"></div>';
    }

    //document.getElementById('blocks-will-be-here').innerHTML = html;
    $('#blocks-will-be-here').html(html);



    // Инициализируем кнопки

    // 1. Сгенерировать HTML из цветов.
    var colors = allColors();
    var html = '';
    for(var i = 0; i < colors.length; i++) {
        html += '<a class="toggle" data-color="' + colors[i] + '">Toggle ' + colors[i] + '</a>';
    }

    // 2. Поместить на страницу.
    $('.controls').html(html);

    // 3. Инициализировать button().
    // 4. Обрабатывать клики.
    $('a.toggle').button().on('click', function(){
        //var color = $(this).data('color');
        //$('.' + color).toggle();
        $('.' + $(this).data('color')).toggle();
    });


    //$('#toggle-red').button().on('click', function(){
    //    $('.red').toggle();
    //});
    //$('#toggle-green').button().on('click', function(){
    //    $('.green').toggle();
    //});
    //$('#toggle-blue').button().on('click', function(){
    //    $('.blue').toggle();
    //});


}



function getRandomColor() {
    //var colors = ["red", "green", "blue", "yellow", "orange", "purple"];
    var colors = allColors();
    //var randomPosition = Math.floor( Math.random() * colors.length );
    //var randomPosition = getRandom( colors.length );
    return colors[ getRandom(0, colors.length) ];
}

function allColors() {
    return ["red", "green", "blue", "yellow", "orange", "purple"];
}


function getRandom(min, max) {
    return min + Math.floor( Math.random() * (max - min) );
    //return Math.floor( Math.random() * max );
}

