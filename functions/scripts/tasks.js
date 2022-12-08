function newTask() {
    $("#appBody").html(`<form>
        <div class="form-group">
            <label for="uid">Unique I.D.</label>
            <input id="uid" class="form-control" type="text" placeholder="T-${(Math.floor(Math.random() * 9999998) + 1000000)}" readonly>
        </div>
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name">
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <textarea class="form-control" id="description" rows="3" placeholder="A short description of the Task."></textarea>
        </div>
        <div class="form-group">
            <label for="resources">Resource Assigned</label>
            <select class="form-control" id="resources">
                <option></option>
            </select>
            <a id="resources-button" href="./resources.html" class="btn btn-secondary" role="button">Add a resource</a>
        </div>
        <div class="form-group">
            <label for="expected-start-date">Expected Start Date</label>
            <input id="expected-start-date" class="form-control" type="date">
        </div>
        <div class="form-group">
            <label for="expected-end-date">Expected End Date</label>
            <input id="expected-end-date" class="form-control" type="date">
        </div>
        <div class="form-group">
            <label for="expected-duration">Expected Duration</label>
            <input type="number" class="form-control" id="expected-duration" min="0">
        </div>
        <div class="form-group">
            <label for="expected-effort">Expected Effort</label>
            <input type="number" class="form-control" id="expected-effort" min="0">
        </div>
        <div class="form-group">
            <label for="actual-start-date">Actual Start Date</label>
            <input id="actual-start-date" class="form-control" type="date">
        </div>
        <div class="form-group">
            <label for="actual-end-date">Actual End Date</label>
            <input id="actual-end-date" class="form-control" type="date">
        </div>
        <div class="form-group">
            <label for="actual-duration">Actual Duration</label>
            <input type="number" class="form-control" id="actual-duration" min="0">
        </div>
        <div class="form-group">
            <label for="effort-completed">Effort Completed</label>
            <input type="number" class="form-control" id="effort-completed" min="0">
        </div>
        <div class="form-group">
            <label for="actual-effort">Actual Effort</label>
            <input type="number" class="form-control" id="actual-effort" min="0">
        </div>
        <div class="form-group">
            <label for="percent">Percent Complete</label>
            <input type="number" class="form-control" id="percent" min="0" max="100">
        </div>
        <div class="form-group row">
            <div class="col">
                <label for="predecessor-list">List of Predecessor Tasks</label>
                <select class="form-control" id="predecessor-list"><option></option></select>
                <button onclick="addPredecessor()" id="add-predecessor-button" type="button" class="btn btn-secondary">Add</button>
            </div>
            <div class="col">
                <label for="predecessor">Predecessor Tasks</label>
                <input type="text" class="form-control" id="predecessor" placeholder="" readonly>
            </div>
        </div>
        <div class="form-group row">
            <div class="col">
                <label for="successor-list">List of Successor Tasks</label>
                <select class="form-control" id="successor-list"><option></option></select>
                <button onclick="addSuccessor()" id="add-successor-button" type="button" class="btn btn-secondary">Add</button>
            </div>
            <div class="col">
                <label for="successor">Successor Tasks</label>
                <input type="text" class="form-control" id="successor" placeholder="" readonly>
            </div>
        </div>
        <div class="form-group row">
            <div class="col">
                <label for="issue-list">List of Issues</label>
                <select class="form-control" id="issue-list"><option></option></select>
                <button onclick="addIssue()" id="add-issue-button" type="button" class="btn btn-secondary">Add</button>
            </div>
            <div class="col">
                <label for="issue">Issues</label>
                <input type="text" class="form-control" id="issue" placeholder="" readonly>
            </div>
        </div>
        <div class="form-group">
            <label for="task-type">Task Type</label>
            <select class="form-control" id="task-type">
                <option value="regular">Regular</option>
                <option value="summary">Summary</option> 
            </select>
        </div>
        <div class="form-group row">
            <div class="col">
                <label for="group">Group Identifier</label>
                <select class="form-control" id="group"><option></option></select>
            </div>
            <div class="col">
                <label for="group-add">Add New Group Identifier</label>
                <input id="group-add" class="form-control" type="text" placeholder="GROUP-${(Math.floor(Math.random() * 9999998) + 1000000)}" readonly>
                <button onclick="addGroup()" id="add-group-button" type="button" class="btn btn-secondary">Add</button>
            </div>
        </div>
        <input class="btn btn-primary" type="submit" value="Save" id="save-button">
        <input class="btn btn-danger" type="reset" value="Clear">
    </form>`);
    loadFormActions("","");
}
  
