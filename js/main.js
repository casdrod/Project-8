// let employees = [];
// const modal = document.querySelector('modal');
// const employeeContainer = document.querySelectorAll('employee-container');
// const modalContent = document.querySelector('modal-content');
// let mainContainer = document.querySelector('main-container')

// FETCHING RANDOM USERS //
fetch('https://randomuser.me/api/?results=12&inc=name,location,email,dob,cell,picture')
    .then(response => response.json())
    .then(data => generateEmployees(data.results))
    .catch(err => document.getElementById('employees')
        .innerHTML = 'There was an error while trying to retreive this data.'
        .fontcolor('red'))


//****HELPER FUNCTIONS****//

// Function to create employee boxes //
function generateEmployees(data) {
    const employees = data;
    var statusHTML = '<div class="grid-container">';
    employees.forEach(employee => {
        statusHTML += `
            <div class="employee-container">
                <img src="${employee.picture['large']}" alt="employee's picture">
                <ul>
                    <li><h2 class="employee_name">${employee.name['first']}${employee.name['last']}</h2></li>
                    <li>${employee.email}</li>
                    <li>${employee.location['city']}</li>
                </ul>
            </div>
            `;
    });
    statusHTML += '</div>';
    document.getElementsByClassName('main-container').innerHTML = statusHTML;
}



// // Function to create popup boxes //
// function generateModal(index) {
//     let {picture, name, email, location: {street, city, state, postcode}, cell, dob} = employees[index];

//     let date = new Date(dob.date);

//     var modalHTML = `
//         <div class="top-container">
//             <div class="employee-container">
//             <image src="${picture['large']}">
//             <ul>
//             <li><h2 class="employee_name">${name['first']} ${name['last']}</h2></li>
//             <li>${email}</li>
//             <li>${city}</li>
//             </div>
//         </div>
//         <div class="bottom-container">
//             <ul>
//                 <li>${cell}</li>
//                 <li>${location}</li>
//                 <li>Birthday:${date}</li>
//         </div>
//     `;
//     modal.style.display = 'block';
//     modalContent.innerHTML = modalHTML;
// }

// employeeContainer.addEventListener('click', () => {
//     generateModal(index);
// })

