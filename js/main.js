const modal = document.querySelector('#myModal');
const modalContainer = document.querySelector('.modal-container');
const gridContainer = document.querySelector('.grid-container');
const mainContainer = document.querySelector('.main-container');
const userUrl = 'https://randomuser.me/api/?results=12&inc=name,location,email,dob,phone,picture&nat=US'

// FETCHING RANDOM USERS //
fetch(userUrl)
    .then(response => response.json())
    .then(data => generateEmployees(data.results))
    .catch(err => console.log(err))



//************************//
//****HELPER FUNCTIONS****//
//************************//
// FUNCTION TO CREATE EMPLOYEE BOXES //
function generateEmployees(data) {
    const employees = data;
    var statusHTML = '';
    employees.forEach((employee, index) => {
        let picture = employee.picture.large;
        let firstName = employee.name.first;
        let lastName = employee.name.last;
        let email = employee.email;
        let city = employee.location.city;

        statusHTML += `
            <div class="card" data-index="${index}">
                <img src="${picture}" alt="employee's picture">
                <ul>
                    <li><h2 class="employee_name">${firstName} ${lastName}</h2></li>
                    <li>${email}</li>
                    <li>${city}</li>
                </ul>
            </div>
        `;
    });
    gridContainer.innerHTML = statusHTML;

    gridContainer.querySelectorAll('.card').forEach((card, index) => {
        card.addEventListener('click', () => { 
            generateModal(employees[index]);
        }); 
    })
}

// FUNCTION TO CREATE HTML FOR MODAL //
function generateModal(employee) {
    let picture = employee.picture.large;
    let firstName = employee.name.first;
    let lastName = employee.name.last;
    let email = employee.email;
    let phone = employee.phone;
    let address = `${employee.location.street.number} 
                    ${employee.location.street.name}<br>
                    ${employee.location.city}, 
                    ${employee.location.state} 
                    ${employee.location.postcode}
                    `;
    let state = employee.location.street.state;
    let dob = new Date(Date.parse(employee.dob.date)).toLocaleDateString(navigator.language);

    modalContainer.innerHTML = `
        <div class="modal-box">
            <span class="close">&times;</span>
            <div class="modal-content">
                <image src="${picture}" alt="employee's picture" class="modal-picture">
                <h2 class="employee_name">${firstName} ${lastName}</h2>
                <p>${email}</p>
                <hr>
                <p>${phone}</p>
                <p>${address}</p>
                <p>Birthday: ${dob}</p>
            </div>
        </div>
    `;
    
    modalContainer.style.display = 'block';
}


// EVENT LISTENER FOR CLOSE BUTTON //
mainContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('close') || e.target.classList.contains('modal-container')) {
        document.querySelector('.modal-box').innerHTML = ' ';
        modal.style.display = 'none';
    }
})
