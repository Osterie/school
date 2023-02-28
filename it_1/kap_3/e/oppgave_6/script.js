let random_array = [];

for (let i = 0; i < 20; i++) {
  let random_tall = random_integer_in_range(-20, 20);
  if (random_array.includes(random_tall)) {
    i -= 1;
  } 
  else {
    random_array.push(random_tall);
  }
}

console.log(random_array);



console.log(array_largest(random_array));
console.log(array_smallest(random_array));
console.log(variation_width(random_array));
console.log(array_average(random_array));

function random_integer_in_range(lower_limit, upper_limit) {
    return Math.floor(Math.random() * (upper_limit - lower_limit) + lower_limit);
}

function array_largest(array) {
  let max = -Infinity;
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
}

function array_smallest(array) {
  let min = Infinity;
  for (let i = 0; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i];
    }
  }
  return min;
}

function variation_width(array) {
  let max = -Infinity;
  let min = Infinity;

  for (let i = 0; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i];
    }

    if (array[i] > max) {
      max = array[i];
    }
  }

  const variation = max - min;
  return variation;
}

function array_average(array) {
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  const average = sum / array.length;
  return average;
}
