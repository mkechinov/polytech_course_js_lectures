function startApplication() {

    // Скрываем все экраны
    hideAllPages();

    // Отображаем главный экран
    showPage('dashboard');

}


function showPage(pagename) {

    // Скрываем все страницы
    hideAllPages();

    // Отображаем заказанную страницу
    var element = document.getElementById('page-' + pagename);
    element.className = element.className.replace('hidden', '');
    document.getElementById('link-page-' + pagename).className = 'active';


}

function hideAllPages() {
    var elements  = document.body.getElementsByClassName('page');
    for(var i in elements) {
        if(elements.hasOwnProperty(i)) {
            if ( elements[i].className.match("hidden") == null ) {
                elements[i].className += ' hidden';
                document.getElementById('link-' + elements[i].id).className = '';
            }
        }
    }
}
