var canvas1, ctx;
window.onload = winInit;

function winInit() {
  canvas1 = document.getElementById("canvas1"); 
  ctx = canvas1.getContext("2d");

(async () => {
  const csv_cycling = await read_csv("oppgave_05_sykkeltur.csv", store_csv)

  const starting_stations = csv_cycling[3].slice()
  starting_stations.shift()

  const starting_date = csv_cycling[0].slice()
  starting_date.shift()

  const occurences_day_of_week = total_each_day(starting_date)
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const ending_stations = csv_cycling[8].slice()
  ending_stations.pop()
  ending_stations.shift()

  const duration = csv_cycling[2].slice()
  duration.pop()
  duration.shift()

  
  const most_popular_stations = three_most_frequent_elements(starting_stations)
  draw_three_highest_value( most_popular_stations[1], most_popular_stations[0], "canvas1", "Starting Station", "Frequency")

  const least_popular_stations = three_least_frequent_elements(starting_stations)
  draw_three_highest_value( least_popular_stations[1], least_popular_stations[0], "canvas2", "Starting Station", "Frequency")

  tegnBrukCanvas("canvas3");
  draw_bar_chart(weekdays, occurences_day_of_week, "Days of the week", "Occurences")

  const average_duration = average_num_values(ending_stations, duration)
  draw_three_highest_value(average_duration[0], average_duration[1], "canvas4", "End Station Id", "Average Duration")
})();
}

function draw_three_highest_value(num_value, name_value, canvas, x_axis, y_axis){

  const three_num_values = []
  const three_name_values = []

  for (let i = 0; i < 3; i++) {
    var longest_duration_id = num_value.indexOf(Math.max(...num_value));

    three_num_values.push(num_value[longest_duration_id])
    three_name_values.push(name_value[longest_duration_id])
    num_value.splice(longest_duration_id, 1)
    name_value.splice(longest_duration_id, 1)
  }

  tegnBrukCanvas(canvas); 
  draw_bar_chart(three_name_values, three_num_values, x_axis, y_axis)
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

function plot(xliste, yliste, graf_farge, tekst) {
  tegnTittel("Tafjord [SN60500]", "svart", "18", "Calibri");
  tegnTekst( tekst, xliste[0], yliste[0] - 3, graf_farge, 0, "left", 20, "Calibri", "bottom" );
  tegnKurve(xliste, yliste, graf_farge, "strek", 2);
}

function total_each_day(days){

  const days_frequency = new Array(7).fill(0)

  for (let i = 0; i < days.length; i++) {

    const day = new Date(days[i]).getDay()  

    if (!isNaN(day)){
      days_frequency[day] += 1
    }
  }
  return days_frequency
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

function average_num_values(name_values, num_values){
  
  const unique_name_values = get_unique_values_sorted(name_values)

  const frequency_array = new Array(unique_name_values.length).fill(0)
  const value_array = new Array(unique_name_values.length).fill(0)
  const average_array = []

  for (let i = 0; i < name_values.length; i++) {
    const index = unique_name_values.indexOf(name_values[i])
    value_array[index] += parseFloat(num_values[i])
    frequency_array[index] += 1
  }

  for (let i = 0; i < frequency_array.length; i++) {
    average_array.push( parseFloat((value_array[i] / frequency_array[i]).toFixed(2)) )
  }
  return [average_array, unique_name_values]
}

function three_most_frequent_elements(array){
  
  const unique_values = get_unique_values_sorted(array)
  const frequency_array = create_sorted_frequency_array(array)

  const three_most_frequent_elements_frequency = []
  const three_most_frequent_elements_id = []
  
  for (let i = 0; i < 3; i++) {
    const most_frequent_value_id = frequency_array.indexOf(Math.max(...frequency_array));
    three_most_frequent_elements_frequency.push(Math.max(...frequency_array))
    three_most_frequent_elements_id.push(unique_values[most_frequent_value_id])

    frequency_array.splice(most_frequent_value_id, 1)
  }
  return[three_most_frequent_elements_id, three_most_frequent_elements_frequency]
}

function three_least_frequent_elements(array){

  const unique_values = get_unique_values_sorted(array)
  const frequency_array = create_sorted_frequency_array(array)


  const three_least_frequent_elements_frequency = []
  const three_least_frequent_elements_id = []
  
  for (let i = 0; i < 3; i++) {
    const least_frequent_value_id = frequency_array.indexOf(Math.min(...frequency_array));
    three_least_frequent_elements_frequency.push(Math.min(...frequency_array))
    three_least_frequent_elements_id.push(unique_values[least_frequent_value_id])

    frequency_array.splice(least_frequent_value_id, 1)
  }
  return[three_least_frequent_elements_id, three_least_frequent_elements_frequency]
}

//returns an array with the frequency of each element of the given array.
function create_sorted_frequency_array(array){

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

function get_unique_values_sorted(array){
  sort_ascending(array)
  let unique_values = new Set(array)
  unique_values = Array.from(unique_values)
  return unique_values
} 

function sort_ascending(array){
  array.sort(function(a, b) {return a - b;});
  return array
}

function sort_descending(array){
  array.sort(function(a, b) {return b - a;});
  return array
}

function lastInn(file) {
  return fetch(file).then((response) => response.text());
}