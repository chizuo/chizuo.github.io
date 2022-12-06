function newRisk() {
    $("#appBody").html(`<form>
        <div class="form-group">
            <label for="uid">Unique I.D.</label>
            <input id="uid" class="form-control" type="text" placeholder="R-${(Math.floor(Math.random() * 9999998) + 1000000)}" readonly>
        </div>
        <div class="form-group">
            <label for="category">Category</label>
            <select class="form-control" id="category"></select>
            <button id="add-category-button" class="btn btn-secondary">Add to category</button>
        </div>
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name">
        </div>
        <div class="form-group">
            <label for="probability">Probability</label>
            <input type="number" class="form-control" id="probability" min="0" max="100" placeholder="integer representing %">
        </div>
        <div class="form-group">
            <label for="impact">Impact</label>
            <select class="form-control" id="severity"></select>
            <button id="add-impact-button" class="btn btn-secondary">Add to impact</button>
        </div>
        <div class="form-group">
            <label for="mitigation">Mitigation</label>
            <textarea class="form-control" id="mitigation" rows="3" placeholder="Plan(s) for preventing, avoiding or reducing the impact of this risk."></textarea>
        </div>
        <div class="form-group">
            <label for="contingency">Contingency</label>
            <textarea class="form-control" id="contingency" rows="3" placeholder="Plan(s) if this risk is realized."></textarea>
        </div>
        <div class="form-group">
            <label for="score">Risk Score</label>
            <input type="number" class="form-control" id="score" min="1" max="10">
        </div>
        <div class="form-group">
            <label for="action-date">Action by</label>
            <input id="action-date" class="form-control" type="date">
        </div>
        <div class="form-group">
            <label for="action-items-list">List of Action Items</label>
            <input class="form-control" list="action-items-list" name="action-items-list" id="action-items-input">
            <datalist id="action-items-list"></datalist>
            <button onclick="addActionItem()" id="open-button" class="btn btn-primary" type="button">Add</button>
        </div>
        <div class="form-group">
            <label for="action-items">Action Items for Risk</label>
            <input type="text" class="form-control" id="action-items" placeholder="" readonly>
        </div>
        <input class="btn btn-primary" type="submit" value="Save" id="save-button">
        <input class="btn btn-danger" type="reset" value="Clear">
    </form>`);
    loadFormActions("","");
}

function addActionItem() {
    let input = $("#action-items").attr("placeholder"); 
    input = input.length === 0 ? $("#action-items-input").val() : input + ", " + $("#action-items-input").val();
    $("#action-items").attr("placeholder",`${input}`);
    $("#action-items-input").val("");
}

function loadFormActions(UID, NAME) {
    for(let i = 0; i < db_actionItems.length; i++) {
        $("#action-items-list").append(`<option value=${db_actionItems[i].uid}>`);
    }

    for(let i = 0; i < db_risks_impact.length; i++) {
        $("#severity").append(`<option value=${i}>${db_risks_impact[i]}</option>`)
    }

    for(let i = 0; i < db_risks_category.length; i++) {
        $("#category").append(`<option value=${i}>${db_risks_category[i]}</option>`)
    }

    $("#save-button").on("click", function() {
        alert("entry saved");
        location.reload();
    });

    $("#delete-button").on("click", function(){
        if(confirm(`Confirm deletion of ${UID} : ${NAME}`) === true) {
            alert(`${UID} : ${NAME} has been deleted`);
            location.reload();
        } else {
            alert(`Delete request of ${UID} : ${NAME} been cancelled`);
        }
    });

    $("#add-category-button").on("click", function() {
        alert("Loading add category request form");
        newRisk();
    });

    $("#add-impact-button").on("click", function() {
        alert("Loading add impact request form");
        newRisk();
    });
}

