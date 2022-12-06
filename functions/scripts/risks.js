function newRisk() {
    $("#appBody").html(`<form>
        <div class="form-group">
            <label for="uid">Unique I.D.</label>
            <input id="uid" class="form-control" type="text" placeholder="R-${(Math.floor(Math.random() * 9999998) + 1000000)}" readonly>
        </div>
        <div class="form-group row">
            <div class="col">
                <label for="category">Category</label>
                <select class="form-control" id="category"></select>
            </div>
            <div class="col">
                <label for="category-input">Add to Category</label>
                <input type="text" class="form-control" id="category-input">
                <button onclick="addCategory()" type="button" id="add-category-button" class="btn btn-secondary">Add</button>
            </div>
        </div>
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name">
        </div>
        <div class="form-group">
            <label for="probability">Probability</label>
            <input type="number" class="form-control" id="probability" min="0" max="100" placeholder="integer representing %">
        </div>
        <div class="form-group row">
            <div class="col">
                <label for="impact">Impact</label>
                <select class="form-control" id="impact"></select>
            </div>
            <div class="col">
                <label for="impact-input">Add to Impact</label>
                <input type="text" class="form-control" id="impact-input">
                <button onclick="addImpact()" type="button" id="add-impact-button" class="btn btn-secondary">Add</button>
            </div>
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
            <button onclick="addActionItem()" id="open-button" class="btn btn-primary" type="button">Add to Action Items for this Risk</button>
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

function addCategory() {
    $("#category").append(`<option value=${$("#category-input").val()}>${$("#category-input").val()}</option>`);
    $("#category-input").val("");
}

function addImpact() {
    $("#impact").append(`<option value=${$("#impact-input").val()}>${$("#impact-input").val()}</option>`);
    $("#impact-input").val("");
}

function loadFormActions(UID, NAME) {
    for(let i = 0; i < db_actionItems.length; i++) {
        $("#action-items-list").append(`<option value="${db_actionItems[i].uid}:${db_actionItems[i].name}">`);
    }

    for(let i = 0; i < db_risks_impact.length; i++) {
        $("#impact").append(`<option value=${db_risks_impact[i]}>${db_risks_impact[i]}</option>`);
    }

    for(let i = 0; i < db_risks_category.length; i++) {
        $("#category").append(`<option value=${db_risks_category[i]}>${db_risks_category[i]}</option>`);
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
    let index = document.getElementById("risks").value;
    let { uid, name, category, probability, impact, mitigation, contingency, riskScore, actionBy, actionItems } = db_risks[index];

    $("#appBody").html(`<form>
        <div class="form-group">
            <label for="uid">Unique I.D.</label>
            <input id="uid" class="form-control" type="text" placeholder=${uid} readonly>
        </div>
        <div class="form-group row">
            <div class="col">
                <label for="category">Category</label>
                <select class="form-control" id="category"></select>
            </div>
            <div class="col">
            <label for="category">Add to Category</label>
                <input class="form-control" id="category-add">
                <button onclick="addCategory()" id="add-category-button" class="btn btn-secondary">Add</button>
            </div>
        </div>
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name">
        </div>
        <div class="form-group">
            <label for="probability">Probability</label>
            <input type="number" class="form-control" id="probability" min="0" max="100" placeholder="integer representing %">
        </div>
        <div class="form-group row">
            <div class="col">
                <label for="impact">Impact</label>
                <select class="form-control" id="impact"></select>
            </div>
            <div class="col">
                <label for="impact-input">Add to Impact</label>
                <input type="text" class="form-control" id="impact-input">
                <button onclick="addImpact()" type="button" id="add-impact-button" class="btn btn-secondary">Add</button>
            </div>
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
            <button onclick="addActionItem()" id="open-button" class="btn btn-primary" type="button">Add to Action Items for this Risk</button>
        </div>
        <div class="form-group">
            <label for="action-items">Action Items for Risk</label>
            <input type="text" class="form-control" id="action-items" placeholder="" readonly>
        </div>
        <input class="btn btn-primary" type="submit" value="Save" id="save-button">
        <input class="btn btn-danger" id="delete-button" type="button" value="Delete">
    </form>`);
    loadFormActions(uid, name);
    $("#uid").val(uid);
    $("#name").val(name);
    $("#category").val(db_risks_category[category]);
    $("#probability").val(probability);
    $("#impact").val(db_risks_impact[impact]);
    $("#mitigation").val(mitigation);
    $("#contingency").val(contingency);
    $("#score").val(riskScore);
    let AI = "";
    for (let i = 0; i < actionItems.length; i++) {
        let actionItem = db_actionItems[actionItems[i]];
        AI = AI.length === 0 ? `${actionItem.uid}:${actionItem.name}` : AI + ", " + `${actionItem.uid}:${actionItem.name}`;
    }
    $("#action-items").attr("placeholder",AI);
    if(actionBy != null)
        $("#action-date").val(formatDate(actionBy.getDate(), actionBy.getMonth(), actionBy.getFullYear()));

}

function tabularView() {
    $("#appBody").html(`
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
                    <th scope="col">category</th>
                    <th scope="col">probability</th>
                    <th scope="col">impact</th>
                    <th scope="col">mitigation</th>
                    <th scope="col">contingency</th>
                    <th scope="col">risk score</th>
                    <th scope="col">Action By</th>
                    <th scope="col">Action Items</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    `);

    for(let i = 0; i < db_risks.length; i++) {
        let { uid, name, category, probability, impact, mitigation, contingency, riskScore, actionBy, actionItems } = db_risks[i];
        let AI = "";
        for (let i = 0; i < actionItems.length; i++) {
            let actionItem = db_actionItems[actionItems[i]];
            AI = AI.length === 0 ? `${actionItem.uid}:${actionItem.name}` : AI + ", " + `${actionItem.uid}:${actionItem.name}`;
        }
        let row = `
        <tr>
            <th>${uid}</th>
            <td>${name}</td>
            <td>${db_risks_category[category]}</td>
            <td>${probability}</td>
            <td>${db_risks_impact[impact]}</td>
            <td>${mitigation}</td>
            <td>${contingency}</td>
            <td>${riskScore}</td>
            <td>${actionBy == null ? "not set" : actionBy.toLocaleDateString()}</td>
            <td>${AI}</td>
        </tr>`;
        $("tbody").append(row);
    }

    for(let i=0; i < db_risks_sort.length; i++) {
        $("#sort").append(`<option value="${db_risks_sort[i]}"}>${db_risks_sort[i]}</option>`);
    }

    for(let i=0; i < db_risks_filter.length; i++) {
        $("#date-filter").append(`<option value="${db_risks_filter[i]}">${db_risks_filter[i]}</option>`);
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