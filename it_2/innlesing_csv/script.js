
var canvas, ctx;
window.onload = winInit;

function winInit() {

  canvas = document.getElementById("canvas"); 
  ctx = canvas.getContext("2d");
  tegnBrukCanvas("canvas"); 



(async () => {

  const csv_cycling = await read_csv("oppgave_05_sykkeltur.csv", store_csv)

  const starting_stations = csv_cycling[3].slice()
  const most_popular_stations = three_most_frequent_elements(starting_stations)

  const most_popular_stations_ids = []
  const most_popular_stations_values = []
  
  for (let i = 0; i < 3; i++) {
    most_popular_stations_ids.push(most_popular_stations[i].most_frequent_element)
    most_popular_stations_values.push(most_popular_stations[i].most_frequent_element_frequency)
  }

  draw_bar_chart(most_popular_stations_ids, most_popular_stations_values, 'Start stasjon', 'Ganger brukt')


})();
}

function draw_bar_chart(x_values, y_values, x_axis, y_axis){

  tegnBrukBakgrunn("white");
  tegnBrukXY(-1, x_values.length, 0, Math.max(...y_values)*1.2);
  tegnAkser(x_axis, y_axis, 0, 1, true, true, false);

  for (let i = 0; i < x_values.length; i++) {

    tegnTekst( x_values[i], i, -Math.max(...y_values)*0.1 , "black", 0, "left", 20, "Calibri", "bottom" );

    tegnFyltRektangel(i-0.25, 0, 0.5 , y_values[i], "black");

  }
}

function lastInn(file) {
  return fetch(file).then((response) => response.text());
}

function plot(xliste, yliste, graf_farge, tekst) {
  tegnTittel("Tafjord [SN60500]", "svart", "18", "Calibri");
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


//TODO add paramaters for newline seperator and value seperator

async function read_csv(csv_file, callback) {
    const filinnhold = await lastInn(csv_file);
    return callback(filinnhold)
}




//returns an array with the frequency of each element of the given array.
function create_frequency_array(array){

  sort_ascending(array)

  let frequency_array = []
  let frequency = 0

  for (let i = 0; i < array.length; i++) {

    frequency += 1
    if (array[i] !== array[i+1] ) {
      frequency_array.push(frequency)
      frequency = 0
    }
  }
  
  return frequency_array

}


function three_most_frequent_elements(array){
  
  sort_ascending(array)
  
  let unique_values = new Set(array)
  unique_values = Array.from(unique_values)


  const frequency_array = create_frequency_array(array)
  

  var most_frequent_value_id = frequency_array.indexOf(Math.max(...frequency_array));

  let most_frequent_element_object = { most_frequent_element: unique_values[most_frequent_value_id], most_frequent_element_frequency: Math.max(...frequency_array) }
  
  const result = []
  result.push(most_frequent_element_object)

  frequency_array.splice(most_frequent_value_id, 1)

  most_frequent_value_id = frequency_array.indexOf(Math.max(...frequency_array));

  most_frequent_element_object = { most_frequent_element: unique_values[most_frequent_value_id], most_frequent_element_frequency: Math.max(...frequency_array) }
  
  result.push(most_frequent_element_object)

  
  frequency_array.splice(most_frequent_value_id, 1)

  most_frequent_value_id = frequency_array.indexOf(Math.max(...frequency_array));

  most_frequent_element_object = { most_frequent_element: unique_values[most_frequent_value_id], most_frequent_element_frequency: Math.max(...frequency_array) }
  
  result.push(most_frequent_element_object)

  return result
}


function sort_ascending(array){
  array.sort(function(a, b) {return a - b;});
  return array
}

function sort_descending(array){
  array.sort(function(a, b) {return b - a;});
  return array
}



