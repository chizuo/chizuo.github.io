var db_resources = [
    { 
        uid: 'R-136789', 
        name:'Sari Ajina',
        title: 'Software Intern',
        listOfSkills: [
            {skillName: 'Java', skillLevel: 10}, 
            {skillName: 'UML', skillLevel: 6}, 
            {skillName: 'ERD', skillLevel: 4}
        ],
        availabilityCalendar: [
            {date: newDate(2022, 12, 24), reason: 'vacation'},
            {date: newDate(2022, 12, 25), reason: 'holiday'},
            {date: newDate(2022, 12, 31), reason: 'vacation'},
            {date: newDate(2022, 11, 27), reason: 'holiday'},
            {date: newDate(2023, 01, 01), reason: 'holiday'},
            {date: newDate(2023, 01, 28), reason: 'T-152698347'},
        ],
        payRate: 32.25
    },
    {
        uid: 'R-144577', 
        name:'Jonathan Chua',
        title: 'Software Engineer',
        listOfSkills: [
            {skillName: 'Java', skillLevel: 10}, 
            {skillName: 'JavaScript', skillLevel: 8}, 
            {skillName: 'ERD', skillLevel: 8},
            {skillName: 'UML', skillLevel: 9}
        ],
        availabilityCalendar: [
            {date: newDate(2022, 12, 24), reason: 'vacation'},
            {date: newDate(2022, 12, 25), reason: 'holiday'},
            {date: newDate(2022, 11, 27), reason: 'holiday'},
            {date: newDate(2023, 01, 01), reason: 'holiday'},
        ],
        payRate: 65.75
    },
    {
        uid: 'R-734257', 
        name:'Mrunal Prakash Gavali',
        title: 'Software Design',
        listOfSkills: [
            {skillName: 'Python', skillLevel: 10}, 
            {skillName: 'Java', skillLevel: 8}, 
            {skillName: 'ERD', skillLevel: 8},
            {skillName: 'SRD', skillLevel: 9}
        ],
        availabilityCalendar: [
            {date: newDate(2022, 12, 24), reason: 'vacation'},
            {date: newDate(2022, 12, 25), reason: 'holiday'},
            {date: newDate(2022, 12, 31), reason: 'vacation'},
            {date: newDate(2022, 11, 27), reason: 'holiday'},
            {date: newDate(2023, 01, 01), reason: 'holiday'},
            {date: newDate(2023, 01, 28), reason: 'T-152698347'},
        ],
        payRate: 89.30
    },
    {
        uid: 'R-835510', 
        name:'Alondra Gonzalez',
        title: 'Software Architect',
        listOfSkills: [
            {skillName: 'Java', skillLevel: 9}, 
            {skillName: 'ERD', skillLevel: 8},
            {skillName: 'SRD', skillLevel: 9}
        ],
        availabilityCalendar: [
            {date: newDate(2022, 12, 24), reason: 'vacation'},
            {date: newDate(2022, 12, 25), reason: 'holiday'},
            {date: newDate(2022, 12, 31), reason: 'vacation'},
            {date: newDate(2022, 11, 27), reason: 'holiday'},
            {date: newDate(2023, 01, 01), reason: 'holiday'},
            {date: newDate(2023, 01, 28), reason: 'T-152698347'},
        ],
        payRate: 45.35
    },
    {
        uid: 'R-482946', 
        name:'Jeel Prakashkumar Patel',
        title: 'Project Manager',
        listOfSkills: [
            {skillName: 'Java', skillLevel: 9}, 
            {skillName: 'ERD', skillLevel: 8},
            {skillName: 'UML', skillLevel: 9}
        ],
        availabilityCalendar: [
            {date: newDate(2022, 12, 24), reason: 'vacation'},
            {date: newDate(2022, 12, 25), reason: 'holiday'},
            {date: newDate(2022, 12, 31), reason: 'vacation'},
            {date: newDate(2022, 11, 27), reason: 'holiday'},
            {date: newDate(2023, 01, 01), reason: 'holiday'},
            {date: newDate(2023, 01, 28), reason: 'T-152698347'},
        ],
        payRate: 31.00
    },
    {
        uid: 'R-270087', 
        name:'Parth Savaj',
        title: 'Scrum Master',
        listOfSkills: [
            {skillName: 'Java', skillLevel: 8}, 
            {skillName: 'JavaScript', skillLevel: 8}, 
            {skillName: 'ERD', skillLevel: 7},
            {skillName: 'UML', skillLevel: 9},
            {skillName: 'SRD', skillLevel: 6}
        ],
        availabilityCalendar: [
            {date: newDate(2022, 12, 24), reason: 'vacation'},
            {date: newDate(2022, 12, 25), reason: 'holiday'},
            {date: newDate(2022, 12, 31), reason: 'vacation'},
            {date: newDate(2022, 11, 27), reason: 'holiday'},
            {date: newDate(2023, 01, 01), reason: 'holiday'},
            {date: newDate(2023, 01, 28), reason: 'T-152698347'},
        ],
        payRate: 74.00
    }
];

function newResources() {
    $("appBody").replaceWith(`
        <div id = "appBody" class= "container">
            <form>
                <div class="form-group">
                    <label for="uid">Unique I.D.</label>
                    <input id="uid" class="form-control" type="text" placeholder=${uid} readonly>
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name">
                </div>
                <div class="form-group">
                    <label for="name">Title</label>
                    <input type="text" class="form-control" id="name">
                </div>
                <div class="form-group">
                    <label for="name">Pay Rate</label>
                    <input type="text" class="form-control" id="name">
                </div>
                <div class="form-group">
                    <label for="date-assigned">Availability Calendar</label>
                    <input id="date-assigned" class="form-control" type="date">
                </div>
                <div class="form-group">
                    <label for="status-description">List of Skills</label>
                    <textarea class="form-control" id="list-of-skills" rows="3" placeholder="A short list of skills, include skill name and skill level."></textarea>
                </div>
                <input class="btn btn-primary" type="submit" value="Save">
                <input class="btn btn-danger" type="reset" value="Delete">
            </form>
        </div>
    `);

    $("#save-button").on("click", function() {
        alert("entry saved");
        location.reload();
    });

    $("#add-status-button").on("click", function() {
        alert("Loading status request form");
        newResources();
    });
}

