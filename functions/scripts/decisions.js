const db_sortOptions = [
  "date created",
  "date assigned",
  "expected completion date",
  "actual completion date",
  "update date",
];

const db_filterOptions = ["resource, status"];

function newDecision() {
$("#appBody").replaceWith(`
      <div id="appBody" class="container">
          <form>
              <div class="form-group">
                  <label for="uid">Unique I.D.</label>
                  <input id="uid" class="form-control" type="text" placeholder="D-${
                    Math.floor(Math.random() * 9999998) + 1000000
                  }" readonly>
              </div>
              <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" class="form-control" id="name">
              </div>
              <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" id="description" rows="3" placeholder="A short description of the Decision."></textarea>
              </div>
              <div class="form-group">
                  <label for="priority">Priority</label>
                  <select class="form-control" id="priority">
                        <option></option>
                  </select>
              </div>
              <div class="form-group">
                  <label for="impact">Impact</label>
                  <select class="form-control" id="impact">
                        <option></option>
                  </select>
              </div>
              <div class="form-group">
                  <label for="date-assigned">Date Needed</label>
                  <input id="date-assigned" class="form-control" type="date">
              </div>
              <div class="form-group">
                  <label for="date-assigned">Date Made</label>
                  <input id="date-assigned" class="form-control" type="date">
              </div>
              <div class="form-group">
                    <label for="action-items">Decision Maker</label>
                    <select class="form-control" id="action-items">
                        <option></option>
                    </select>
              </div>
              <div class="form-group">
                  <label for="date-assigned">Expected Completion Date</label>
                  <input id="date-assigned" class="form-control" type="date">
              </div>
              <div class="form-group">
                  <label for="status">List of Meeting Notes</label>
                  <textarea class="form-control" id="skills" placeholder="A short list of meeting notes"></textarea>
              </div>
              <div class="form-group">
                  <label for="note-date">Note Date</label>
                  <input id="note-date" class="form-control" type="date">
              </div>
              <div class="form-group">
                  <label for="date-created">Date Created</label>
                  <input id="date-created" class="form-control" type="date">
              </div>
              <div class="form-group">
                    <label for="status">Status</label>
                    <select class="form-control" id="status">
                      <option></option>
                    </select>
                    <button id="add-status-button" class="btn btn-secondary">Add a status</button>
              </div>
              <div class="form-group">
                    <label for="status-description">Status Description</label>
                    <textarea class="form-control" id="status-description" rows="3" placeholder="A short description of the Decision's status as of the last update."></textarea>
              </div>
              <div class="form-group">
                    <label for="list-of-reference-notes">List of Reference Notes</label>
                    <textarea class="form-control" id="list-of-reference-notes" rows="3" placeholder="A short list of reference notes"></textarea>
              </div>
              <div class="form-group">
                  <label for="update-date">Update Date</label>
                  <input id="update-date" class="form-control" type="date">
              </div>
              <input class="btn btn-primary" type="submit" value="Save" id="save-button">
              <input class="btn btn-danger" type="reset" value="Clear">
          </form>
      </div> 
  `);


for(let i = 0; i < db_priorityList.length; i++){
  $("#priority").append(`<option value=${i}> ${db_priorityList[i]} </option>`)
}

for(let i = 0; i < db_impactList.length; i++){
  $("#impact").append(`<option value=${i}> ${db_impactList[i]} </option>`)
}

for (let i = 0; i < db_resources.length; i++) {
  let { uid, name } = db_resources[i];
  $("#action-items").append(`<option value=${i}>${uid} : ${name}</option>`);
}

for (let i = 0; i < db_statusDecision.length; i++) {
  $("#status").append(`<option value=${i}>${db_statusDecision[i]}</option>`);
}

for (let i = 0; i < db_status.length; i++) {
  $("#resource").append(`<option value=${i}>${db_resources[i]}</option>`);
}

$("#save-button").on("click", function () {
  alert("entry saved");
  location.reload();
});

$("#add-status-button").on("click", function () {
  alert("Loading status request form");
  newDecision();
});
}

