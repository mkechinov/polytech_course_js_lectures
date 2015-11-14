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

    if(pagename == 'students') {
        drawStudents();
    }

}

function drawStudents() {

    var myHTML = '';
    var template = "<tr><td>#name#</td><td>#age#</td><td>#gender#</td></tr>";
    var temporaryString = '';

    for(var i = 0; i < people.length; i++) {

        temporaryString = template;

        temporaryString = temporaryString.replace('#name#', people[i].name.first + " " + people[i].name.last);

        temporaryString = temporaryString.replace('#age#', people[i].age);

        if( people[i].gender == 'm' ) {
            temporaryString = temporaryString.replace('#gender#', 'Мужской');
        } else {
            temporaryString = temporaryString.replace('#gender#', 'Женский');
        }

        //temporaryString = temporaryString.replace('#gender#', (people[i].gender == 'm' ? 'Мужской' : 'Женский') );


        myHTML = myHTML + temporaryString;

    }

    var myTableElement = document.getElementById('students-list');
    var myTableBody = myTableElement.getElementsByTagName('tbody')[0];
    myTableBody.innerHTML = myHTML;
}

function drawDashboardValues() {
    var male = 0;
    var female = 0;
    var total_persons = people.length;
    var groups = [];
    var total_age = 0;

    for(var i = 0; i < people.length; i++ ) {

        if( people[i].gender == "m" ) {
            male++;
        }
        if( people[i].gender == "f" ) {
            female++;
        }

        total_age += people[i].age;

        if( groups.indexOf(people[i].group) == -1 ) {
            // groups[groups.length] = people[i].group;
            groups.push( people[i].group ); // << Так круче
        }


    }

    document.getElementById('total-male').innerText = male;
    document.getElementById('total-female').innerText = female;
    document.getElementById('total-persons').innerText = total_persons;
    document.getElementById('average-group-size').innerText = Math.round(total_persons / groups.length);
    document.getElementById('average-male').innerText = Math.round(male / groups.length);
    document.getElementById('average-female').innerText = Math.round(female / groups.length);
    document.getElementById('total-groups').innerText = groups.length;
    document.getElementById('average-age').innerText = Math.round(total_age / total_persons);

}

function hideAllPages() {
    var elements  = document.body.getElementsByClassName('page');
    for(var i = 0; i < elements.length; i++) {
        if ( elements[i].className.indexOf("hidden") == -1 ) {
            elements[i].className += ' hidden';
            document.getElementById('link-' + elements[i].id).className = '';
        }
    }
}

