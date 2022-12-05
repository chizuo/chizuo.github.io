function newRequirement() {
  $("#appBody").replaceWith(`<div id="appBody" class="container">
    <form>
      <div class="form-group">
        <label for="uid">Unique I.D.</label>
        <input id="uid" class="form-control" type="text" placeholder="REQ-${
          Math.floor(Math.random() * 9999998) + 1000000
        }" readonly>
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name">
      </div>
      <div class="form-group">
        <label for="text">Requirement text</label>
        <textarea class="form-control" id="text" rows="3" placeholder="The text of the requirement"></textarea>
      </div>
      <div class="form-group">
        <label for="source-document">Source Document</label>
        <textarea class="form-control" id="source-document" placeholder="The name of the document that contains the requirement"></textarea>
      </div>
      <div class="form-group">
        <label for="location-source">Location in Source Document</label>
        <textarea class="form-control" id="location-source" placeholder="The page and paragraph numbers where the requirement is located within the document."></textarea>
      </div>
      <div class="form-group">
        <label for="client-reference">Client Reference</label>
        <textarea class="form-control" id="client-reference" placeholder="Reference to client's source document for requirement. Inlucde page & paragraph #"></textarea>
      </div>
      <div class="form-group">
        <label for="deliverable">Deliverable</label>
        <select class="form-control" id="deliverable">
            <option></option>
        </select>
      </div>
      <input class="btn btn-primary" type="submit" value="Save" id="save-button">
      <input class="btn btn-danger" type="reset" value="Clear">
    </form>
  </div>`);

  for(let i = 0; i < db_deliverables.length; i++) {
    let { name, uid } = db_deliverables[i];
    $("#deliverable").append(`<option>${uid} : ${name}</option>`);
  }

  $("#save-button").on("click", function () {
    alert("entry saved");
    location.reload();
  });
}

function loadRequirements() {
  $("#appBody").replaceWith(`<div id="appBody" class="container">
    <form>
      <div class="form-group">
          <label for="requirements">Requirements</label>
          <select class="form-control" id="requirements">
              <option></option>
          </select>
      </div>
      <input onclick="openRequirement()" id="load-button" class="btn btn-primary" value="Open">
    </form>
  </div>`);

  for (let i = 0; i < db_requirements.length; i++) {
    let { uid, name } = db_requirements[i];
    $("#requirements").append(`<option value=${i}>${uid} : ${name}</option>`);
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

function formatDate(date, month, year) {
  let Month = parseInt(month) < 10 ? `0${month}` : month;
  let Date = parseInt(date) < 10 ? `0${date}` : date;
  return `${year}-${Month}-${Date}`;
}

function openRequirement() {
  let index = document.getElementById("requirements").value;
  let {
    uid,
    name,
    text,
    sourceDocument,
    sourcePage,
    sourceParagraph,
    clientReference,
    clientPage,
    clientParagraph,
    DeliverableId
  } = db_requirements[index];

  $("#appBody").replaceWith(`<div id="appBody" class="container">
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
        <label for="requirement">Requirement text</label>
        <textarea class="form-control" id="requirement" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label for="source-document">Source Document</label>
        <input id="source-document" class="form-control" type="text">
      </div>
      <div class="form-group">
        <label for="location-source">Location in Source Document</label>
        <input id="location-source" class="form-control" type="text">
      </div>
      <div class="form-group">
        <label for="client-reference">Client Reference</label>
        <input id="client-reference" class="form-control" type="text">
      </div>
      <div class="form-group">
        <label for="deliverable">Deliverable</label>
        <select class="form-control" id="deliverable">
            <option></option>
        </select>
      </div>
      <input class="btn btn-primary" type="submit" value="Save" id="save-button">
      <input class="btn btn-danger" type="button" value="Delete" id="delete-button">
    </form>
  </div>`);

  for(let i = 0; i < db_deliverables.length; i++) {
    let deliverables = db_deliverables[i];
    $("#deliverable").append(`<option value=${i}>${deliverables.uid} : ${deliverables.name}</option>`)
  }

  $("#name").val(name);
  $("#requirement").val(text);
  $("#source-document").val(sourceDocument);
  $("#location-source").val(`${sourceParagraph} on ${sourcePage}`);
  $("#client-reference").val(`${clientReference} - ${clientParagraph} on ${clientPage}`);
  $("#deliverable").val(DeliverableId);

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
}

function tabularView() {
  $("#appBody").replaceWith(`<div id="appBody">
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
        </div><br>
    </form>
    <table id="tabView" class="table table-striped">
        <thead>
            <tr>
                <th scope="col">uid</th>
                <th scope="col">name</th>
                <th scope="col">text</th>
                <th scope="col">source</th>
                <th scope="col">location in source</th>
                <th scope="col">client reference</th>
                <th scope="col">deliverable</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
  </div>`);

  for (let i = 0; i < db_requirements.length; i++) {
    let { uid, name, text, sourceDocument, sourcePage, sourceParagraph, clientReference, clientPage, clientParagraph, DeliverableId } = db_requirements[i];
    let deliverable = db_deliverables[DeliverableId]; 
    let row = `
        <tr>
            <th>${uid}</th>
            <td>${name}</td>
            <td>${text}</td>
            <td>${sourceDocument}</td>
            <td>${sourceParagraph} on ${sourcePage}</td>
            <td>${clientReference} - ${clientParagraph} on ${clientPage}</td>
            <td>${deliverable.uid}:${deliverable.name}</td>
        </tr>`;
    $("tbody").append(row);
  }

  $("#sort").append(`<option value="name">name</option>`);

  $("#sort-asc-button").on("click", function () {
    sortAsc($("#sort").val());
  });
  $("#sort-desc-button").on("click", function () {
    sortDesc($("#sort").val());
  });
}

function init() {
  loadRequirements();
  $("#new-requirement-button").on("click", newRequirement);
  $("#open-requirements-button").on("click", loadRequirements);
  $("#tab-requirements-button").on("click", tabularView);
  $("#open").on("click", loadRequirements);
  $("#new").on("click", newRequirement);
  $("#tab").on("click", tabularView);
}

window.addEventListener("load", init, false);
