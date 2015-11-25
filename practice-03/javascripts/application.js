function startApplication() {

    // Скрываем все экраны
    hideAllPages();

    // Отображаем главный экран
    showPage('dashboard');

}


function showPage(pageName) {

    // Скрываем все страницы
    hideAllPages();

    // Отображаем заказанную страницу
    var element = document.getElementById('page-' + pageName);
    if(element) {

        element.className = element.className.replace('hidden', '');
        var link = document.getElementById('link-page-' + pageName);
        if(link) {
            link.className = 'active';
        }

        // Рассчитываем цифры и отображаем их для главной страницы
        if(pageName == 'dashboard') {
            drawDashboardValues();
        }

        if(pageName == 'students') {
            drawStudents();
        }

        if(pageName == 'groups') {
            drawGroups();
        }

        if(pageName == 'addstudent') {
            drawAddForm();
        }

    }

}

function drawAddForm() {
    // Очистить все поля
}

function processAddForm(e) {

    e.preventDefault();

    var data = {
        firstName: null,
        lastName: null,
        gender: null,
        age: null,
        group: null
    };

    // Собираем значения

    var fields = document.getElementById('form-addstudent').getElementsByTagName('input');
    var field = null;

    for(var i = 0; i < fields.length; i++) {

        field = fields[i];

        if(field.name == 'first_name' && field.value != '') {
            data.first_name = field.value;
        }
        if(field.name == 'last_name' && field.value != '') {
            data.last_name = field.value;
        }
        if(field.name == 'age' && field.value != '') {
            data.age = parseInt(field.value, 10);
        }
        if(field.name == 'group' && field.value != '') {
            data.group = parseInt(field.value, 10);
        }
        if(field.name == 'gender' && field.checked == true) {
            data.gender = field.value;
        }

    }

    // Проверяем значения

    if(data.first_name == null) {
        alert('Укажите имя');
        return;
    }

    if(data.last_name == null) {
        alert('Укажите фамилию');
        return;
    }

    if(data.age == null || data.gender == 0) {
        alert('Укажите возраст');
        return;
    }

    if(data.group == null || data.group == 0) {
        alert('Укажите группу');
        return;
    }

    if(data.gender == null) {
        alert('Укажите пол');
        return;
    }

    // Сохраняем студента в базу
    var student = {
        "_id": "5630ecd066d7e7e5a488e73e",
        "age": data.age,
        "group": data.gropu,
        "name": {
            "first": data.first_name,
            "last": data.last_name
        },
        "gender": data.gender
    };


}

function drawGroups() {

    var myHTML = '';

    //<tr>
    //    <td>Группа #id#</td>
    //    <td>
    //        <p>Мужчин: #male#</p>
    //        <p>Женщин: #female#</p>
    //        <p>Средний возраст: #age#</p>
    //    </td>
    //</tr>
    var template = "<tr><td>Группа #id#</td><td><p>Мужчин: #male#</p><p>Женщин: #female#</p><p>Средний возраст: #age#</p></td></tr>";
    var temporaryString = '';
    var stats = null;

    var groups = getGroups();

    for(var i = 0; i < groups.length; i++) {

        temporaryString = template;
        stats = groupStatistics(groups[i]);

        temporaryString = temporaryString.replace('#id#', groups[i]);
        temporaryString = temporaryString.replace('#male#', stats.male);
        temporaryString = temporaryString.replace('#female#', stats.female);
        temporaryString = temporaryString.replace('#age#', stats.average_age);

        myHTML = myHTML + temporaryString;

    }

    var myTableElement = document.getElementById('groups-list');
    var myTableBody = myTableElement.getElementsByTagName('tbody')[0];
    myTableBody.innerHTML = myHTML;

}


/**
 * Строит массив со списком групп и возвращает их список
 * @return {Array}
 */
function getGroups() {
    var groups = [];
    for(var i = 0; i < people.length; i++) {
        if( groups.indexOf(people[i].group) == -1 ) {
            groups.push( people[i].group );
        }
    }
    groups = groups.sort();
    return groups;
}


/**
 *
 * @param groupId
 * @returns {{male: number, female: number, total_age: number, average_age: number, total_people: number}}
 */
function groupStatistics(groupId) {

    var persons = getPeopleInGroup(groupId);

    var data = {
        male: 0,
        female: 0,
        total_age: 0,
        average_age: 0,
        total_people: 0
    };

    data.total_people = persons.length;

    for(var i = 0; i < persons.length; i++) {
        if(persons[i].gender == 'f') {
            data.female++;
        }
        if(persons[i].gender == 'm') {
            data.male++;
        }
        data.total_age += persons[i].age;
    }

    data.average_age = data.total_age / data.total_people;

    return data;

}

/**
 *
 * @param groupId
 * @returns {Array}
 */
function getPeopleInGroup(groupId) {
    var list = [];
    for(var i = 0; i < people.length; i++) {
        if(people[i].group == groupId) {
            list.push(people[i]);
        }
    }
    return list;
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
    var linkElement = null;
    for(var i = 0; i < elements.length; i++) {
        if ( elements[i].className.indexOf("hidden") == -1 ) {
            elements[i].className += ' hidden';
            linkElement = document.getElementById('link-' + elements[i].id);
            if(linkElement) {
                linkElement.className = '';
            }
        }
    }
}

