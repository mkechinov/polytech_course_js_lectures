function startApp() {
    showPage('home');
}



function showPage(pageName) {

    // Скрыть все
    hidePages();

    // Показать нужную страницу
    var page = document.getElementById("page-" + pageName);
    if(page != null) {
        page.style = "display: block";
    }

    // Отметить нужный пункт меню
    var menu = document.getElementById("menu-" + pageName);
    if(menu != null) {
        menu.className = "menu active";
    }

    // В зависимости от выбранной страницы вызываем соответствующую функцию
    switch(pageName) {
        case 'home':
            showPageHome();
            break;
        case 'groups':
            showPageGroups();
            break;
        case 'students':
            showPageStudents();
            break;
    }

}


function showPageHome() {
    var totalPeople = people.length;
    document.getElementById('total-people').innerHTML = totalPeople;
    var allMale = getAllMale(people);
    document.getElementById('total-male').innerHTML = allMale.length;
    var allFemale = getAllFemale(people);
    document.getElementById('total-female').innerHTML = allFemale.length;

    var totalAge = 0;
    for(var i = 0; i < people.length; i++) {
        totalAge = totalAge + people[i].age;
    }
    document.getElementById('average-age').innerHTML = Math.round( totalAge / people.length );

    document.getElementById('total-groups').innerHTML = getAllGroups(people).length;
}


function showPageGroups() {

}

function showPageStudents() {

}


function getAllGroups(elements) {
    var groups = [];
    for(var i = 0; i < elements.length; i++) {
        if( groups.indexOf( elements[i].group ) == -1 ) {
            groups.push( elements[i].group );
        }
    }
    return groups;
}


function getAllMale(elements) {
    var selectedElements = [];
    for(var i = 0; i < elements.length; i++) {
        if( elements[i].gender == 'm' ) {
            selectedElements.push( elements[i] );
        }
    }
    return selectedElements;
}


function getAllFemale(elements) {
    var selectedElements = [];
    for(var i = 0; i < elements.length; i++) {
        if( elements[i].gender == 'f' ) {
            selectedElements.push( elements[i] );
        }
    }
    return selectedElements;
}




function hidePages() {

    // Найти все элементы с классом .page
    var elements = document.getElementsByClassName('page');

    // Перебрать их в цикле
    for(var i = 0; i < elements.length; i++) {

        // Каждому отметить display: none;
        elements[i].style = 'display: none';

    }
    
    var menu_elements = document.getElementsByClassName('menu');
    for(var i = 0; i < menu_elements.length; i++) {
        menu_elements[i].className = 'menu';
    }

}


