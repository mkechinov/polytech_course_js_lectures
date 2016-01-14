$(document).ready(startApp);


function startApp() {

    var params = {
        minDate: (new Date()).getHours() < 12 ? 0 : 1,
        //minDate: getMinDate(),
        maxDate: 7
    };

    $( "#datepicker" ).datepicker(params);

}

//
//function getMinDate() {
//    var date = new Date();
//    if(date.getHours() < 12) {
//        return 0;
//    } else {
//        return 1;
//    }
//}