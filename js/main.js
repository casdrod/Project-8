const modal = document.querySelector('#myModal');
const modalContainer = document.querySelector('.modal-container');
const gridContainer = document.querySelector('.grid-container');
const mainContainer = document.querySelector('.main-container');
const search = document.querySelector('.search');
const userUrl = 'https://rickandmortyapi.com/api/character/';
let employees = [];

// FETCHING RANDOM USERS //
fetch(userUrl)
    .then(response => response.json())
    .then(data => data.results)
    .then(data => {data.forEach(element => { 
        if (element.id <= 12) {
            employees.push(element);
        }
    });
    })
    .then(data => generateEmployees(employees))
    .catch(err => console.log(err))


//************************//
//****HELPER FUNCTIONS****//
//************************//
// FUNCTION TO CREATE EMPLOYEE BOXES //
function generateEmployees(employees) {
    var statusHTML = '';
    employees.forEach((employee, index) => {
        let picture = employee.image;
        let name = employee.name;
        let status = employee.status;
        let species = employee.species;

        statusHTML += `
            <div class="card" data-index="${index}">
                <div class="pic-div">
                    <img src="${picture}" alt="employee's picture">
                </div>
                <div class="user-info">
                    <p class="employee-name">${name}</p>
                    <div class="user-details">
                        <p>${status}</p>
                        <p>${species}</p>
                    </div>
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
    
    searchEmployees(employees);
}

// FUNCTION TO CREATE HTML FOR MODAL //
function generateModal(employee) {

    function modalHtml(employee) {
        modalContainer.innerHTML = `
            <div class="modal-box">
                <span class="close">&times;</span>
                <div class="modal-info">
                    <div class="arrow">
                        <i class="fas fa-chevron-left prev-btn"></i>
                    </div>
                    <div class="modal-content">
                        <img class="modal-picture" src="${employee.image}" alt="employee's picture">
                        <div class="modal-employee-info">
                            <p class="modal-employee-name">${employee.name}</p>
                            <p>${employee.gender}</p>
                            <p>${employee.status}</p>
                            <p>${employee.species}</p>
                            <hr>
                            <p>${employee.location.name}</p>
                        </div>
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

// SEARCH BOX FUNCTION//
function searchEmployees(employees) {
    const searchBox = document.querySelector('.searchBox');
    const cards = document.querySelectorAll('.card');

    // console.log(filteredEmployeeNames);

    const filterSearch = event => {
        const searchTerm = event.target.value.toLowerCase();

        cards.forEach(card => {
            const names = card.querySelector('.employee-name').textContent.toLowerCase();

            if (names.indexOf(searchTerm) > -1) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        })
    }
    searchBox.addEventListener('keyup', filterSearch);
}


// CALLING SEARCH BOX FUNCTION //
searchEmployees();


// EVENT LISTENER FOR CLOSE BUTTON //
modalContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('close') || e.target.classList.contains('modal-container')) {
        document.querySelector('.modal-box').innerHTML = "";
        modal.style.display = 'none';
    }
})