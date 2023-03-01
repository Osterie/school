
//a
const array = fill_array_ints(20)
console.log(array)

//b
const removed_values = remove_random_values(array, 10)
console.log(removed_values)
console.log(array)


function remove_random_values(array, amount){

    const removed_values = []

    for (let i = 0; i < amount; i++) {
        const random_value = random_integer_in_range(0, array.length)
        removed_values.push(array.splice(random_value, 1).join())
    }
    return removed_values
}

function fill_array_ints(amount) {
    const array = []
    for (let i = 0; i < amount; i++) {
        array.push(i)
    }
    return array
}

function random_integer_in_range(lower_limit, upper_limit){
    return Math.floor( (Math.random() * (upper_limit - lower_limit)) + lower_limit)
  }