function loadDecisions() {
$("#appBody").replaceWith(`
      <div id="appBody" class="container">
          <form>
              <div class="form-group">
                  <label for="decisions">Decisions</label>
                  <select class="form-control" id="decisions">
                      <option></option>
                  </select>
              </div>
              <input onclick="openDecision()" id="load-button" class="btn btn-primary" value="Open">
          </form>
      </div> 
  `);

  for (let i = 0; i < db_decision.length; i++) {
    let { uid, name } = db_decision[i];
    $("#decisions").append(`<option value=${i}>${uid} : ${name}</option>`);
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

function filterDecision(data) {
  alert(`table contents are now filtered by decision=${data}`);
  tabularView();
}

function formatDate(date, month, year) {
  let Month = parseInt(month) < 10 ? `0${month}` : month;
  let Date = parseInt(date) < 10 ? `0${date}` : date;
  return `${year}-${Month}-${Date}`;
}

function openDecision() {
let index = document.getElementById("decisions").value;
let { 
  uid, name, description, priority, impact, dateNeeded, dateMade, 
  resource, expectedCompletionDate, actualCompletionDate, status, 
  listofMeetingNotes, statusDescription, listOfRefNotes, updateDate
} = db_decision[index];
$("#appBody").replaceWith(`
  <div id="appBody" class="container">
      <form>
          <div class="form-group">
              <label for="uid">Unique I.D.</label>
              <input id="uid" class="form-control" type="text" placeholder="${uid}" readonly>
          </div>
          <div class="form-group">
              <label for="name">${name}</label>
              <input type="text" class="form-control" id="name">
          </div>
          <div class="form-group">
                <label for="description">Description</label>
                <input id="description" class="form-control" type="text" placeholder="${description}">
          </div>
          <div class="form-group">
              <label for="priority">Priority</label>
              <input type="text" class="form-control" placeholder="${priority}" readonly>
          </div>
          <div class="form-group">
              <label for="impact">Impact</label>
              <input type="text" class="form-control" placeholder="${impact}" readonly>
          </div>
          <div class="form-group">
              <label for="date-needed">Date Needed</label>
              <input id="date-needed" class="form-control" type="date" placeholder="${dateNeeded}">
          </div>
          <div class="form-group">
              <label for="date-made">Date Made</label>
              <input id="date-made" class="form-control" type="date" placeholder="${dateMade}">
          </div>
          <div class="form-group">
                <label for="decision-maker">Decision Maker</label>
                <input type="text" class="form-control" placeholder="${resource}" readonly>
          </div>
          <div class="form-group">
              <label for="expected-completion-date">Expected Completion Date</label>
              <input id="expected-completion-date" class="form-control" type="date" placeholder="${expectedCompletionDate}">
          </div>
          <div class="form-group">
              <label for="actual-completion-date">Actual Completion Date</label>
              <input id="actual-completion-date" class="form-control" type="date" placeholder="${actualCompletionDate}">
          </div>
          <div class="form-group">
              <label for="list-of-meeting-notes">List of Meeting Notes</label>
              <input id="list-of-meeting-notes" class="form-control" type="text" placeholder="${listofMeetingNotes}">
          </div>
          <div class="form-group">
              <label for="note-date">Note Date</label>
              <input id="note-date" class="form-control" type="date" placeholder="${dateMade}">
          </div>
          <div class="form-group">
              <label for="date-created">Date Created</label>
              <input id="note-date" class="form-control" type="date" placeholder="${dateMade}">
          </div>
          <div class="form-group">
                <label for="status">Status</label>
                <input id="status" class="form-control" type="text" placeholder="${db_statusDecision}" readonly>
          </div>
          <div class="form-group">
                <label for="status-description">Status Description</label>
                <input id="status-description" class="form-control" type="text" placeholder="${statusDescription}">
          </div>
          <div class="form-group">
                <label for="list-of-reference-notes">List of Reference Notes</label>
                <input id="list-of-meeting-notes" class="form-control" type="text" placeholder="${listOfRefNotes}">
          <div class="form-group">
              <label for="update-date">Update Date</label>
              <input id="update-date" class="form-control" type="date" placeholder="${updateDate}">
          </div>
          <input class="btn btn-primary" type="submit" value="Save" id="save-button">
          <input class="btn btn-danger" type="button" value="Delete" id="delete-button">
      </form>
  </div> 
  `);

for (let i = 0; i < db_status.length; i++) {
  $("#status").append(`<option value=${i}>${db_status[i]}</option>`);
}

//   for (let i = 0; i < db_status.length; i++) {
//     $("#resource").append(`<option value=${i}>${db_resources[i]}</option>`);
//   }

  $("#name").val(name);
  $("#description").val(description);
  $("#resource").val(resource);
  $("#status").val(status);
  $("#status-description").val(statusDescription);
  $("#status-description").change(function () {
    $("#update-date").replaceWith(
      `<input id="update-date" class="form-control" type="text" placeholder="${new Date().toLocaleDateString()}" readonly>`
    );
  });
  $("#save-button").on("click", function () {
    alert(`${uid} : ${name} has been updated.`);
    location.reload();
  });
  $("#delete-button").on("click", function () {
    if (confirm(`Confirm deletion of ${uid} : ${name}`) === true) {
      alert(`${uid} : ${name} has been deleted`);
      location.reload();
    } else {
      alert(`Delete request of ${uid} : ${name} been cancelled`);
    }
  });
  $("#add-status-button").on("click", function () {
    alert("Loading status request form");
    newDecision();
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
                  <th scope="col">title</th>
                  <th scope="col">pay rate</th>
                  <th scope="col">availability calendar</th>
                  <th scope="col">skills</th>
              </tr>
          </thead>
          <tbody></tbody>
      </table>
  </div>
  `);

for (let i = 0; i < db_resources.length; i++) {
  var {
    uid,
    name, 
    title,
    payRate,
    availabilityCalender,
    skills
  } = db_resources[index];
  var row = `
      <tr>
          <th>${uid}</th>
          <td>${name}</td>
          <td>${title}</td>
          <td>${payRate}</td>
          <td>${availabilityCalender}</td>
          <td id="skill">${JSON.stringify(skills)}</td>
      </tr>`;
  $("tbody").append(row);
}

for (let i = 0; i < db_sortOptions.length; i++) {
  $("#sort").append(
    `<option value="${db_sortOptions[i]}") }>${db_sortOptions[i]}</option>`
  );
}

for (let i = 0; i < db_resource.length; i++) {
  $("#resource-filter").append(
    `<option value="${db_resource[i]}") }>${db_resource[i]}</option>`
  );
}

for (let i = 0; i < db_status.length; i++) {
  $("#status-filter").append(
    `<option value="${db_status[i]}") }>${db_status[i]}</option>`
  );
}

$("#sort-asc-button").on("click", function () {
  sortAsc($("#sort").val());
});
$("#sort-desc-button").on("click", function () {
  sortDesc($("#sort").val());
});
$("#resource-filter-button").on("click", function () {
  filterResource($("#resource-filter").val());
});
$("#status-filter-button").on("click", function () {
  filterStatus($("#status-filter").val());
});
}

function init() {
loadDecisions();
$("#new-action-item-button").on("click", newDecision);
$("#open-action-item-button").on("click", loadDecisions);
$("#tab-action-item-button").on("click", tabularView);
$("#open").on("click", loadDecisions);
$("#new").on("click", newDecision);
$("#tab").on("click", tabularView);
}

window.addEventListener("load", init, false);