function loadRisks() {
    $("#appBody").html(`
        <form>
            <div class="form-group">
                <label for="risks">Risks</label>
                <select class="form-control" id="risks">
                    <option></option>
                </select>
            </div>
            <input onclick="openRisk()" id="open-button" class="btn btn-primary" type="submit" value="Open">
        </form>
    `);

    for(let i = 0; i < db_risks.length; i++) {
        let { uid, name } = db_risks[i];
        $("#risks").append(`<option value=${i}>${uid} : ${name}</option>`);
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

function formatDate(date, month, year) {
    let Month = parseInt(month) < 10 ? `0${month}` : month;
    let Date = parseInt(date) < 10 ? `0${date}` : date;
    return `${year}-${Month}-${Date}`;
}

function openRisk() {
    let index = document.getElementById("issues").value;
    let {uid, name, description, priority, severity, status, statusDescription, dateRaised, dateAssigned, expectedCompletionDate, actualCompletionDate, updateDate, actionItem, decision} = db_issues[index];

    $("#appBody").replaceWith(`<div id="appBody" class="container">
        <form>
            <div class="form-group">
                <label for="uid">Unique I.D.</label>
                <input id="uid" class="form-control" type="text" readonly>
            </div>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name">
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea class="form-control" id="description" rows="3" placeholder="A short description of the Issue."></textarea>
            </div>
            <div class="form-group">
                <label for="priority">Priority</label>
                <select class="form-control" id="priority"></select>
                <button id="add-priority-button" class="btn btn-secondary">Add a priority</button>
            </div>
            <div class="form-group">
                <label for="severity">Severity</label>
                <select class="form-control" id="severity"></select>
                <button id="add-severity-button" class="btn btn-secondary">Add a severity</button>
            </div>
            <div class="form-group">
                <label for="date-raised">Date Raised</label>
                <input id="date-raised" class="form-control" type="text" readonly>
            </div>
            <div class="form-group">
                <label for="date-assigned">Date Assigned</label>
                <input id="date-assigned" class="form-control" type="date">
            </div>
            <div class="form-group">
                <label for="expected-completion-date">Expected Completion Date</label>
                <input id="expected-completion-date" class="form-control" type="date">
            </div>
            <div class="form-group">
                <label for="actual-completion-date">Actual Completion Date</label>
                <input id="actual-completion-date" class="form-control" type="date">
            </div>
            <div class="form-group">
                <label for="status">Status</label>
                <select class="form-control" id="status">
                </select>
                <button id="add-status-button" class="btn btn-secondary">Add a status</button>
            </div>
            <div class="form-group">
                <label for="status-description">Status Description</label>
                <textarea class="form-control" id="status-description" rows="3" placeholder="A short description of the Issue's status as of the last update."></textarea>
            </div>
            <div class="form-group">
                <label for="update-date">Update Date</label>
                <input id="update-date" class="form-control" type="text" placeholder="${updateDate.toLocaleDateString()}" readonly>
            </div>
            <div class="form-group">
                <label for="action-items">Action Items</label>
                <select class="form-control" id="action-items">
                    <option></option>
                </select>
            </div>
            <div class="form-group">
                <label for="decisions">Decisions</label>
                <select class="form-control" id="decisions">
                    <option></option>
                </select>
            </div>
            <input class="btn btn-primary" type="submit" value="Save" id="save-button">
            <input class="btn btn-danger" type="button" value="Delete" id="delete-button">
        </form>
    </div>`);
    loadFormActions(uid, name);
    $("#uid").val(uid);
    $("#name").val(name);
    $("#description").val(description);
    $("#priority").val(priority);
    $("#severity").val(severity);
    $("#status").val(status);
    $("#status-description").val(statusDescription);
    $("#date-raised").replaceWith(`<input id="date-raised" class="form-control" type="text" value="${dateRaised.toLocaleDateString()}" readonly>`);
    $("#date-assigned").val(formatDate(dateAssigned.getDate(), dateAssigned.getMonth(), dateAssigned.getFullYear()));
    $("#expected-completion-date").val(formatDate(expectedCompletionDate.getDate(),expectedCompletionDate.getMonth(),expectedCompletionDate.getFullYear()));
    if(actualCompletionDate !== null)
        $("#actual-completion-date").val(formatDate(actualCompletionDate.getDate(),actualCompletionDate.getMonth(),actualCompletionDate.getFullYear()));
    $("#action-items").val(actionItem);
    $("#decisions").val(decision);
}

function tabularView() {
    $("#appBody").replaceWith(`
    <div id="appBody">
        <form class="container">
            <div class="row">
                <div class="col">
                    <label for="sort">Sort By</label>
                    <select class="form-control" id="sort"></select>
                    <div class="btn-group" role="group">
                        <button id="sort-asc-button" class="btn btn-secondary">ascending</button>
                        <button id="sort-desc-button" class="btn btn-secondary">descending</button>
                    </div>
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
                <th scope="col">priority</th>
                <th scope="col">severity</th>
                <th scope="col">raised</th>
                <th scope="col">assigned</th>
                <th scope="col">expected completion</th>
                <th scope="col">actual completion</th>
                <th scope="col">status</th>
                <th scope="col">status description</th>
                <th scope="col">last updated</th>
                <th scope="col">action item</th>
                <th scope="col">decision</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    `);

    for(let i = 0; i < db_issues.length; i++) {
        let {uid, name, description, priority, severity, status, statusDescription, dateRaised, dateAssigned, expectedCompletionDate, actualCompletionDate, updateDate, actionItem, decision} = db_issues[i];
        let AI = db_actionItems[actionItem];
        let D = db_decision[decision];
        let row = `
        <tr>
            <th>${uid}</th>
            <td>${name}</td>
            <td>${description}</td>
            <td>${db_issues_priority[priority]}</td>
            <td>${db_issues_severity[severity]}</td>
            <td>${dateRaised.toLocaleDateString()}</td>
            <td>${dateAssigned == null ? "not set" : dateAssigned.toLocaleDateString()}</td>
            <td>${expectedCompletionDate == null ? "not set" : expectedCompletionDate.toLocaleDateString()}</td>
            <td>${actualCompletionDate == null ? "not set" : actualCompletionDate.toLocaleDateString()}</td>
            <td>${db_issues_status[status]}</td>
            <td>${statusDescription}</td>
            <td>${updateDate == null ? "not set" : updateDate.toLocaleDateString()}</td>
            <td>${AI.uid} : ${AI.name}</td>
            <td>${D.uid} : ${D.name}</td>
        </tr>`;
        $("tbody").append(row);
    }

    for(let i=0; i < db_issues_sort.length; i++) {
        $("#sort").append(`<option value="${db_issues_sort[i]}"}>${db_issues_sort[i]}</option>`);
    }

    for(let i=0; i < db_issues_filter.length; i++) {
        $("#date-filter").append(`<option value="${db_issues_filter[i]}">${db_issues_filter[i]}</option>`);
    }


    $("#sort-asc-button").on("click", function(){ sortAsc($("#sort").val()); });
    $("#sort-desc-button").on("click", function(){ sortDesc($("#sort").val()); });
    $("#date-filter-button").on("click", function(){ filterDate($("#date-filter").val(), $("#date").val(), $("#days").val()); });
}

function init() {
    loadRisks();
    $("#new-risk-button").on("click", newRisk);
    $("#open-risks-button").on("click", loadRisks);
    $("#tab-risks-button").on("click", tabularView);
    $("#open").on("click", loadRisks);
    $("#new").on("click", newRisk);
    $("#tab").on("click", tabularView);
}

window.addEventListener("load", init, false);