function addGroup() {
    $("#group").append(`<option value=${$("#group-add").attr("placeholder")}>${$("#group-add").attr("placeholder")}</option>`);
    $("#group-add").attr("placeholder",`GROUP-${(Math.floor(Math.random() * 9999998) + 1000000)}`);
}

function addPredecessor() {
    let predecessor = $("#predecessor").attr("placeholder");
    let input = $("#predecessor-list").val();
    predecessor = predecessor.length === 0 ? input : `${predecessor}, ${input}`;
    $("#predecessor").attr("placeholder", predecessor);
}

function addSuccessor() {
    let successor = $("#successor").attr("placeholder");
    let input = $("#successor-list").val();
    successor = successor.length === 0 ? input : `${successor}, ${input}`;
    $("#successor").attr("placeholder", successor);
}

function addIssue() {
    let issue = $("#issue").attr("placeholder");
    let input = $("#issue-list").val();
    issue = issue.length === 0 ? input : `${issue}, ${input}`;
    $("#issue").attr("placeholder", issue);
}
  
function loadFormActions(UID, NAME) {
    for(let i = 0; i < db_resources.length; i++) {
        let { uid, name } = db_resources[i];
        $("#resources").append(`<option value="${uid}">${uid} : ${name}</option>`);
    }

    for(let i = 0; i < 5; i++) {
        let group = `GROUP-${(Math.floor(Math.random() * 9999998) + 1000000)}`
        $("#group").append(`<option value="${group}">${group}</group>`);
    }

    for(let i = 0; i < db_issues.length; i++) {
        let { uid, name } = db_issues[i];
        $("#issue-list").append(`<option value="${uid}">${uid} : ${name}</option>`);
    }

    for(let i = 0; i < db_predecessor.length; i++) {
        let { uid, name } = db_predecessor[i];
        $("#predecessor-list").append(`<option value=${uid}>${uid} : ${name}</option>`)
    }

    for(let i = 0; i < db_successor.length; i++) {
        let { uid, name } = db_successor[i];
        $("#successor-list").append(`<option value=${uid}>${uid} : ${name}</option>`)
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
  
  function loadTasks() {
      $("#appBody").replaceWith(`
          <div id="appBody" class="container">
              <form>
                  <div class="form-group">
                      <label for="tasks">Tasks</label>
                      <select class="form-control" id="tasks">
                          <option></option>
                      </select>
                  </div>
                  <input onclick="openTask()" id="open-button" class="btn btn-primary" type="submit" value="Open">
              </form>
          </div> 
      `);
  
      for(let i = 0; i < db_tasks.length; i++) {
          let { uid, name } = db_tasks[i];
          $("#tasks").append(`<option value=${uid}>${uid} : ${name}</option>`);
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
  
  function filterResource(data) {
    alert(`table contents are now filtered by resource=${data}`);
    tabularView();
  }
  
  function openTask() {
      let index = document.getElementById("decisions").value;
      let { uid, name, description, priority, impact, status, statusDescription, dateCreated, dateNeeded, 
            dateMade, expectedCompletionDate, actualCompletionDate, updateDate, resource } = db_decisions[index];
  
      $("#appBody").html(`<form>
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
          <textarea class="form-control" id="description" rows="3" placeholder="A short description of the Task."></textarea>
        </div>
        <div class="form-group row">
          <div class="col">
            <label for="priority">Priority</label>
            <select class="form-control" id="priority"></select>
          </div>
          <div class="col">
            <label for="priority-add">Add to Priority</label>
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
            <button onclick="addImpact()" type="button" id="add-impact-button" class="btn btn-secondary">Add</button>
          </div>
        </div>
        <div class="form-group">
          <label for="date-created">Date Created</label>
          <input id="date-created" class="form-control" type="text" value="${dateCreated.toLocaleDateString()}" readonly>
        </div>
        <div class="form-group">
          <label for="date-needed">Date Needed</label>
          <input id="date-needed" class="form-control" type="date">
        </div>
        <div class="form-group">
          <label for="date-made">Date Made</label>
          <input id="date-made" class="form-control" type="date">
        </div>
        <div class="form-group">
          <label for="resources">Task Maker</label>
          <select class="form-control" id="resources"></select>
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
          <textarea class="form-control" id="status-description" rows="3" placeholder="A short description of the Task's status as of the last update."></textarea>
        </div>
        <div class="form-group">
          <label for="update-date">Update Date</label>
          <input id="update-date" class="form-control" type="text" placeholder="${updateDate.toLocaleDateString()}" readonly>
        </div>
        <input class="btn btn-primary" type="submit" value="Save" id="save-button">
        <input class="btn btn-danger" type="button" value="Delete" id="delete-button">        
      </form>`);
      loadFormActions(uid, name);
      $("#name").val(name);
      $("#description").val(description);
      $("#priority").val(db_issues_priority[priority]);
      $("#impact").val(db_risks_impact[impact]);
      $("#status").val(`${db_issues_status[status]}`);
      $("#resources").val(`${db_resources[resource].uid}:${db_resources[resource].name}`)
      $("#status-description").val(statusDescription);
      if(dateNeeded !== null)
        $("#date-needed").val(formatDate(dateNeeded.getDate(), dateNeeded.getMonth(), dateNeeded.getFullYear()));
      if(dateMade !== null)
        $("#date-made").val(formatDate(dateMade.getDate(), dateMade.getMonth(), dateMade.getFullYear()));
      if(expectedCompletionDate !== null)
        $("#expected-completion-date").val(formatDate(expectedCompletionDate.getDate(),expectedCompletionDate.getMonth(),expectedCompletionDate.getFullYear()));
      if(actualCompletionDate !== null)
        $("#actual-completion-date").val(formatDate(actualCompletionDate.getDate(),actualCompletionDate.getMonth(),actualCompletionDate.getFullYear()));
  }
  
  function tabularView() {
    $("#appBody").replaceWith(`<div id="appBody">
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
          <th scope="col">priority</th>
          <th scope="col">impact</th>
          <th scope="col">created on</th>
          <th scope="col">needed on</th>
          <th scope="col">decision made on</th>
          <th scope="col">decision maker</th>
          <th scope="col">expected on</th>
          <th scope="col">completed on</th>
          <th scope="col">status</th>
          <th scope="col">status description</th>
          <th scope="col">last updated</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    </div>`);
  
    for(let i = 0; i < db_decisions.length; i++) {
      let { uid, name, description, priority, impact, status, statusDescription, dateCreated, dateNeeded, 
            dateMade, expectedCompletionDate, actualCompletionDate, updateDate, resource } = db_decisions[i];
   
        let row = `<tr>
          <th>${uid}</th>
          <td>${name}</td>
          <td>${description}</td>
          <td>${db_issues_priority[priority]}</td>
          <td>${db_risks_impact[impact]}</td>
          <td>${dateCreated.toLocaleDateString()}</td>
          <td>${dateNeeded == null ? "not set" : dateNeeded.toLocaleDateString()}</td>
          <td>${dateMade == null ? "not set" : dateMade.toLocaleDateString()}</td>
          <td>${db_resources[resource].uid}:${db_resources[resource].name}</td>
          <td>${expectedCompletionDate == null ? "not set" : expectedCompletionDate.toLocaleDateString()}</td>
          <td>${actualCompletionDate == null ? "not set" : actualCompletionDate.toLocaleDateString()}</td>
          <td>${db_issues_status[status]}</td>
          <td>${statusDescription}</td>
          <td>${updateDate == null ? "not set" : updateDate.toLocaleDateString()}</td>
        </tr>`;
        $("tbody").append(row);
    }
  
    for(let i=0; i < db_resources.length; i++) {
      $("#resource-filter").append(`<option value="${db_resources[i].uid}:${db_resources[i].name}">${db_resources[i].uid}:${db_resources[i].name}</option>`);
    }
  
    for(let i=0; i < db_issues_sort.length; i++) {
      $("#sort").append(`<option value="${db_issues_sort[i]}">${db_issues_sort[i]}</option>`);
    }
  
    for(let i=0; i < db_issues_filter.length; i++) {
      $("#date-filter").append(`<option value="${db_issues_filter[i]}">${db_issues_filter[i]}</option>`);
    }
  
    $("#sort-asc-button").on("click", function(){ sortAsc($("#sort").val()); });
    $("#sort-desc-button").on("click", function(){ sortDesc($("#sort").val()); });
    $("#date-filter-button").on("click", function(){ filterDate($("#date-filter").val(), $("#date").val(), $("#days").val()); });
    $("#resource-filter-button").on("click", function(){ filterResource($("#resource-filter").val()); });
  }
  
  function init() {
      loadTasks();
      $("#new-task-button").on("click", newTask);
      $("#open-tasks-button").on("click", loadTasks);
      $("#tab-tasks-button").on("click", tabularView);
      $("#open").on("click", loadTasks);
      $("#new").on("click", newTask);
      $("#tab").on("click", tabularView);
  }
  
  window.addEventListener("load", init, false);