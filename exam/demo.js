function start() {
    task_1();
    task_2();
    task_3();
    task_4();
    task_5();
}

function task_1() {
    document.getElementById('total-sum').innerHTML = sum(ordersList) + ' руб.';
    document.getElementById('total-orders').innerHTML = ordersList.length;
    document.getElementById('total-recommended').innerHTML = sum(ordersList, 'recommended') + ' руб.';
    document.getElementById('total-typical').innerHTML = sum(ordersList, 'typical') + ' руб.';
    document.getElementById('total-customers').innerHTML = getUsers(ordersList).length;
    document.getElementById('total-without-recommended').innerHTML = sum( filterOnlyTypical(ordersList)) + ' руб.';
    document.getElementById('total-without-typical').innerHTML = sum( filterOnlyRecommended(ordersList)) + ' руб.';
}

function task_2() {
    var startDate = new Date(2015, 5, 26, 0, 0, 0);
    var endDate = new Date(2015, 5, 28, 23, 59, 59);
    var list = filterByDate(ordersList, startDate, endDate);
    document.getElementById('period-sum').innerHTML = sum(list) + ' руб.';
    document.getElementById('period-total').innerHTML = list.length;
    document.getElementById('period-customers').innerHTML = getUsers(list).length;
    document.getElementById('period-recommended').innerHTML = sum(list, 'recommended') + ' руб.';
}

function task_3() {
    var list = ordersList.sort(function(a,b) {
        if (a.total > b.total) {
            return -1;
        }
        if (a.total < b.total) {
            return 1;
        }
        return 0;
    }).slice(0,5);

    var html = '';
    var date = null;
    var element = null;

    for(var i = 0; i < list.length; i++) {
        element = list[i];
        date = new Date(element.timestamp * 1000);
        html += '<tr><td>' + date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + '</td><td>' + element.id + '</td><td>' + element.user_id + '</td><td>' + element.total + ' руб.</td><td>' + element.typical + ' руб.</td><td>' + element.recommended + ' руб.</td></tr>';
    }

    document.getElementById('top-orders').innerHTML = html;
}

function task_4() {
    var userOrdersCount = {};
    for(var i = 0; i < ordersList.length; i++) {
        if(typeof(userOrdersCount[ordersList[i].user_id]) == 'undefined') {
            userOrdersCount['' + ordersList[i].user_id] = 1;
        } else {
            userOrdersCount['' + ordersList[i].user_id]++;
        }
    }
    var regularUsers = [];
    for(var i in userOrdersCount) {
        if(userOrdersCount.hasOwnProperty(i)) {
            if(userOrdersCount[i] > 10) {
                regularUsers.push(i);
            }
        }
    }

    var html = '';
    var element = null;
    var orders = null;

    for(var i = 0; i < regularUsers.length; i++) {
        element = regularUsers[i];
        orders = findByUser(element, ordersList);
        html += '<tr><td>' +element + '</td><td>' + orders.length + '</td></tr>';
    }

    document.getElementById('regular-users').innerHTML = html;

}

function task_5() {
    document.getElementById('search-button').addEventListener('click', function() {
        var value = document.getElementById('search-field').value;
        if(value != '') {
            if(parseInt(value) != value) {
                alert('Введенное значение должно быть числом');
            } else {
                var orders = findByUser(value, ordersList);
                var html = '';
                var date;
                for(var i = 0; i < orders.length; i++) {
                    order = orders[i];
                    date = new Date(order.timestamp * 1000);
                    html += '<tr><td>' + date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + '</td><td>' + order.id + '</td><td>' + order.total + ' руб.</td><td>' + order.typical + ' руб.</td><td>' + order.recommended + ' руб.</td></tr>';
                }
                document.getElementById('orders-by-user').innerHTML = html;
            }
        }
    })
}




function findByUser(user, elements) {
    var filtered = [];
    for(var i = 0; i < elements.length; i++) {
        if(elements[i].user_id == user) {
            filtered.push(elements[i]);
        }
    }
    return filtered;
}

function sum(elements, filter) {
    var sum = 0;
    for(var i = 0; i < elements.length; i++) {
        if( filter == 'typical' ) {
            sum += elements[i].typical;
        }
        if( filter == 'recommended' ) {
            sum += elements[i].recommended;
        }
        if( filter == null ) {
            sum += elements[i].total;
        }
    }
    return sum;
}

function getUsers(elements) {
    var list = [];
    for(var i = 0; i < elements.length; i++) {
        if(list.indexOf(elements[i].user_id) == -1) {
            list.push(elements[i].user_id);
        }
    }
    return list;
}

function filterOnlyTypical(elements) {
    var filtered = [];
    for(var i = 0; i < elements.length; i++) {
        if(elements[i].recommended == 0) {
            filtered.push(elements[i]);
        }
    }
    return filtered;
}

function filterOnlyRecommended(elements) {
    var filtered = [];
    for(var i = 0; i < elements.length; i++) {
        if(elements[i].typical == 0) {
            filtered.push(elements[i]);
        }
    }
    return filtered;
}

function filterByDate(elements, from, to) {
    var filtered = [];
    var from_i =  from.valueOf() / 1000;
    var to_i =  to.valueOf() / 1000;
    for(var i = 0; i < elements.length; i++) {
        if(elements[i].timestamp >= from_i && elements[i].timestamp <= to_i) {
            filtered.push(elements[i]);
        }
    }
    return filtered;
}

