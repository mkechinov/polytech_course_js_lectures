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

    // Рассчитываем цифры и отображаем их для главной страницы
    if(pagename == 'dashboard') {
        drawDashboardValues();
    }

}

function hideAllPages() {
    var elements  = document.body.getElementsByClassName('page');
    for(var i = 0; i < elements.length; i++) {
        if ( elements[i].className.match("hidden") == null ) {
            elements[i].className += ' hidden';
            document.getElementById('link-' + elements[i].id).className = '';
        }
    }
}




function drawDashboardValues() {

    // Здесь будем хранить нужные промежуточные значения
    var male = 0;
    var female = 0;
    var total_age = 0;
    var groups = [];

    // Собираем статистику
    for(var i = 0; i < people.length; i++) {
        total_age += people[i].age;
        if(people[i].gender == 'f') {
            female++;
        }
        if(people[i].gender == 'm') {
            male++;
        }
        if(groups.indexOf(people[i].group) == -1) {
            groups[groups.length] = people[i].group;
        }
    }

    var total_persons = male + female;
    var average_group_size = Math.round(total_persons / groups.length);
    var average_age = Math.round(total_age / total_persons);
    var average_male = Math.round(male / groups.length);
    var average_female = Math.round(female / groups.length);

    // Отображаем статистику
    document.getElementById('total-groups').innerText = groups.length.toString();
    document.getElementById('total-persons').innerText = total_persons.toString();
    document.getElementById('total-male').innerText = male.toString();
    document.getElementById('total-female').innerText = female.toString();
    document.getElementById('average-group-size').innerText = average_group_size.toString();
    document.getElementById('average-age').innerText = average_age.toString();
    document.getElementById('average-male').innerText = average_male.toString();
    document.getElementById('average-female').innerText = average_female.toString();


}