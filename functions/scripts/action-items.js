var db_actionItems = [
    { 
        uid: 'AI-736789', 
        name:'Replace Antenna Module#455',
        description: "The antenna cannot achieve the minimum gains we need to fulfill one of the requirements",
        dateCreated: new Date(2022, 6, 15),
        dateAssigned: new Date(2022, 6, 28),
        resource: 1,
        expectedComp: new Date(2023, 1, 15),
        actualComp: null,
        status: 3,
        statusDescription: 'Currently 75% complete with the prototype using the new module.',
        updateDate: new Date(2022, 7, 30)
    },
    {
        uid: 'AI-774577', 
        name:'Optimize Tracking Software',
        description: "The polling frequency needs to increase now that the system can reach more towers.",
        dateCreated: new Date(2022, 8, 15),
        dateAssigned: new Date(2022, 8, 16),
        resource: 0,
        expectedComp: new Date(2023, 1, 20),
        actualComp: null,
        status: 3,
        statusDescription: 'The drivers are causing the software to freeze at increase polling rates.',
        updateDate: new Date(2022, 8, 12)
    },
    {
        uid: 'AI-444573', 
        name:'Replace existing memory',
        description: "The memory modules speeds are inadequate to meet minimum load speeds",
        dateCreated: new Date(2022, 8, 25),
        dateAssigned: new Date(2022, 8, 26),
        resource: 2,
        expectedComp: new Date(2023, 1, 5),
        actualComp: null,
        status: 1,
        statusDescription: 'We were able to secure enough for the prototype but not for the entire deliverable',
        updateDate: new Date(2022, 9, 12)
    },
    {
        uid: 'AI-124593', 
        name:'Replace logic board',
        description: "the current logic board cannot support faster memory modules.",
        dateCreated: new Date(2022, 8, 25),
        dateAssigned: new Date(2022, 8, 26),
        resource: 3,
        expectedComp: new Date(2023, 1, 4),
        actualComp: null,
        status: 4,
        statusDescription: 'We were able to secure enough for the prototype but not for the entire deliverable',
        updateDate: new Date(2022, 9, 12)
    }
];

const db_status = ["","Open","Closed","In Progress","Hold","Complete"];
const db_resource = ["R-136789, Sari Ajina","R-144577, Jonathan Chua","R-734257, Mrunal Prakash Gavali","R-835510, Alondra Gonzalez","R-482946, Jeel Prakashkumar Patel","R-270087, Parth Savaj"];
const db_sortOptions = ["name", "date created", "date assigned","expected completion date","actual completion date","update date"];
const db_filterOptions = ["", "date created", "date assigned", "update date","actual completion date", "expected completion date", "past due", "specified days until expected completion"];

function newActionItem() {
    $("#appBody").replaceWith(`
        <div id="appBody" class="container">
            <form>
                <div class="form-group">
                    <label for="uid">Unique I.D.</label>
                    <input id="uid" class="form-control" type="text" placeholder="AI-${(Math.floor(Math.random() * 9999998) + 1000000)}" readonly>
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name">
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" id="description" rows="3" placeholder="A short description of the Action Item."></textarea>
                </div>
                <div class="form-group">
                    <label for="date-created">Date Created</label>
                    <input id="date-created" class="form-control" type="text" value="${new Date().toLocaleDateString()}" readonly>
                </div>
                <div class="form-group">
                    <label for="date-assigned">Date Assigned</label>
                    <input id="date-assigned" class="form-control" type="date">
                </div>
                <div class="form-group">
                    <label for="resource">Resource Assigned</label>
                    <select class="form-control" id="resource">
                        <option></option>
                    </select>
                    <a id="resources-button" href="./resources.html" class="btn btn-secondary" role="button">Add a resource</a>
                </div>
                <div class="form-group">
                    <label for="expected-completion-date">Expected Completion Date</label>
                    <input id="expected-completion-date" class="form-control" type="date">
                </div>
                <div class="form-group">
                    <label for="actual-completion-date">Actual Completion Date</label>
                    <input id="actual-completion-date" class="form-control" type="date">
                </div>
                <div class="form-group row">
                    <div class="col">
                        <label for="status">Status</label>
                        <select class="form-control" id="status"></select>
                    </div>
                    <div class="col">
                        <label for="status-add">Add to Status</label>
                        <input class="form-control" type="text" id="status-add">
                        <button onclick="addStatus()" id="add-status-button" type="button" class="btn btn-secondary">Add</button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="status-description">Status Description</label>
                    <textarea class="form-control" id="status-description" rows="3" placeholder="A short description of the Action Item's status as of the last update."></textarea>
                </div>
                <div class="form-group">
                    <label for="update-date">Update Date</label>
                    <input id="update-date" class="form-control" type="text" placeholder="" readonly>
                </div>
                <input class="btn btn-primary" type="submit" value="Save" id="save-button">
                <input class="btn btn-danger" type="reset" value="Clear">
            </form>
        </div> 
    `);

    for(let i = 0; i < db_status.length; i++) {
        $("#status").append(`<option value=${i}>${db_status[i]}</option>`)
    }

    for(let i = 0; i < db_status.length; i++) {
        $("#resource").append(`<option value=${i}>${db_resource[i]}</option>`)
    }

    $("#save-button").on("click", function() {
        alert("entry saved");
        location.reload();
    });
}

