var canvas1, ctx;
window.onload = winInit;

function winInit() {
  canvas1 = document.getElementById("canvas1");
  ctx = canvas1.getContext("2d");

  let main_csv;

  const overwrite_csv_button = document.getElementById("csv_overwrite_button");
  const add_csv_button = document.getElementById("csv_add_button");
  const draw_graphs_button = document.getElementById("draw_graphs_button");

  const inputElement = document.getElementById("valgt_fil");

  inputElement.addEventListener("change", function () {});

  overwrite_csv_button.addEventListener("click", function () {
    const file = inputElement.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const fileContents = event.target.result;
      main_csv = fileContents;
      main(main_csv);
    };

    reader.readAsText(file);
  });

  add_csv_button.addEventListener("click", function () {
    const file = inputElement.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const fileContents = event.target.result;
      main_csv += fileContents;
      main(main_csv);
    };

    reader.readAsText(file);
  });
  draw_graphs_button.addEventListener("click", function () {
    // main()
  });

  // main()
}

async function main(csv) {
  const csv_cycling = store_csv(csv, ";");
  // const csv_cycling = await read_csv("oppgave_05_sykkeltur copy.csv", store_csv, ";")

  const starting_stations = csv_cycling[3];
  starting_stations.shift()

  const starting_date = csv_cycling[0];
  starting_date.shift();

  const ending_stations = csv_cycling[8];
  ending_stations.shift();

  let duration = csv_cycling[2];
  duration.shift();

  const most_popular_stations = get_n_frequency_elements(starting_stations, 3, true);
  draw_bar_chart( most_popular_stations[0], most_popular_stations[1], "Starting Station ID", "Frequency, Most Popular Stations", "canvas1" );
  
  const least_popular_stations = get_n_frequency_elements(starting_stations, 3, false);
  draw_bar_chart( least_popular_stations[0], least_popular_stations[1], "Starting Station ID", "Frequency, Least Popular Stations", "canvas2" );

  const occurences_day_of_week = get_daily_totals(starting_date);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  draw_bar_chart( weekdays, occurences_day_of_week, "Days of the week", "Occurences", "canvas3" );

  const average_durations_array = get_average_num_values_pair_arrays(ending_stations, duration)
  draw_n_highest_value(3, average_durations_array[0], average_durations_array[1], "End Station ID", "Average Duration Seconds", "canvas5")
  
  const months_for_data = [ 4, 5, 6, 7, 8, ];
  draw_data_months(starting_date, duration, months_for_data, average_2d_array, "canvas4");
}

function draw_bar_chart(x_values, y_values, x_axis, y_axis, canvas) {
  tegnBrukCanvas(canvas)
  tegnBrukBakgrunn("white");
  tegnBrukXY(-1, x_values.length, 0, Math.max(...y_values) * 1.2);

  for (let i = 0; i < x_values.length; i++) {
    tegnFyltRektangel(i - 0.25, 0, 0.5, y_values[i], "black");
    tegnTekst( x_values[i], i, -Math.max(...y_values) * 0.1, "red", 0, "left", 20, "Calibri", "bottom" );
  }
  tegnAkser(x_axis, y_axis, 0, 1, true, true, false);
}

function draw_n_highest_value(n, x_values, y_values, x_axis, y_axis, canvas ) {
  const n_largest_pair_values = get_n_extreme_values(x_values, y_values, n, true);
  const n_largest_name_values = n_largest_pair_values[0];
  const n_largest_num_values = n_largest_pair_values[1];

  tegnBrukCanvas(canvas);
  draw_bar_chart( n_largest_name_values, n_largest_num_values, x_axis, y_axis, canvas );
}

function draw_data_months(dates, target_data, months_to_draw, callback, canvas) {
  let result_data = [];
  for (let i = 0; i < months_to_draw.length; i++) {
    result_data[i] = [];
  }

  for (let i = 0; i < target_data.length; i++) {
    const current_date = new Date(dates[i]);
    const current_month = current_date.getMonth();
    const result_data_index = months_to_draw.indexOf(current_month);

    if (months_to_draw.includes(current_month)){
      result_data[result_data_index].push(target_data[i]);
    }
  }

  let callback_result = callback(result_data);
  callback_result = callback_result.map((value) => isNaN(value) ? " " : value );

  let months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ];
  let months_to_draw_names = create_subarray(months, months_to_draw);
  draw_bar_chart(months_to_draw_names, callback_result, "x_axis", "y_axis", canvas);
}

function get_daily_totals(date_array) {
  const days_frequency = new Array(7).fill(0);

  for (let i = 0; i < date_array.length; i++) {
    const day = new Date(date_array[i]).getDay();

    if (!isNaN(day)) {
      days_frequency[day] += 1;
    }
  }
  return days_frequency;
}

