

//b
const array = array_random_ints(50, 0, 101)
console.log(array)

//c
sort_descending(array)
console.log(array)

//d
const largest_number = array[0]
const smallest_number = array[array.length-1]
console.log(largest_number)
console.log(smallest_number)

//e
remove_even_numbers(array)
console.log(array)



//a
function array_random_ints(amount, lowest, largest) {
    const array = []
    for (let i = 0; i < amount; i++) {
        array.push(random_integer_in_range(lowest, largest))
    }
    return array
}


function random_integer_in_range(lower_limit, upper_limit) {
    return Math.floor(Math.random() * (upper_limit - lower_limit) + lower_limit);
}


function sort_descending(array){
    array.sort(function(a, b) {return b - a;});
    return array
}

function remove_even_numbers(array){
    for (let i = 0; i < array.length; i++) {
        if (array[i] % 2 === 0) {
            array.splice(i, 1)
            i -= 1
        }
    }
    return array
}