function loadResources() {
    $("#appBody").replaceWith(`
        <div id="appBody" class="container">
            <form>
                <div class="form-group">
                    <label for="resources">Resources</label>
                    <select class="form-control" id="resources">
                        <option></option>
                    </select>
                </div>
                <input onclick="openResources()" id="load-button" class="btn btn-primary" type="submit" value="Open">
            </form>
        </div> 
    `);

    for(let i = 0; i < db_resources.length; i++) {
        let { uid, name } = db_resources[i];
        $("#resources").append(`<option value=${i}>${uid} : ${name}</option>`);
    }
}

function sortAsc(data) {
    alert(`table contents are now sorted by ${data} in ascending order`);
    tabularView();
}

function sortDesc(data) {
    alert(`table contents are now sorted by ${data} in descending order`);
    tabularView();
}

function filterStatus(data) {
    alert(`table contents are now filtered by status=${data}`);
    tabularView();
}

function filterResource(data) {
    alert(`table contents are now filtered by resource=${data}`);
    tabularView();
}

function openResources() {
    let index = document.getElementById("resources").value;
    let {uid, name, title, listOfSkills, availabilityCalendar, payRate} = db_resources[index];
    $("appBody").replaceWith(`
        <div id = "appBody" class= "container">
            <form>
                <div class="form-group">
                    <label for="uid">Unique I.D.</label>
                    <input id="uid" class="form-control" type="text" placeholder=${uid} readonly>
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name">
                </div>
                <div class="form-group">
                    <label for="name">Title</label>
                    <input type="text" class="form-control" id="name">
                </div>
                <div class="form-group">
                    <label for="name">Pay Rate</label>
                    <input type="text" class="form-control" id="name">
                </div>
                <div class="form-group">
                    <label for="date-assigned">Availability Calendar</label>
                    <input id="date-assigned" class="form-control" type="date">
                </div>
                <div class="form-group">
                    <label for="status-description">List of Skills</label>
                    <textarea class="form-control" id="list-of-skills" rows="3" placeholder="A short list of skills, include skill name and skill level."></textarea>
                </div>
                <input class="btn btn-primary" type="submit" value="Save">
                <input class="btn btn-danger" type="reset" value="Delete">
            </form>
        </div>
    `);

    $("name").val(name);
    $("title").val(title);
    $('listOfSkills').val(listOfSkills);
    $("availabilityCalendar").val(availabilityCalendar);
    $("payRate").val(payRate);
    $("#save-button").on("click", function(){
        alert(`${uid} : ${name} has been updated.`);
        location.reload();
    });
    $("#delete-button").on("click", function(){
        if(confirm(`Confirm deletion of ${uid} : ${name}`) === true) {
            alert(`${uid} : ${name} has been deleted`);
            location.reload();
        } else {
            alert(`Delete request of ${uid} : ${name} been cancelled`);
        }
    });
}

function tabularView() {
    $("#appBody").replaceWith(`
    <div id="appBody">
        <form class="container">
            <div class="row">
                <div class="col">
                    <label for="sort">Sort By</label>
                    <select class="form-control" id="sort"><option></option></select>
                    <div class="btn-group" role="group">
                        <button id="sort-asc-button" class="btn btn-secondary">ascending</button>
                        <button id="sort-desc-button" class="btn btn-secondary">descending</button>
                    </div>
                </div>
                <div class="col">
                    <label for="resource-filter">Resource filter</label>
                    <select class="form-control" id="resource-filter"><option></option></select>
                    <button id="resource-filter-button" class="btn btn-secondary">filter</button>
                </div>
                <div class="col">
                    <label for="status-filter">Status filter</label>
                    <select class="form-control" id="status-filter"></select>
                    <button id="status-filter-button" class="btn btn-secondary">filter</button>
                </div>
            </div><br>
        </form>
        <table id="tabView" class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">uid</th>
                    <th scope="col">name</th>
                    <th scope="col">list of skills</th>
                    <th scope="col">availiability date</th>
                    <th scope="col">pay rate</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    `);

    for(let i = 0; i < db_resources.length; i++) {
        var {uid, name, listOfSkills, availabilityCalendar} = db_resources[i];
        var row = `
        <tr>
            <th>${uid}</th>
            <td>${name}</td>
            <td>${listOfSkills}</td>
            <td>${availabilityCalendar}</td>
            <td>${payRate}</td>
        </tr>`;
        $("tbody").append(row);
    }

    $("#sort-asc-button").on("click", function(){ sortAsc($("#sort").val()); });
    $("#sort-desc-button").on("click", function(){ sortDesc($("#sort").val()); });
    $("#resource-filter-button").on("click", function(){ filterResource($("#resource-filter").val()); });
    $("#status-filter-button").on("click", function(){ filterStatus($("#status-filter").val()); });
}

function init() {
    loadResources();
    $("#new-resource-button").on("click", newResources);
    $("#open-resource-button").on("click", loadResources);
    $("#tab-resource-button").on("click", tabularView);
    $("#open").on("click", loadResources);
    $("#new").on("click", newResources);
    $("#tab").on("click", tabularView);
}

window.addEventListener("load", init, false);