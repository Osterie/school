var filinnhold = "";
window.onload = winInit; 
function winInit() {

	elGetId("lesFil1").onclick = lesFil1;
	elGetId("clear_gloser").onclick = clear_gloser;
	elGetId("legg_til_gloser").onclick = legg_til_gloser;
}


function elGetId(idName) {
  return document.getElementById(idName);
}

function lastInn(file) {
  return fetch(file).then((response) => response.text());
}

let norsk_gloser = [];
let engelsk_gloser = [];
//Used to check if csv is read.
var created = 0;

async function lesFil1() {
  filinnhold = await lastInn("norsk-engelsk.csv");

  var filinnhold_rows = filinnhold.split("\n");

  //Går gjennom alle rader i csv fil (utenom overskrift greie)
  //sjekker om norsk_gloser arrayen allerede er lagd.
  if (created < 2) {
    created += 1;
    for (let i = 1; i < filinnhold_rows.length; i++) {

      //Legger til det som kommer foran ";" i csv filen, som er det norske ordet, gjør også ordet til småe bokstaver for en bedre oversettelse.
      norsk_gloser.push(
        filinnhold_rows[i]
          .slice(0, filinnhold_rows[i].indexOf(";"))
          .toLowerCase()
      );

      //Legger til det som kommer etter ";" i csv filen, som er det engelske ordet
      engelsk_gloser.push(
        filinnhold_rows[i]
          .slice(filinnhold_rows[i].indexOf(";") + 1)
          .toLowerCase()
      );
    }
  }

  if (created < 2) {
    created += 1;
    for (let i = 0; i < norsk_glose_array.length; i++) {
      norsk_gloser.push(norsk_glose_array[i]);
      engelsk_gloser.push(engelsk_glose_array[i]);
    }
  }
  visInnhold();
}

function visInnhold() {
  filinnhold = filinnhold.split("\n").join("<br>") + "<br>";

  for (let i = 0; i < norsk_glose_array.length; i++) {
    filinnhold += norsk_glose_array[i] + ";" + engelsk_glose_array[i] + "<br>";
  }
  elGetId("utskrift").innerHTML = filinnhold;
}

if (localStorage.getItem("Norsk Gloser")) {
  var norsk_glose_array = localStorage.getItem("Norsk Gloser").split(",");
  var engelsk_glose_array = localStorage.getItem("Engelsk Gloser").split(",");
}
else {
  var norsk_glose_array = [];
  var engelsk_glose_array = [];
}

function legg_til_gloser() {
  var norsk_glose_input = elGetId("norsk_glose").value.toLowerCase();
  var engelsk_glose_input = elGetId("engelsk_glose").value.toLowerCase();

  if (
    norsk_glose_array.includes(norsk_glose_input) &&
    engelsk_glose_array.includes(engelsk_glose_input)
  ) {
    elGetId("utskrift").innerHTML = "Oversettelsen finnes allerede!";
  } 
  else if (norsk_glose_input && engelsk_glose_input) {
    norsk_glose_array.push(norsk_glose_input);
    engelsk_glose_array.push(engelsk_glose_input);
  } 
  else {
    elGetId("utskrift").innerHTML = "Feil I Input Felt";
  }

  localStorage.setItem("Norsk Gloser", norsk_glose_array);
  localStorage.setItem("Engelsk Gloser", engelsk_glose_array);
}

function clear_gloser() {
  norsk_glose_array = [];
  engelsk_glose_array = [];
  localStorage.setItem("Norsk Gloser", norsk_glose_array);
  localStorage.setItem("Engelsk Gloser", engelsk_glose_array);
}

function translate() {

  var glossary = elGetId("translator").value.toLowerCase();

  if (norsk_gloser.includes(glossary)) {
    elGetId("utskrift").innerHTML =
      engelsk_gloser[norsk_gloser.indexOf(glossary)];
  } 
  else if (engelsk_gloser.includes(glossary)) {
    elGetId("utskrift").innerHTML =
      norsk_gloser[engelsk_gloser.indexOf(glossary)];
  } 
  else if (norsk_gloser.length === 0) {
    elGetId("utskrift").innerHTML = "Du må først lese inn ordlisten";
  } 
  else {
    elGetId("utskrift").innerHTML = "Fant ikke ordet i ordlisten";
  }
}

elGetId("oversett").onclick = translate;

if (elGetId("translator")) {
  elGetId("translator").addEventListener("keypress", function (event) {
    if (event.code === "Enter") {
      translate();
    }
  });
}

