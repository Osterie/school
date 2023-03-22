var filinnhold = "";
// window.onload = winInit; 
// function winInit() {

// 	// elGetId("lesFil1").onclick = lesFil1;
// 	// elGetId("clear_gloser").onclick = clear_gloser;
// 	// elGetId("legg_til_gloser").onclick = legg_til_gloser;
// }


// function elGetId(idName) {
//   return document.getElementById(idName);
// }

function lastInn(file) {
  return fetch(file).then((response) => response.text());
}

let norsk_gloser = [];
let engelsk_gloser = [];
//Used to check if csv is read.
var created = 0;


// read_csv("oppgave_05_sykkeltur.csv")
read_csv("short.csv", store_csv)

//TODO add paramaters for newline seperator and value seperator

function store_csv(csv, array){

    //create a 2d array and store each column in its array
    csv = csv.split("\r\n")
    const name_values = csv[0].split(";")

    for (let i = 0; i < csv.length; i++) {
        csv[i] = csv[i].split(";")
    }

    array = new Array(csv.length)

    for (let i = 0; i < name_values.length; i++) {

      array[i] = new Array(name_values.length)
      for (let j = 0; j < csv.length; j++) {
        array[i][j] = csv[j][i]
      }
      
    }

    console.log(array)
}

//TODO add paramaters for newline seperator and value seperator

async function read_csv(csv_file, callback) {
    filinnhold = await lastInn(csv_file);
        callback(filinnhold)
}

function read_image(image_input,callback, array){ // Leser fil basert på popup-dialog (fra HTML Input tag type 'file')
	let file   = image_input.files[0];
	let reader = new FileReader();
	reader.onload = function(evt) {
					let fileContent = evt.target.result;
					callback(fileContent, array);
				    };
    reader.readAsDataURL(file);
}

function visInnhold() {
  filinnhold = filinnhold.split("\n").join("<br>") + "<br>";

  for (let i = 0; i < norsk_glose_array.length; i++) {
    filinnhold += norsk_glose_array[i] + ";" + engelsk_glose_array[i] + "<br>";
  }
  elGetId("utskrift").innerHTML = filinnhold;
}

// if (localStorage.getItem("Norsk Gloser")) {
//   var norsk_glose_array = localStorage.getItem("Norsk Gloser").split(",");
//   var engelsk_glose_array = localStorage.getItem("Engelsk Gloser").split(",");
// }
// else {
//   var norsk_glose_array = [];
//   var engelsk_glose_array = [];
// }

// function legg_til_gloser() {
//   var norsk_glose_input = elGetId("norsk_glose").value.toLowerCase();
//   var engelsk_glose_input = elGetId("engelsk_glose").value.toLowerCase();

//   if (
//     norsk_glose_array.includes(norsk_glose_input) &&
//     engelsk_glose_array.includes(engelsk_glose_input)
//   ) {
//     elGetId("utskrift").innerHTML = "Oversettelsen finnes allerede!";
//   } 
//   else if (norsk_glose_input && engelsk_glose_input) {
//     norsk_glose_array.push(norsk_glose_input);
//     engelsk_glose_array.push(engelsk_glose_input);
//   } 
//   else {
//     elGetId("utskrift").innerHTML = "Feil I Input Felt";
//   }

//   localStorage.setItem("Norsk Gloser", norsk_glose_array);
//   localStorage.setItem("Engelsk Gloser", engelsk_glose_array);
// }

// function clear_gloser() {
//   norsk_glose_array = [];
//   engelsk_glose_array = [];
//   localStorage.setItem("Norsk Gloser", norsk_glose_array);
//   localStorage.setItem("Engelsk Gloser", engelsk_glose_array);
// }

// function translate() {

//   var glossary = elGetId("translator").value.toLowerCase();

//   if (norsk_gloser.includes(glossary)) {
//     elGetId("utskrift").innerHTML =
//       engelsk_gloser[norsk_gloser.indexOf(glossary)];
//   } 
//   else if (engelsk_gloser.includes(glossary)) {
//     elGetId("utskrift").innerHTML =
//       norsk_gloser[engelsk_gloser.indexOf(glossary)];
//   } 
//   else if (norsk_gloser.length === 0) {
//     elGetId("utskrift").innerHTML = "Du må først lese inn ordlisten";
//   } 
//   else {
//     elGetId("utskrift").innerHTML = "Fant ikke ordet i ordlisten";
//   }
// }

// elGetId("oversett").onclick = translate;

// if (elGetId("translator")) {
//   elGetId("translator").addEventListener("keypress", function (event) {
//     if (event.code === "Enter") {
//       translate();
//     }
//   });
// }

