function initQueueContext() {

    document.getElementById("title").innerHTML = "Extraction des files d'attente de Genesys Cloud";

    var row = "<tr>";
    row += "<th>Id</th>";
    row += "<th>Nom</th>";
    row += "<th>Agents</th>";
    row += "<th>ACW (s)</th>";
    row += "<th>Division</th>";
    row += "</tr>";
//    console.log(row);

    var table = '<table id="excelTable">';
    table += '<thead id="excelTitle">';
    table += row;
    table += '<tbody id="excelData">';
    table += "</tbody>";
    table += "</thead>";
    table += "</table>";
//    console.log(table);
    document.getElementById("excelTable").outerHTML = table;

}

function addQueue(entity) {
    const name = Object.hasOwn(entity, 'name') ? entity.name : "";
    var qty = 0;

//    if (name.startsWith("A_") || name.startsWith("E_")) {
    if (name.length > 0) {
        const id = Object.hasOwn(entity, 'id') ? entity.id : "";
        const memberCount = Object.hasOwn(entity, 'memberCount') ? entity.memberCount : "";

        var acw = "";
        const acwSettings = Object.hasOwn(entity, 'acwSettings') ? entity.acwSettings : "";
//        console.log(acwSettings);
//        console.log(typeof acwSettings);
        if (typeof acwSettings != "undefined") {
            const wrapupPrompt = Object.hasOwn(acwSettings, 'wrapupPrompt') ? acwSettings.wrapupPrompt : "";
            const timeoutMs = Object.hasOwn(acwSettings, 'timeoutMs') ? acwSettings.timeoutMs : 0;
//            console.log(`  wrapupPrompt=${wrapupPrompt}, timeoutMs=${timeoutMs}`)
            if (wrapupPrompt == "MANDATORY_TIMEOUT" && timeoutMs > 0) acw = parseInt(timeoutMs) / 1000;
        }

        var division = "";
        const div = Object.hasOwn(entity, 'division') ? entity.division : "";
        if (typeof div != "undefined") {
            division = Object.hasOwn(div, 'name') ? div.name : "";
        }

        var tr = "<tr>";
        tr += `<td>${id}</td>`;
        tr += `<td>${name}</td>`;
        tr += `<td>${memberCount}</td>`;
        tr += `<td>${acw}</td>`;
        tr += `<td>${division}</td>`;
        tr += "</tr>";
//        console.log(tr);
        document.getElementById("excelData").innerHTML += tr;
        qty++;
        }
    return(qty);
}

function processJson(){

    var nbQueues = 0;
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
            nbQueues += addQueue(entity);
            }

	    document.getElementById("excelCount").innerHTML = `${nbQueues} file(s) d'attente`;
	} else {
	    const errmsg = "ERREUR : les données fournies ne sont pas au format JSON";
	    alert(errmsg);
	    console.log(errmsg);
	}

}