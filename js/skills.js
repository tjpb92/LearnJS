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

    this.addSkill = function() {
        const entity = arguments[0];

        const id = Object.hasOwn(entity, 'id') ? entity.id : "";
        const name = Object.hasOwn(entity, 'name') ? entity.name : "";
        const state = Object.hasOwn(entity, 'state') ? capitalize(entity.state): "";

        var qty = 0;

//      Tests if id and name are defined
        if (Boolean(id) && Boolean(name)) {
            var tr = "<tr>";
            tr += `<td>${id}</td>`;
            tr += `<td>${name}</td>`;
            tr += `<td>${state}</td>`;
            tr += "</tr>";
//            console.log(tr);

            document.getElementById("excelData").innerHTML += tr;
            qty++;
        }

        return(qty);
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

function selectDivision() {
    console.log("selectDivision()");
    context.division = document.getElementById("division").value;
    }

function initContext() {
    console.log("initContext()");
    selectDivision();

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
    context.item = skill;
    }

function resetFields() {
    console.log("resetFields()");
    context.item = "skills";
    }

function processJson(){

    var nbSkills = 0;

    const json = document.getElementById("json").value.trim();
//    console.log(json);
	if(json.trim().startsWith("{") && json.trim().endsWith("}")){
	    const obj = JSON.parse(json);
//	    console.log(obj);

	    const entities = obj.entities;
//        console.log(entities.length);
//        console.log(entities[0]);
        for (entity of entities) {
            nbSkills += context.item.addSkill(entity);
            }

	    document.getElementById("excelCount").innerHTML = `${nbSkills} compétence(s)`;
	} else {
	    const errmsg = "ERREUR : les données fournies ne sont pas au format JSON";
	    alert(errmsg);
	    console.log(errmsg);
	}

}

var skill = new Skill();
//    console.log(skill);

var context = new Context(skill);
console.log(context);



