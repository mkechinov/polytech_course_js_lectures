$(document).ready(startApplication);


function startApplication() {

	// Отображаем главный экран
	showPage('dashboard');

	$('a.internal').click(function(){
		showPage( $(this).data('href') );
	});

}


function showPage(pageName) {

	// Скрываем все страницы
	hideAllPages();

	// Отображаем заказанную страницу
	$('#page-' + pageName).fadeIn(500);
	$('#link-page-' + pageName).addClass('active');

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

function checkStudentForm(form) {
	hideFormError(form);

	var student = {
    age: parseInt(form.elements.age.value),
    group: parseInt(form.elements.group.value),
    name: {
      first: form.elements.first_name.value,
      last: form.elements.last_name.value
    },
    gender: form.elements.gender.value
	}

	var groups = getAllGroups();
	var result = true;

	if(student.name.first.length <= 0) {
		showFormError(form, 'Введите имя')
		result = false
	}

	if(student.name.last.length <= 0) {
		showFormError(form, 'Введите фамилию')
		result = false
	}

	if(isNaN(student.age) || student.age <= 0) {
		showFormError(form, 'Введите возраст')
		result = false
	}

	if(isNaN(student.group) || student.group <= 0 || student.group > groups.length) {
		showFormError(form, 'Введите номер группы от 0 до '+groups.length)
		result = false
	}

	if(student.gender.length <= 0) {
		showFormError(form, 'Выберите пол')
		result = false
	}

	return result
}

function showFormError(form, message) {
	var alert = form.parentNode.getElementsByClassName('alert')[0];
	// console.error([alert, message])
	alert.innerHTML = alert.innerHTML.toString()+"<div>"+message+"</div>";
	alert.className = alert.className.replace("hidden", "");
}

function hideFormError(form) {
	var alert = form.parentNode.getElementsByClassName('alert')[0];
	alert.innerHTML = "";

	if ( alert.className.indexOf("hidden") == -1 ) {
		alert.className = alert.className+" hidden";
	}
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
	$('#groups-list tbody').html(myHTML);

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
		data.age = data.age + students[i]. age;
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

		temporaryString = temporaryString.replace('#id#', people[i]._id);

		temporaryString = temporaryString.replace('#gender#', (people[i].gender == 'm' ? 'Мужской' : 'Женский') );

		myHTML = myHTML + temporaryString;

	}

	$('#students-list tbody').html(myHTML);
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

	$('#total-male').html(male);
	$('#total-female').html(female);
	$('#total-persons').html(total_persons);
	$('#average-group-size').html(Math.round(total_persons / groups.length));
	$('#average-male').html(Math.round(male / groups.length));
	$('#average-female').html(Math.round(female / groups.length));
	$('#total-groups').html(groups.length);
	$('#average-age').html(Math.round(total_age / total_persons));

}

function hideAllPages() {
	$('.navbar li').removeClass('active');
	$('.page').hide();
}

function addStudent(myForm, event) {
	event.preventDefault();

	var newStudent = {
		"_id": people.length + 1,
    "age": parseInt(myForm.elements.age.value),
    "group": parseInt(myForm.elements.group.value),
    "name": {
      "first": myForm.elements.first_name.value,
      "last": myForm.elements.last_name.value
    },
    "gender": myForm.elements.gender.value
	}

	if(checkStudentForm(myForm)) {
		people.push(newStudent);

		showPage('dashboard');
	}
}

function showEditStudent(studentRow, event) {
	event.preventDefault();

	var row = $(studentRow);

	var id = row.prop('id').replace("student-", "");
	// var id = studentRow.id.replace("student-", "");

	// var age = studentRow.getElementsByTagName('td')[2].textContent;
	var age = row.find('td')[2].textContent;

	// var group = studentRow.getElementsByTagName('td')[1].textContent
	var group = row.find('td')[1].textContent;

	// var first_name = studentRow.getElementsByTagName('td')[0].textContent.split(" ")[0];
	// var last_name = studentRow.getElementsByTagName('td')[0].textContent.split(" ")[1];
	var first_name = row.find('td')[0].textContent.split(" ")[0];
	var last_name = row.find('td')[0].textContent.split(" ")[1];

	// var gender = studentRow.getElementsByTagName('td')[3].textContent == 'Женский' ? 'f' : 'm'
	var gender = row.find('td')[3].textContent == 'Женский' ? 'f' : 'm';

	$('#edit-student-form input[name=id]').val(id);
	$('#edit-student-form input[name=age]').val(age);
	$('#edit-student-form input[name=first_name]').val(first_name);
	$('#edit-student-form input[name=last_name]').val(last_name);
	$('#edit-student-form input[name=group]').val(group);
	$('#edit-student-form input[name=gender][value=' + gender + ']').prop('checked', true);

	showPage('edit-student');
}

function editStudent(myForm, event) {
	event.preventDefault();

	var editStudent = {
		"_id": myForm.elements.id.value,
    "age": parseInt(myForm.elements.age.value),
    "group": parseInt(myForm.elements.group.value),
    "name": {
      "first": myForm.elements.first_name.value,
      "last": myForm.elements.last_name.value
    },
    "gender": myForm.elements.gender.value
	}

	for(var i=0; i<people.length; i++) {
		if(editStudent._id == people[i]._id) {
			people[i] = editStudent;
		}
	}

	showPage('students');
}
