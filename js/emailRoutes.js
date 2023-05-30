function EmailRoutes() {
    this.title = "Extraction des routages par mail de Genesys Cloud";
    this.tableTemplate = "";
    this.row = "";
    this.domain = "ANSTEL.mypurecloud.de";   // Faire mieux plus tard ...

    this.publishTitle = function() {
        document.getElementById("title").innerHTML = this.title;
    }

    this.initTableTemplate = function() {
        var row = "<tr>";
        row += "<th>Id</th>";
        row += "<th>Nom</th>";
        row += "<th>Email</th>";
        row += "<th>MailFlow</th>";
        row += "<th>SpamFlow</th>";
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

    this.addEmailRoutes = function() {
        const entity = arguments[0];

        const id = Object.hasOwn(entity, 'id') ? entity.id : "";
        const name = Object.hasOwn(entity, 'fromName') ? entity.fromName : "";
        const email = Object.hasOwn(entity, 'pattern') ? entity.pattern : "";
        const mailFlow = "";
        const spamFlow = "";

        var qty = 0;

//      Tests if id and name are defined
        if (Boolean(id) && Boolean(name)) {
            var tr = "<tr>";
            tr += `<td>${id}</td>`;
            tr += `<td>${name}</td>`;
            tr += `<td>${email}</td>`;
            tr += `<td>${mailFlow}</td>`;
            tr += `<td>${spamFlow}</td>`;
            tr += "</tr>";
//            console.log(tr);

            document.getElementById("excelData").innerHTML += tr;
            qty++;
        }

        return(qty);
    }

    this.initTableTemplate();

}

var emailRoutes = new EmailRoutes();
//    console.log(emailRoute);

var context = new Context(emailRoutes);
console.log(context);

function selectDivision() {
    console.log("selectDivision()");
    context.divisionFiler = document.getElementById("divisionFilter").value;
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

function selectDivisions() {
    console.log("selectDivisions()");
    const division = new Division();
    console.log(division);
    division.publishTitle();
//    division.fetchData();     // Unauthorized !!!

    context.item = division;
    }


function selectEmailRoutes() {
    console.log("selectEmailRoutes()");
    const emailRoutes = new EmailRoutes();
    console.log(division);
    emailRoutes.publishTitle();
//    division.fetchData();     // Unauthorized !!!

    context.item = emailRoutes;
    }

function resetFields() {
    console.log("resetFields()");
    context.item = "skills";
    }

function processJson(){

    var nbEmailRoutes = 0;

    const json = document.getElementById("json").value.trim();
//    console.log(json);
	if(json.trim().startsWith("{") && json.trim().endsWith("}")){
	    const obj = JSON.parse(json);
//	    console.log(obj);

	    const entities = obj.entities;
//        console.log(entities.length);
//        console.log(entities[0]);
        for (entity of entities) {
            nbEmailRoutes += context.item.addEmailRoutes(entity);
            }

	    document.getElementById("excelCount").innerHTML = `${nbEmailRoutes} routage(s) par mail`;
	} else {
	    const errmsg = "ERREUR : les données fournies ne sont pas au format JSON";
	    alert(errmsg);
	    console.log(errmsg);
	}

}

function Context(item) {
    this.divisionFilter = "all";
    this.item = item;

//    console.log(typeof division);
    item.publishTitle();
    item.publishTableTemplate();
}