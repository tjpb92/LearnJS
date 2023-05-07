
function processJson(){
	const json = document.getElementById("json").value;
//	alert(json)
    const obj = JSON.parse(json);
//    console.log(obj)

    const agents = obj.results;

    for (agent of agents) {
//      var division = agent.division.name;
//      if (division.length == 0) console.log(JSON.stringify(agent));
      var primaryContactInfo = agent.primaryContactInfo;
      var poste = "";
      for (contactInfo of primaryContactInfo) {
//         console.log(contactInfo);
//         console.log("  ext:" + Object.hasOwn(contactInfo, 'extension') + ", med:" + Object.hasOwn(contactInfo, 'mediaType'));
        if (Object.hasOwn(contactInfo, 'extension') && Object.hasOwn(contactInfo, 'mediaType')) {
          if (contactInfo.extension.startsWith("2") && contactInfo.mediaType == "PHONE") {
            poste=contactInfo.extension;
//            console.log("  ext:" + poste);
          }
        }
      }
	  document.getElementById("demo").innerHTML += agent.id + ";" +
	  agent.name+";"+ agent.email+ ";" + poste +";"+agent.department+";"+
	  agent.title+";"+agent.username+";"+agent.division.name+
	  "<br>";
	}
}

//const txt = '{"class":"English", "students":[{"name":"John", "age":30, "city":"New York"},{"name":"Paul", "age":40, "city":"Los Angeles"}]}'
//document.getElementById("txt").innerHTML = "txt:" + txt;
//
//const obj = JSON.parse(txt);
//
//document.getElementById("class").innerHTML = obj.class;
//
//const students = obj.students;
//
//for (let student of students) {
//document.getElementById("demo").innerHTML += student.name + ";" + student.age + ";" + student.city+"<br>";
//}
//
//document.getElementById("obj").innerHTML = "length:" + students.length;
