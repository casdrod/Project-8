var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        var employees = JSON.parse(xhr.responseText);
        employees = employees.results;
        console.log(employees);
        var statusHTML = '<div class="container">';
        employees.forEach(employee => {
            statusHTML += 
                '<div class="employee">'
                + '<image src="' + employee.picture['large'] + '">'
                + '<ul>'
                + '<li><h2 class="employee_name">' + employee.name['first'] + ' ' + employee.name['last'] + '</h2></li>'
                + '<li>' + employee.email + '</li>'
                + '<li>' + employee.location['city']
                + '</div>';
        });
        statusHTML += '</div>';
        document.getElementById('ajax').innerHTML = statusHTML;
    }
};
xhr.open('GET', 'https://randomuser.me/api/?results=12&inc=name,location,email,dob,cell,picture,login');
xhr.send();