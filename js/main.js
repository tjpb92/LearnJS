function FirstLastName(name) {
  this.name = name;
  this.firstname = "";
  this.lastname = "";

  var inFirstname = true;
  for (let c of name) {
    if (inFirstname) {
      inFirstname = (c != " ");
      this.firstname += c;
      }
    else {
      this.lastname += c;
    }
  }
}

function extractExtension(primaryContactInfo) {
    var extension = "";

      for (contactInfo of primaryContactInfo) {
//         console.log(contactInfo);
//         console.log("  ext:" + Object.hasOwn(contactInfo, 'extension') + ", med:" + Object.hasOwn(contactInfo, 'mediaType'));
        if (Object.hasOwn(contactInfo, 'extension') && Object.hasOwn(contactInfo, 'mediaType')) {
          if (contactInfo.extension.startsWith("2") && contactInfo.mediaType == "PHONE") {
            extension=contactInfo.extension;
//            console.log("  ext:" + poste);
          }
        }
      }

    return extension;
}

function extractTitle(agent) {
  return Object.hasOwn(agent, 'title') ? agent.title : "";
}

function extractDepartment(agent) {
  return Object.hasOwn(agent, 'department') ? agent.department : "";
}

function processJson(){
    var tr;
    var id;
    var name;
    var firstName;
    var lastName;
    var email;
    var extension;
    var department;
    var title;
    var username;
    var division;
    var lf;

	const json = document.getElementById("json").value.trim();
//	alert(json)

	if(json.startsWith("{") && json.endsWith("}")){
	    const obj = JSON.parse(json);
	    const agents = obj.results;
//	    alert(`${agents.length} compte(s)`)
	    for (agent of agents) {
	        id = agent.id;
	        name = agent.name;
	        lf = new FirstLastName(name);
	        firstName = lf.firstname;
	        lastName = lf.lastname;
	        email = agent.email;
	        extension = extractExtension(agent.primaryContactInfo);
	        department = extractDepartment(agent);
//            department = "";
	        title = extractTitle(agent);
//            title = "";
	        username = agent.username;
	        division = agent.division.name;
	        tr = "<tr>";
	        tr += `<td>${id}</td>`;
	        tr += `<td>${name}</td>`;
	        tr += `<td>${firstName}</td>`;
	        tr += `<td>${lastName}</td>`;
	        tr += `<td>${email}</td>`;
	        tr += `<td>${extension}</td>`;
	        tr += `<td>${department}</td>`;
	        tr += `<td>${title}</td>`;
	        tr += `<td>${username}</td>`;
	        tr += `<td>${division}</td>`;
	        tr += "</tr>";
	        document.getElementById("excelData").innerHTML += tr;
	    }
	    document.getElementById("excelCount").innerHTML = `${agents.length} compte(s)`;
	} else {
	    const errmsg = "ERREUR : les données fournies ne sont pas au format JSON";
	    alert(errmsg);
	    console.log(errmsg);
	}
	}