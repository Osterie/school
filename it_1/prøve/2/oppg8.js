// a

console.log(random_integer_in_range(1,11))

function random_integer_in_range(lower_limit, upper_limit){
    //finner et tilfeldig tall mellom lower_limit(inkluderere) til upper_limit(ikke inkluder)
    return Math.floor( (Math.random() * (upper_limit - lower_limit)) + lower_limit)
}

//b

const rand_array_20 = array_random_ints(20, 1, 11)
const rand_array_100 = array_random_ints(100, 1, 11)
const rand_array_1000 = array_random_ints(1000, 1, 11)

console.log(rand_array_20)
console.log(rand_array_100)
console.log(rand_array_1000)

function array_random_ints(amount, lowest, largest) {
    const array = []
    //legger tilfeldige tall inn i listen
    for (let i = 0; i < amount; i++) {
        array.push(random_integer_in_range(lowest, largest))
    }
    return array
}


// c

trekk_fra_array(rand_array_20, 7)
console.log(rand_array_20)

function trekk_fra_array(array, number){
    const length_before = array.length
    for (let i = 0; i < array.length; i++) {

        //finnere indexen til det gitte tallet, om det finnes
        if (array.indexOf(number) != -1){
            const subtract_index = array.indexOf(number)
            //fjerner verdien på plassen vi fant
            array.splice(subtract_index, 1)
        }

    }
    const length_after = array.length
    //sjekker hvor lang arrayen var før og etter vi fjerner tallet, det blir da antall fjernet av det tallet
    const antall_fjernet = length_before-length_after
    console.log(`fjernet ${antall_fjernet} av tallet ${number}`)
    return array
}

// d

skrivut_array_verdier(rand_array_20)

//skrier ut hver verdi i arrayen og indeksen
function skrivut_array_verdier(array){
    for (let i = 0; i < array.length; i++) {
        console.log(`Verdi med indeks ${i}: ${array[i]}`)
    }
}
