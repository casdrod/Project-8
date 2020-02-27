const modal = document.querySelector('#myModal');
const modalContainer = document.querySelector('.modal-container');
const gridContainer = document.querySelector('.grid-container');
const mainContainer = document.querySelector('.main-container');
const userUrl = 'https://randomuser.me/api/?results=12&inc=name,location,email,dob,cell,picture&nat=US';
let employees = [];

// FETCHING RANDOM USERS //
fetch(userUrl)
    .then(response => response.json())
    .then(data => data.results)
    .then(data => {
        employees.push(data);
        employees = employees[0];
        generateEmployees(employees);
    })
    .catch(err => console.log(err))


//************************//
//****HELPER FUNCTIONS****//
//************************//
// FUNCTION TO CREATE EMPLOYEE BOXES //
function generateEmployees(data) {
    const employees = data;
    console.log(employees.length);
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

    function modalHtml(employee) {
        let dob = new Date(Date.parse(employee.dob.date)).toLocaleDateString(navigator.language);
        modalContainer.innerHTML = `
            <div class="modal-box">
                <span class="close">&times;</span>
                <div class="modal-info">
                    <div class="arrow">
                        <i class="fas fa-chevron-left prev-btn"></i>
                    </div>
                    <div class="modal-content">
                        <image src="${employee.picture.large}" alt="employee's picture" class="modal-picture">
                        <h2 class="employee_name">${employee.name.first} ${employee.name.last}</h2>
                        <p>${employee.email}</p>
                        <hr>
                        <p>${employee.cell}</p>
                        <p>${employee.location.street.number} 
                            ${employee.location.street.name}<br>
                            ${employee.location.city},<br>
                            ${employee.location.state} 
                            ${employee.location.postcode}</p>
                        <p>Birthday: ${dob}</p>
                    </div>
                    <div class="arrow">
                        <i class="fas fa-chevron-right next-btn"></i>
                    </div>
                </div>
            </div>
        `;

        // Event Listener for Next Button //
        document.querySelector('.next-btn').addEventListener('click', () => {
            nextItem(employee);
        })

        // Event Listener for Previous Button //
        document.querySelector('.prev-btn').addEventListener('click', () => {
            prevItem(employee);
        })
    }

    modalContainer.style.display = 'block';
    modalHtml(employee);

    // Function for Previous Item Button
    function prevItem(employee) {
        if (i === 0) {
            i = employees.length;
        }
        i--;
        modalHtml(employees[i]);
    }

    // Function for Next Item Button //
    var i = employees.indexOf(employee);
    function nextItem(employee) {
        i++;
        if (i === employees.length) {
            i = 0;
        }
        modalHtml(employees[i]);
    }

}


// EVENT LISTENER FOR CLOSE BUTTON //
modalContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('close') || e.target.classList.contains('modal-container')) {
        document.querySelector('.modal-box').innerHTML = "";
        modal.style.display = 'none';
    }
})