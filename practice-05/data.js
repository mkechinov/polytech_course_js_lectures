function loadPeoples(callback){
	var request = new XMLHttpRequest();
	request.open('GET', 'http://cyberman.akurganow.ru/course', true);

	request.onload = function() {
	  if (this.status >= 200 && this.status < 400) {
	    // Success!
	    var people = JSON.parse(this.response);
	    callback(people);
	  } else {
	    // We reached our target server, but it returned an error
	    console.error('Server error')
	  }
	};

	request.onerror = function() {
	  // There was a connection error of some sort
	  console.error('Connection error')
	};

	request.send();
}