function get_average_num_values_pair_arrays(name_values, num_values) {
  //Jeg lagde denne funksjonen selv, ikke chat-gpt,
  //men jeg liker å kommentere på engelsk, men noen av kommentarene
  //er med hjelp fra chat-gpt

  //creates a sorted set of the name values
  //const unique_name_values = get_unique_values_sorted(name_values)
  const unique_name_values_set = new Set(name_values);
  const unique_name_values = Array.from(unique_name_values_set);

  //frequency array stores how many times we add to value array
  //value array stores the sum of all the unique num values
  const frequency_array = new Array(unique_name_values.length).fill(0);
  const value_array = new Array(unique_name_values.length).fill(0);
  const average_array = [];

  //loop through the name_values array and update the corresponding value_array and frequency_array elements
  for (let i = 0; i < name_values.length; i++) {
    //gets the index of the name value,
    const index = unique_name_values.indexOf(name_values[i]);
    //add the corresponding numerical value to the value_array at the correct index
    value_array[index] += parseFloat(num_values[i]);
    //increment the corresponding frequency_array element at the correct index
    frequency_array[index] += 1;
  }

  //loop through the frequency_array and compute the average value for each unique name value
  for (let i = 0; i < frequency_array.length; i++) {
    //divide the value_array element by the frequency_array element to get the average numerical value
    const average_value = parseFloat( (value_array[i] / frequency_array[i]).toFixed(2) );
    average_array.push(average_value);
  }

  return [unique_name_values, average_array];
}

//takes an array, a number value and a boolean
//finds the n-most-or-least frequent elements in the array, easy to use.
function get_n_frequency_elements(array, n, is_most_frequent) {
  //the result of this means that each element in sorted_set will have a corresponding
  //frequency of itself in the frequency array (same index)
  const sorted_set = get_unique_values_sorted(array);
  const frequency_array = create_sorted_frequency_array(array);
  return get_n_extreme_values(sorted_set, frequency_array, n, is_most_frequent)
}

function get_n_extreme_values(name_array, num_array, n, is_largest) { 
  const n_num_values = [];
  const n_name_values = [];

  for (let i = 0; i < n; i++) {

    let index = get_extreme_value_index(num_array, is_largest)

    const longest_duration_id = num_array.indexOf(index);
    n_num_values.push(num_array[longest_duration_id]);
    n_name_values.push(name_array[longest_duration_id]);

    num_array.splice(longest_duration_id, 1);
    name_array.splice(longest_duration_id, 1);
  }
  return [n_name_values, n_num_values];
}

//returns an array with the frequency of each element of the given array.
function create_sorted_frequency_array(array) {
  sort_ascending(array);
  const frequency_array = [];
  let frequency = 0;

  for (let i = 0; i < array.length; i++) {
    frequency += 1;
    if (array[i] !== array[i + 1]) {
      frequency_array.push(frequency);
      frequency = 0;
    }
  }
  return frequency_array;
}

function string_to_int_array(array) {
  for (let i = 0; i < array.length; i++) {
    array[i] = parseInt(array[i]);
  }
  return array;
}

function average_2d_array(array) {
  let result_array = [];
  for (let i = 0; i < array.length; i++) {
    let average_value_of_array = 0;

    for (let j = 0; j < array.length; j++) {
      average_value_of_array += parseFloat(array[i][j]);
    }
    result_array.push(average_value_of_array);
  }
  return result_array;
}

function get_extreme_value_index(array, is_largest){
  let index
  if (is_largest){
    index = Math.max(...array)
  }
  else if (!is_largest){
    index = Math.min(...array)
  }
  return index
}

function create_subarray(main_array, sub_array) {
  const new_array = [];

  for (let i = 0; i < sub_array.length; i++) {
    sub_item = main_array[sub_array[i]];
    new_array.push(sub_item);
  }
  return new_array;
}

function get_unique_values_sorted(array) {
  sort_ascending(array);
  let unique_values = new Set(array);
  unique_values = Array.from(unique_values);
  return unique_values;
}

function sort_ascending(array) {
  array.sort(function (a, b) {
    return a - b;
  });
  return array;
}

function sort_descending(array) {
  array.sort(function (a, b) {
    return b - a;
  });
  return array;
}


function store_csv(csv, seperator) {
  //create a 2d array and store each column in its array
  csv = csv.split("\r\n");
  const name_values = csv[0].split(seperator);

  for (let i = 0; i < csv.length; i++) {
    csv[i] = csv[i].split(seperator);
  }

  const array = new Array();

  for (let i = 0; i < name_values.length; i++) {
    array[i] = new Array(name_values.length);
    for (let j = 0; j < csv.length; j++) {
      array[i][j] = csv[j][i];
    }
  }
  return array;
}

async function read_csv(csv_file, callback, seperator) {
  const filinnhold = await lastInn(csv_file);
  return callback(filinnhold, seperator);
}

function lastInn(file) {
  return fetch(file).then((response) => response.text());
}


function handleFileSelect(event) {
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.onload = handleFileLoad;
  reader.readAsText(file);
}

function handleFileLoad(event) {
  const fileContent = event.target.result;
  // Do something with the file content here
}