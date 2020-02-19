let employees = [];
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const gridContainer = document.querySelector('.grid-container');
const mainContainer = document.querySelector('.main-container');


// FETCHING RANDOM USERS //
fetch('https://randomuser.me/api/?results=12&inc=name,location,email,dob,cell,picture')
    .then(response => response.json())
    .then(data => generateEmployees(data.results))
    .catch(err => console.log(err))



//************************//
//****HELPER FUNCTIONS****//
//************************//
// Function to create employee boxes //
function generateEmployees(data) {
    const employees = data;
    var statusHTML = '';
    employees.forEach((employee, index) => {
        statusHTML += `
            <div class="employee-container" data-index="${index}">
                <img src="${employee.picture['large']}" alt="employee's picture">
                <ul>
                    <li><h2 class="employee_name">${employee.name['first']}${employee.name['last']}</h2></li>
                    <li>${employee.email}</li>
                    <li>${employee.location['city']}</li>
                </ul>
            </div>
            `;
    });
    gridContainer.innerHTML = statusHTML;
}

// Function to create popup boxes //
function generateModal(index) {
    let { name,
        email,
        location: {street, city, state, postcode},
        cell,
        dob,
        picture } = employees[index];

    let date = new Date(dob.date);

    var modalHTML = `
        <div class="top-container">
            <image src="${picture['large']}">
            <ul>
                <li><h2 class="employee_name">${name['first']} ${name['last']}</h2></li>
                <li>${email}</li>
                <li>${city}</li>
            </ul>
        </div>
        <div class="bottom-container">
            <ul>
                <li>${cell}</li>
                <li>${location}</li>
                <li>Birthday:${date}</li>
            </ul>
        </div>
    `;
    
    modalContent.innerHTML = modalHTML;
}


//****Event Listener****//
gridContainer.addEventListener('click', e => { 
    if (e.target !== gridContainer) {
        const employee = e.target.closest(".employee-container");
        const index = employee.getAttribute('data-index');

        generateModal(index);
        modal.style.display = 'block'; 
    }
}); 



// go back an simplify with variables