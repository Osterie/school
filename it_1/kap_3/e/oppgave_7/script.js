let random_array = [];

for (let i = 0; i < 6; i++) {
    let random_tall = random_integer_in_range(1, 7);
    random_array.push(random_tall);
}

console.log(random_array)

function random_integer_in_range(lower_limit, upper_limit) {
    return Math.floor(Math.random() * (upper_limit - lower_limit) + lower_limit );
}

function subtract_array(main_array, subtracting_array){
    for (let i = 0; i < subtracting_array.length; i++) {
        subtract_index = main_array.indexOf(subtracting_array[i])
        main_array.splice(subtract_index, 1)
    }
    return main_array
}