function addStatus() {
    $("#status").append(`<option value=${$("#status-add").val()}>${$("#status-add").val()}</option>`);
    $("#status-add").val("");
}

function loadActionItems() {
    $("#appBody").replaceWith(`
        <div id="appBody" class="container">
            <form>
                <div class="form-group">
                    <label for="action-items">Action Items</label>
                    <select class="form-control" id="action-items">
                        <option></option>
                    </select>
                </div>
                <input onclick="openActionItem()" id="load-button" class="btn btn-primary" type="submit" value="Open">
            </form>
        </div> 
    `);

    for(let i = 0; i < db_actionItems.length; i++) {
        let { uid, name } = db_actionItems[i];
        $("#action-items").append(`<option value=${i}>${uid} : ${name}</option>`);
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

function filterDate(type="", date="", delta="") {
    let output = delta == "" ? `${type} ${date}` : `${type} ${date} +/- ${delta} days` ;
    alert(`table contents are now filtered by ${output}`);
    tabularView();
}


function filterResource(data) {
    alert(`table contents are now filtered by resource=${data}`);
    tabularView();
}

function formatDate(date, month, year) {
    let Month = parseInt(month) < 10 ? `0${month}` : month;
    let Date = parseInt(date) < 10 ? `0${date}` : date;
    return `${year}-${Month}-${Date}`;
}

function openActionItem() {
    let index = document.getElementById("action-items").value;
    let {uid, name, description, dateCreated, dateAssigned, resource, expectedComp, actualComp, status, statusDescription, updateDate} = db_actionItems[index];

    $("#appBody").replaceWith(`
    <div id="appBody" class="container">
        <form>
            <div class="form-group">
                <label for="uid">Unique I.D.</label>
                <input id="uid" class="form-control" type="text" placeholder="${uid}" readonly>
            </div>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name">
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea class="form-control" id="description" rows="3""></textarea>
            </div>
            <div class="form-group">
                <label for="date-created">Date Created</label>
                <input id="date-created" class="form-control" type="text" value="${dateCreated.toLocaleDateString()}" readonly>
            </div>
            <div class="form-group">
                <label for="date-assigned">Date Assigned</label>
                <input id="date-assigned" class="form-control" type="date" value="${formatDate(dateAssigned.getDate(),dateAssigned.getMonth(),dateAssigned.getFullYear())}">
            </div>
            <div class="form-group">
                <label for="resource">Resource Assigned</label>
                <select class="form-control" id="resource">
                    <option></option>
                </select>
                <a id="resources-button" href="./resources.html" class="btn btn-secondary" role="button">Add a resource</a>
            </div>
            <div class="form-group">
                <label for="expected-completion-date">Expected Completion Date</label>
                <input id="expected-completion-date" class="form-control" type="date" value="${formatDate(expectedComp.getDate(),expectedComp.getMonth(),expectedComp.getFullYear())}">
            </div>
            <div class="form-group">
                <label for="actual-completion-date">Actual Completion Date</label>
                <input id="actual-completion-date" class="form-control" type="date">
            </div>
            <div class="form-group row">
                <div class="col">
                    <label for="status">Status</label>
                    <select class="form-control" id="status"></select>
                </div>
                <div class="col">
                    <label for="status-add">Add to Status</label>
                    <input class="form-control" type="text" id="status-add">
                    <button onclick="addStatus()" id="add-status-button" type="button" class="btn btn-secondary">Add</button>
                </div>
            </div>
            <div class="form-group">
                <label for="status-description">Status Description</label>
                <textarea class="form-control" id="status-description" rows="3"></textarea>
            </div>
            <div class="form-group">
                <label for="update-date">Update Date</label>
                <input id="update-date" class="form-control" type="text" placeholder="${formatDate(updateDate.getDate(),updateDate.getMonth(),updateDate.getFullYear())}" readonly>
            </div>
            <input class="btn btn-primary" type="submit" value="Save" id="save-button">
            <input class="btn btn-danger" type="button" value="Delete" id="delete-button">
        </form>
    </div> 
    `);

    for(let i = 0; i < db_status.length; i++) {
        $("#status").append(`<option value=${i}>${db_status[i]}</option>`)
    }

    for(let i = 0; i < db_resource.length; i++) {
        $("#resource").append(`<option value=${i}>${db_resource[i]}</option>`)
    }

    $("#name").val(name);
    $("#description").val(description);
    $("#resource").val(resource);
    $("#status").val(status);
    $("#status-description").val(statusDescription);
    $("#status-description").change(function(){
        $("#update-date").replaceWith(`<input id="update-date" class="form-control" type="text" placeholder="${new Date().toLocaleDateString()}" readonly>`);
    });
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
                    <label for="date-filter">Filter by</label>
                    <select class="form-control" id="date-filter"></select>
                    <button id="date-filter-button" class="btn btn-secondary">filter</button>
                </div>
                <div class="col">
                    <label for="date">Date</label>
                    <input id="date" class="form-control" type="date">
                </div>
                <div class="col">
                    <label for="days">+/-</label>
                    <input type="text" class="form-control" id="days">
                </div>
            </div><br>
        </form>
        <table id="tabView" class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">uid</th>
                    <th scope="col">name</th>
                    <th scope="col">description</th>
                    <th scope="col">date created</th>
                    <th scope="col">date assigned</th>
                    <th scope="col">resource</th>
                    <th scope="col">expected completion date</th>
                    <th scope="col">actual completion date</th>
                    <th scope="col">status</th>
                    <th scope="col">status description</th>
                    <th scope="col">update date</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    `);

    for(let i = 0; i < db_actionItems.length; i++) {
        var {uid, name, description, dateCreated, dateAssigned, resource, expectedComp, actualComp, status, statusDescription, updateDate} = db_actionItems[i];
        var row = `
        <tr>
            <th>${uid}</th>
            <td>${name}</td>
            <td>${description}</td>
            <td>${dateCreated.toLocaleDateString()}</td>
            <td>${dateAssigned == null ? "not set" : dateAssigned.toLocaleDateString()}</td>
            <td>${db_resource[resource]}</td>
            <td>${expectedComp == null ? "not set" : expectedComp.toLocaleDateString()}</td>
            <td>${actualComp == null ? "not set" : actualComp.toLocaleDateString()}</td>
            <td>${db_status[status]}</td>
            <td>${statusDescription}</td>
            <td>${updateDate == null ? "not set" : updateDate.toLocaleDateString()}</td>
        </tr>`;
        $("tbody").append(row);
    }

    for(let i=0; i < db_sortOptions.length; i++) {
        $("#sort").append(`<option value="${db_sortOptions[i]}") }>${db_sortOptions[i]}</option>`);
    }

    for(let i=0; i < db_resource.length; i++) {
        $("#resource-filter").append(`<option value="${db_resource[i]}") }>${db_resource[i]}</option>`);
    }

    for(let i=0; i < db_filterOptions.length; i++) {
        $("#date-filter").append(`<option value="${db_filterOptions[i]}") }>${db_filterOptions[i]}</option>`);
    }

    $("#sort-asc-button").on("click", function(){ sortAsc($("#sort").val()); });
    $("#sort-desc-button").on("click", function(){ sortDesc($("#sort").val()); });
    $("#resource-filter-button").on("click", function(){ filterResource($("#resource-filter").val()); });
    $("#date-filter-button").on("click", function(){ filterDate($("#date-filter").val(), $("#date").val(), $("#days").val()); });
}

function init() {
    loadActionItems();
    $("#new-action-item-button").on("click", newActionItem);
    $("#open-action-item-button").on("click", loadActionItems);
    $("#tab-action-item-button").on("click", tabularView);
    $("#open").on("click", loadActionItems);
    $("#new").on("click", newActionItem);
    $("#tab").on("click", tabularView);
}

window.addEventListener("load", init, false);