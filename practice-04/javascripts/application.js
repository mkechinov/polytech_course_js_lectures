function startApplication() {

	// Отображаем главный экран
	showPage('dashboard');

}


function showPage(pageName) {

	// Скрываем все страницы
	hideAllPages();

	// Отображаем заказанную страницу
	var element = document.getElementById('page-' + pageName);
	element.className = element.className.replace('hidden', '');
	var menu = document.getElementById('link-page-' + pageName);
	if(menu != null) {
		menu.className = 'active';
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

}

function addStudent(myForm, event) {
	event.preventDefault();

	var newStudent = {
		_id: people.length + 1,
    age: parseInt(myForm.elements.age.value),
    group: parseInt(myForm.elements.group.value),
    name: {
      first: myForm.elements.first_name.value,
      last: myForm.elements.last_name.value
    },
    gender: myForm.elements.gender.value
	}

	people.push(newStudent);

	showPage('dashboard');
}

function showEditStudent(student, event) {
	event.preventDefault();

	var id = student.id.replace('student-', '');
	var age = student.getElementsByTagName('td')[2].textContent;
	var group = student.getElementsByTagName('td')[1].textContent;
	var name = {
		first: student.getElementsByTagName('td')[0].textContent.split(" ")[0],
		last: student.getElementsByTagName('td')[0].textContent.split(" ")[1]
	}

	if (student.getElementsByTagName('td')[3].textContent == "Женский") {
		var gender = "f";
	}
	else {
		var gender = "m";
	}

	var editForm = document.getElementById('edit-student-form')

	editForm.elements.id.value = id;
	editForm.elements.age.value = age;
	editForm.elements.group.value = group;
	editForm.elements.gender.value = gender;
	editForm.elements.first_name.value = name.first;
	editForm.elements.last_name.value = name.last;

	showPage('edit-student');
}

function editStudent(myForm, event) {
	event.preventDefault();

	var editStudent = {
		_id: myForm.elements.id.value,
    age: parseInt(myForm.elements.age.value),
    group: parseInt(myForm.elements.group.value),
    name: {
      first: myForm.elements.first_name.value,
      last: myForm.elements.last_name.value
    },
    gender: myForm.elements.gender.value
	}

	for (i=0; i<people.length; i++){
		if(people[i]._id == editStudent._id) {
			people[i] = editStudent;
		}
	}

	showPage('dashboard');
}

function drawGroups() {
	// Подготовить шаблон
	var myHTML = '';
	var template = "<tr><td>Группа #id#</td><td><p>Мужчин: #male#</p><p>Женщин: #female#</p><p>Средний возраст: #age#</p></td></tr>";
	var temporaryString = '';

	// Циклом перебрать все группы и сгенерировать HTML
	var groups = getAllGroups();
	for(var i = 0; i < groups.length; i++) {
		temporaryString = template;
		temporaryString = temporaryString.replace('#id#', groups[i]);

		var stats = groupStats(groups[i]);
		temporaryString = temporaryString.replace('#male#', stats.male);
		temporaryString = temporaryString.replace('#female#', stats.female);
		temporaryString = temporaryString.replace('#age#', stats.age);

		myHTML = myHTML + temporaryString;
	}

	// Поместить HTML на страницу
	var myTableElement = document.getElementById('groups-list');
	var myTableBody = myTableElement.getElementsByTagName('tbody')[0];
	myTableBody.innerHTML = myHTML;
}


function groupStats(groupId) {
	// var data = {};
	// data.male = 0;
	// data.female = 0;
	// data.age = 0;
	var data = { male: 0, female: 0, age: 0 };
	var students = getStudentsFromGroup(groupId);
	for(var i = 0; i < students.length; i++) {
		if(students[i].gender == 'm') {
			data.male++;
		}
		if(students[i].gender == 'f') {
			data.female++;
		}
		data.age = data.age + students[i].age;
	}
	data.age = Math.round(data.age / students.length);
	return data;
}

function getStudentsFromGroup(groupId) {
	var list = [];
	for(var i = 0; i < people.length; i++) {
		if (people[i].group == groupId) {
			list.push(people[i]);
		}
	}
	return list;
}




function getAllGroups() {
	var list = [];
	for(var i = 0; i < people.length; i++) {
		if( list.indexOf(people[i].group) == -1 ) {
			list.push(people[i].group);
		}
	}
	return list.sort();
}





function drawStudents() {

	var myHTML = '';
	var template = "<tr id='student-#id#'><td>#name#</td><td>#group#</td><td>#age#</td><td>#gender#</td><td onclick='showEditStudent(this.parentNode, event)'><a class='glyphicon glyphicon-pencil' aria-hidden='true'></a></td></tr>";
	var temporaryString = '';

	for(var i = 0; i < people.length; i++) {

		temporaryString = template;

		temporaryString = temporaryString.replace('#name#', people[i].name.first + " " + people[i].name.last);

		temporaryString = temporaryString.replace('#age#', people[i].age);

		temporaryString = temporaryString.replace('#group#', people[i].group);

		if( people[i].gender == 'm' ) {
			temporaryString = temporaryString.replace('#gender#', 'Мужской');
		} else {
			temporaryString = temporaryString.replace('#gender#', 'Женский');
		}

		temporaryString = temporaryString.replace('#id#', people[i]._id);

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
	var groups = getAllGroups();
	var total_age = 0;

	for(var i = 0; i < people.length; i++ ) {

		if( people[i].gender == "m" ) {
			male++;
		}
		if( people[i].gender == "f" ) {
			female++;
		}

		total_age += people[i].age;

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
			var menu = document.getElementById('link-' + elements[i].id);
			if(menu != null) {
				menu.className = '';
			}
		}
	}
}

