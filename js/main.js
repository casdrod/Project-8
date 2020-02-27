const modal = document.querySelector('#myModal');
const modalContainer = document.querySelector('.modal-container');
const gridContainer = document.querySelector('.grid-container');
const mainContainer = document.querySelector('.main-container');
const userUrl = 'https://randomuser.me/api/?results=12&inc=name,location,email,dob,cell,picture&nat=US';
let employeeArr = [];

// FETCHING RANDOM USERS //
fetch(userUrl)
    .then(response => response.json())
    .then(data => data.results)
    .then(data => {
        employeeArr.push(data);
        console.log(employeeArr[0]);
    })
    .catch(err => console.log(err))

// console.log(employeeArr);


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
        card.addEventListener('click', (e) => { 
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
    let cell = employee.cell;
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
            <div class="modal-info">
                <div class="arrow">
                    <i class="fas fa-chevron-left prev-btn"></i>
                </div>
                <div class="modal-content">
                    <image src="${picture}" alt="employee's picture" class="modal-picture">
                    <h2 class="employee_name">${firstName} ${lastName}</h2>
                    <p>${email}</p>
                    <hr>
                    <p>${cell}</p>
                    <p>${address}</p>
                    <p>Birthday: ${dob}</p>
                </div>
                <div class="arrow">
                    <i class="fas fa-chevron-right next-btn"></i>
                </div>
            </div>
        </div>
    `;
    
    modalContainer.style.display = 'block';

    var i = 0;

    function nextItem() {
        i = i + 1;
        console.log(employeeArr[0]);
    }

    nextItem();

}


// EVENT LISTENER FOR CLOSE BUTTON //
modalContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('close') || e.target.classList.contains('modal-container')) {
        document.querySelector('.modal-box').innerHTML = "";
        modal.style.display = 'none';
    }
})