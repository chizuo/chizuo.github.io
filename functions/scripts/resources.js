const db_sortOptions = [
    "name"
  ];
  
const db_filterOptions = ["resource, status"];
  
function newResource() {
  $("#appBody").replaceWith(`<div id="appBody" class="container">
    <form>
      <div class="form-group">
        <label for="uid">Unique I.D.</label>
        <input id="uid" class="form-control" type="text" placeholder="RES-${
          Math.floor(Math.random() * 9999998) + 1000000
        }" readonly>
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name">
      </div>
      <div class="form-group">
        <label for="description">Title</label>
        <input class="form-control" id="description" ></input>
      </div>
      <div class="form-group">
        <label for="date-created">Pay Rate</label>
        <input id="date-created" class="form-control" type="text" >
      </div>
      <div class="form-group">
        <label for="date-assigned">Availability Calendar</label>
        <input id="date-assigned" class="form-control" type="date">
      </div>
      <div class="form-group row">
        <div class="col">
          <label for="skill-list">Add to List of Skills</label>
          <input class="form-control" list="skill-list" id="skill-input">
          <datalist id="skill-list"></datalist>
        </div><div class="col">
          <label for="score">Skill Score</label>
          <input type="number" class="form-control" id="score" min="1" max="10">
          <button onclick="addSkill()" id="open-button" class="btn btn-secondary" type="button">Add</button>
        </div>
      </div>
      <div class="form-group">
        <label for="skill">List of Skills</label>
        <input type="text" class="form-control" id="skill" placeholder="" readonly>
      </div>
      <input class="btn btn-primary" type="submit" value="Save" id="save-button">
      <input class="btn btn-danger" type="reset" value="Clear">
    </form>
    </div>`);

  for (let i = 0; i < db_status.length; i++) {
    $("#status").append(`<option value=${i}>${db_status[i]}</option>`);
  }

  for (let i = 0; i < db_status.length; i++) {
    $("#resource").append(`<option value=${i}>${db_resources[i]}</option>`);
  }

  for (let i = 0; i < db_skills.length; i++) {
    $("#skill-list").append(`<option value=${db_skills[i]}>`);
  }

  $("#save-button").on("click", function () {
    alert("entry saved");
    location.reload();
  });

  $("#add-status-button").on("click", function () {
    alert("Loading status request form");
    newResource();
  });
}

function addSkill() {
  let input = $("#skill").attr("placeholder");
  input = input.length === 0 ? $("#skill-input").val() + `=${$("#score").val()}` : input + ", " + $("#skill-input").val() + `=${$("#score").val()}`;
  $("#skill").attr("placeholder",`${input}`);
  $("#skill-input").val("");
  $("#score").val("");
}

function loadResource() {
  $("#appBody").replaceWith(`
        <div id="appBody" class="container">
            <form>
                <div class="form-group">
                    <label for="resource">Resources</label>
                    <select class="form-control" id="resource">
                        <option></option>
                    </select>
                </div>
                <input onclick="openResource()" id="load-button" class="btn btn-primary" value="Open">
            </form>
        </div> 
    `);

  for (let i = 0; i < db_resources.length; i++) {
    let { uid, name } = db_resources[i];
    $("#resource").append(`<option value=${i}>${uid} : ${name}</option>`);
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

function openResource() {
  let index = document.getElementById("resource").value;
  let { uid, name, title, availabilityCalender, skills, payRate } = db_resources[index];
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
                <label for="title">Title</label>
                <input  class="form-control" type="text" placeholder="${title}" readonly>
            </div>
            <div class="form-group">
                <label for="date-created">Pay Rate</label>
                <input id="date-created" class="form-control" type="text" placeholder="$${payRate}/hr" readonly>
            </div>
            <div class="form-group">
                <div>Availability Calendar</div>
                <a href="${availabilityCalender}" target="_blank"><img id="icon" src="./scripts/calendar/icon.png"></a>
            </div>
            <div class="form-group row">
              <div class="col">
                <label for="skill-list">Add to List of Skills</label>
                <input class="form-control" list="skill-list" id="skill-input">
                <datalist id="skill-list"></datalist>
              </div><div class="col">
                <label for="score">Skill Score</label>
                <input type="number" class="form-control" id="score" min="1" max="10">
                <button onclick="addSkill()" id="open-button" class="btn btn-secondary" type="button">Add</button>
              </div>
            </div>
            <div class="form-group">
              <label for="skill">List of Skills</label>
              <input type="text" class="form-control" id="skill" placeholder="" readonly>
            </div>
            <input class="btn btn-primary" type="submit" value="Save" id="save-button">
            <input class="btn btn-danger" type="button" value="Delete" id="delete-button">
        </form>
    </div> 
    `);

  for (let i = 0; i < db_skills.length; i++) {
    $("#skill-list").append(`<option value=${db_skills[i]}>`);
  }

  let skill_list = "";
  for (let i = 0; i < skills.length; i++) {
    let { skillName, skillLevel } = skills[i];
    skill_list = skill_list.length === 0 ? `${skillName}=${skillLevel}` : `${skill_list}, ${skillName}=${skillLevel}`;
  }
  $("#skill").attr("placeholder",skill_list);
  $("#name").val(name);
  $("#resource").val(resource);
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
    const {
      uid,
      name, 
      title,
      payRate,
      availabilityCalender,
      skills
    } = db_resources[i];

    let skillList = [];
    for(let j = 0; j < skills.length; j++) {
      const { skillName, skillLevel } = skills[j];
      skillList.push(` ${skillName}=${skillLevel}`);
    }

    let row = `
        <tr>
            <th>${uid}</th>
            <td>${name}</td>
            <td>${title}</td>
            <td>${payRate}</td>
            <td><a href="${availabilityCalender}" target="_blank"><img id="icon" src="./scripts/calendar/icon.png"></a></td>
            <td>${skillList}</td>
        </tr>`;
    $("tbody").append(row);
  }

  for (let i = 0; i < db_sortOptions.length; i++) {
    $("#sort").append(`<option value="${db_sortOptions[i]}">${db_sortOptions[i]}</option>`);
  }

  $("#sort-asc-button").on("click", function () {
    sortAsc($("#sort").val());
  });

  $("#sort-desc-button").on("click", function () {
    sortDesc($("#sort").val());
  });
}

function init() {
  loadResource();
  $("#new-action-item-button").on("click", newResource);
  $("#open-action-item-button").on("click", loadResource);
  $("#tab-action-item-button").on("click", tabularView);
  $("#open").on("click", loadResource);
  $("#new").on("click", newResource);
  $("#tab").on("click", tabularView);
}

window.addEventListener("load", init, false);