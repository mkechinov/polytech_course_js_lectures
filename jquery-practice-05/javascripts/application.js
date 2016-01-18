$(document).ready(startApplication);

AVAILABLE_CITIES = ['Москва', 'Санкт-Петербург', 'Владивосток', 'Воронеж', 'Новосибирск', 'Новокузнецк', 'Ворожен', 'Самара', 'Саратов', 'Омск', 'Улан-Удэ', 'Чита'];
SELECTED_CITIES = [];

function startApplication() {

	$('#cityField').autocomplete({
		source: AVAILABLE_CITIES,
		select: function(a, b) {
			selectCity( b.item.value );
		}
	});

	$('#cityForm').submit(function(e){
		e.preventDefault();
		selectCity( $('#cityField').val() );
	});

	$(document).on('citiesChanged', function(){
		drawCities();
	});

}



/**
 * Добавляет новый город в массив городов и отрисовывает таблицу.
 * @param city
 */
function selectCity(city) {
	if( SELECTED_CITIES.indexOf(city) == -1 ) {
		SELECTED_CITIES.push(city);
	}
	$(document).trigger('citiesChanged');
	$('#cityField').val('');
}


function drawCities() {
	var html = '';
	for(var i = 0; i < SELECTED_CITIES.length; i++) {
		html += "<tr><td>" + SELECTED_CITIES[i] + "</td><td><button data-id='" + i + "' class='remove-button'>x</button></td></tr>";
	}
	$('#cityTable tbody').html(html);

	$('.remove-button').on('click', function(){
		deleteCity($(this).data('id'));
	});

}


function deleteCity(index) {
	// Удалить город из массива
	SELECTED_CITIES.splice(index, 1);
	// Перерисовать
	$(document).trigger('citiesChanged');
}