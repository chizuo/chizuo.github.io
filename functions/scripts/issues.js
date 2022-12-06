function newIssue() {
    $("#appBody").html(`
        <form>
        <div class="form-group">
            <label for="uid">Unique I.D.</label>
            <input id="uid" class="form-control" type="text" placeholder="I-${(Math.floor(Math.random() * 9999998) + 1000000)}" readonly>
        </div>
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name">
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <textarea class="form-control" id="description" rows="3" placeholder="A short description of the Decision."></textarea>
        </div>
        <div class="form-group row">
            <div class="col">
                <label for="priority">Priority</label>
                <select class="form-control" id="priority"></select>
            </div>
            <div class="col">
                <label for="priority-add">Add a Priority</label>
                <input type="text" class="form-control" id="priority-add">
                <button onclick="addPriority()" id="add-priority-button" type="button" class="btn btn-secondary">Add</button>
            </div>
        </div>
        <div class="form-group row">
            <div class="col">
                <label for="impact">Impact</label>
                <select class="form-control" id="impact"></select>
            </div>
            <div class="col">
                <label for="impact-add">Add to Impact</label>
                <input type="text" class="form-control" id="impact-add">
                <button onclick="addImpact()" type="button" id="add-severity-button" class="btn btn-secondary">Add</button>
            </div>
        </div>
        <div class="form-group">
            <label for="date-raised">Date Raised</label>
            <input id="date-raised" class="form-control" type="text" value="${new Date().toLocaleDateString()}" readonly>
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
            <input id="update-date" class="form-control" type="text" placeholder="" readonly>
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
        <input class="btn btn-danger" type="reset" value="Clear">
    </form>`);
    loadFormActions("","");
}

function addPriority() {
    $("#priority").append(`<option value=${$("#priority-add").val()}>${$("#priority-add").val()}</option>`);
    $("#priority-add").val("");
}

function addSeverity() {
    $("#severity").append(`<option value=${$("#severity-add").val()}>${$("#severity-add").val()}</option>`);
    $("#severity-add").val("");
}

function loadFormActions(UID, NAME) {
    for(let i = 0; i < db_issues_status.length; i++) {
        $("#status").append(`<option value=${i}>${db_issues_status[i]}</option>`)
    }

    for(let i = 0; i < db_issues_severity.length; i++) {
        $("#severity").append(`<option value=${i}>${db_issues_severity[i]}</option>`)
    }

    for(let i = 0; i < db_issues_priority.length; i++) {
        $("#priority").append(`<option value=${i}>${db_issues_priority[i]}</option>`)
    }

    for(let i = 0; i < db_actionItems.length; i++) {
        let { uid, name } = db_actionItems[i];
        $("#action-items").append(`<option value=${i}>${uid} : ${name}</option>`);
    }

    for(let i = 0; i < db_decision.length; i++) {
        let { uid, name } = db_decision[i];
        $("#decisions").append(`<option value=${i}>${uid} : ${name}</option>`);
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

    $("#status-description").change(function() {
        $("#update-date").replaceWith(`<input id="update-date" class="form-control" type="text" placeholder="${new Date().toLocaleDateString()}" readonly>`);
    });
}

function loadIssues() {
    $("#appBody").replaceWith(`
        <div id="appBody" class="container">
            <form>
                <div class="form-group">
                    <label for="issues">Issues</label>
                    <select class="form-control" id="issues">
                        <option></option>
                    </select>
                </div>
                <input onclick="openIssue()" id="open-button" class="btn btn-primary" type="submit" value="Open">
            </form>
        </div> 
    `);

    for(let i = 0; i < db_issues.length; i++) {
        let { uid, name } = db_issues[i];
        $("#issues").append(`<option value=${i}>${uid} : ${name}</option>`);
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

function openIssue() {
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
            <div class="form-group row">
                <div class="col">
                    <label for="priority">Priority</label>
                    <select class="form-control" id="priority"></select>
                </div>
                <div class="col">
                    <label for="priority-add">Add a Priority</label>
                    <input type="text" class="form-control" id="priority-add">
                    <button onclick="addPriority()" id="add-priority-button" type="button" class="btn btn-secondary">Add</button>
                </div>
            </div>
            <div class="form-group row">
                <div class="col">
                    <label for="severity">Severity</label>
                    <select class="form-control" id="severity"></select>
                </div>
                <div class="col">
                    <label for="severity-add">Add a Severity</label>
                    <input type="text" class="form-control" id="severity-add">
                    <button onclick="addSeverity()" type="button" id="add-severity-button" class="btn btn-secondary">Add</button>
                </div>
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
    if(dateAssigned !== null)
        $("#date-assigned").val(formatDate(dateAssigned.getDate(), dateAssigned.getMonth(), dateAssigned.getFullYear()));
    if(expectedCompletionDate !== null)
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
    loadIssues();
    $("#new-issue-button").on("click", newIssue);
    $("#open-issues-button").on("click", loadIssues);
    $("#tab-issues-button").on("click", tabularView);
    $("#open").on("click", loadIssues);
    $("#new").on("click", newIssue);
    $("#tab").on("click", tabularView);
}

window.addEventListener("load", init, false);