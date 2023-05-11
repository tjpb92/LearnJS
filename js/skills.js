function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function Skill() {
    this.title = "Extraction des compétences de Genesys Cloud";
    this.tableTemplate = "";
    this.row = "";

    this.publishTitle = function() {
        document.getElementById("title").innerHTML = this.title;
    }

    this.initTableTemplate = function() {
        var row = "<tr>";
        row += "<th>Id</th>";
        row += "<th>Nom</th>";
        row += "<th>Etat</th>";
        row += "</tr>";
//        console.log(row);

        var table = '<table id="excelTable">';
        table += '<thead id="excelTitle">';
        table += row;
        table += '<tbody id="excelData">';
        table += "</tbody>";
        table += "</thead>";
        table += "</table>";
//        console.log(table);

        this.tableTemplate = table;
    }

    this.publishTableTemplate = function() {
        document.getElementById("excelTable").outerHTML = this.tableTemplate;
    }

    this.initTableTemplate();
}

function Context(item) {
    this.division = "all";
    this.item = item;

//    console.log(typeof division);
    item.publishTitle();
    item.publishTableTemplate();
}

var skill = new Skill();
//    console.log(skill);

var context = new Context(skill);

function selectDivision() {
    console.log("selectDivision()");
    context.division = document.getElementById("division").value;
    }

function initQueueContext() {
    console.log("initQueueContext()");
    selectDivision();

    selectSkills();
    console.log(context);

    }

function selectAgents() {
    console.log("selectAgents()");
    context.item = "agents";
    }

function selectQueues() {
    console.log("selectQueues()");
    context.item = "queues";
    }

function selectSkills() {
    console.log("selectSkills()");
    context.item = "skills";
    }

function resetFields() {
    console.log("resetFields()");
    context.item = "skills";
    }

function processJson(){

    var nbSkills = 0;
//    initQueueContext();

    const json = document.getElementById("json").value.trim();
//    console.log(json);
	if(json.startsWith("{") && json.endsWith("}")){
	    const obj = JSON.parse(json);
//	    console.log(obj);

	    const entities = obj.entities;
//        console.log(entities.length);
//        console.log(entities[0]);
        for (entity of entities) {
            nbSkills += addSkill(entity);
            }

	    document.getElementById("excelCount").innerHTML = `${nbSkills} compétence(s)`;
	} else {
	    const errmsg = "ERREUR : les données fournies ne sont pas au format JSON";
	    alert(errmsg);
	    console.log(errmsg);
	}

}

function addSkill(entity) {
    const name = Object.hasOwn(entity, 'name') ? entity.name : "";
    const id = Object.hasOwn(entity, 'id') ? entity.id : "";
    const state = Object.hasOwn(entity, 'state') ? capitalize(entity.state): "";

    var qty = 1;

    var tr = "<tr>";
    tr += `<td>${id}</td>`;
    tr += `<td>${name}</td>`;
    tr += `<td>${state}</td>`;
    tr += "</tr>";
//    console.log(tr);

    document.getElementById("excelData").innerHTML += tr;

    return(qty);
}

