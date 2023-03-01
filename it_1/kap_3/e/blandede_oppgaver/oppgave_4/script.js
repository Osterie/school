const array = array_random_ints(500, 0, 10000)
// console.log(array)


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

function repeating_values(array){
    let repeated_values = []

    for (let i = 0; i < array.length; i++) {

        const testing_number = array[i]

        array.splice(i, 1)
        if (array.includes(testing_number) && !repeated_values.includes(testing_number)) {
            repeated_values.push(testing_number)
        }
        i -= 1
    }
    return repeated_values
}
console.log(array)
console.log(repeating_values(array))