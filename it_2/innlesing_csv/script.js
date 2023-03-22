
// testing_array[3] = start_location
// testing_array[8] = end_location
function oppstart() {
  tegnBrukBakgrunn("white");
  plot(testing_array[0], testing_array[5], "rød", "Maks temp");
  plot(testing_array[0], testing_array[4], "svart", "Min temp");
  tegnAkser("Måned", "Temperatur", 0, 1, true, true, false);
}

function lastInn(file) {
  return fetch(file).then((response) => response.text());
}

function plot(xliste, yliste, graf_farge, tekst) {
  tegnTittel("Tafjord [SN60500]", "svart", "18", "Calibri");
  tegnBrukXY(0, 10000, -20, 30);
  tegnTekst(
    tekst,
    xliste[0],
    yliste[0] - 3,
    graf_farge,
    0,
    "left",
    20,
    "Calibri",
    "bottom"
  );
  tegnKurve(xliste, yliste, graf_farge, "strek", 2);
  console.log('ferdig')
}




function count_remove_instances(array){



  const length_before = array.length

  for (let i = 0; i <= array.length; i++) {
      //finnere indexen til det gitte tallet, om det finnes
      if (array.indexOf(item) != -1){
          const subtract_index = array.indexOf(item)
          //fjerner verdien på plassen vi fant
          array.splice(subtract_index, 1)
          i -=1
      }

  }
  const length_after = array.length
  const instances = length_before-length_after




}



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

    return array
}


function myFunction(a){
  window['a'] = 20; // or window.a
}



//TODO add paramaters for newline seperator and value seperator

async function read_csv(csv_file, callback) {
    const filinnhold = await lastInn(csv_file);
    return callback(filinnhold)
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

let testing_array 

var canvas, ctx;
window.onload = winInit;

function winInit() {

  canvas = document.getElementById("canvas"); 
  ctx = canvas.getContext("2d");
  tegnBrukCanvas("canvas"); 


(async () => {
  testing_array = await read_csv("oppgave_05_sykkeltur.csv", store_csv)
  console.log(testing_array);

  const testing_array_start = testing_array[3].slice()
  most_frequent_element(testing_array_start)

})();

}


function most_frequent_element(array){
  array.sort()
  
  let max = 0

  for (let i = 0; i < array.length; i++) {

    

  }




}

