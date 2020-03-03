const modal = document.querySelector('#myModal');
const modalContainer = document.querySelector('.modal-container');
const gridContainer = document.querySelector('.grid-container');
const mainContainer = document.querySelector('.main-container');
const search = document.querySelector('.search');
const userUrl = 'https://randomuser.me/api/?results=12&inc=name,location,email,dob,cell,picture,login&nat=US';
let employeesArray = [];

// FETCHING RANDOM USERS //
fetch(userUrl)
    .then(response => response.json())
    .then(data => data.results)
    .then(data => {data.forEach(element => { 
        employeesArray.push(element);
    });
    })
    .then(data => generateEmployees(employeesArray))
    .catch(err => console.log(err))

console.log(employeesArray);

//************************//
//****HELPER FUNCTIONS****//
//************************//
// FUNCTION TO CREATE EMPLOYEE BOXES //
function generateEmployees(employeesArray) {
    const employees = employeesArray;
    var statusHTML = '';
    employees.forEach((employee, index) => {
        let picture = employee.picture.large;
        let firstName = employee.name.first;
        let lastName = employee.name.last;
        let email = employee.email;
        let city = employee.location.city;
        let userName = employee.login.username;

        statusHTML += `
            <div class="card" data-index="${index}">
                <img src="${picture}" alt="employee's picture">
                <div class="user-info">
                    <p><h2 class="employee_name">${firstName} ${lastName}</h2></p>
                    <p>${userName}</p>
                    <p>${email}</p>
                    <p>${city}</p>
                </div>
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
                        <img class="modal-picture" src="${employee.picture.large}" alt="employee's picture">
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

//************************//
//****EVENT LISTENERS****//
//************************//
// EVENT LISTENER FOR CLOSE BUTTON //
modalContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('close') || e.target.classList.contains('modal-container')) {
        document.querySelector('.modal-box').innerHTML = "";
        modal.style.display = 'none';
    }
})

// SEARCH BAR //





// const searchBox = document.querySelector('.searchBox');
// const cards = document.querySelectorAll('.card');

// const filterSearch = event => {
//     const searchTerm = event.target.value.toLowerCase();

//     cards.forEach(card => {
//         const name = card.querySelector('.employee_name').toLowerCase();
//         if (name.indexOf(searchTerm) > -1) {
//             card.style.display = '';
//         } else {
//             card.style.display = "none";
//         }
//     })
// }

// searchBox.addEventListener('keyup', filterSearch);