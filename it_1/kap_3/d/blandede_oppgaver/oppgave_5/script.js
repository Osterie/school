//a

console.log("Oppgave 1:")

function swap_values(value_1, value_2){
    return [value_2, value_1]
}

let tall_1 = "2"
let tall_2 = "10"


console.log("før!")
console.log(`tall_1 = ${tall_1}`)
console.log(`tall_2 = ${tall_2}`)

const swapped_values = swap_values(tall_1, tall_2)

tall_1 = swapped_values[0]
tall_2 = swapped_values[1]

console.log("etter!")
console.log(`tall_1 = ${tall_1}`)
console.log(`tall_2 = ${tall_2}`)


//b

console.log("\n Oppgave 2")

function between(value_1, value_2, value_3){
    let value_array = [value_1, value_2, value_3]
    value_array.sort(function(a, b) {return a - b;});

    if ( new Set(value_array).size != 3 ){ return false }
    
    if ( value_array[1] === value_1 ){ return true }
    return false
}
console.log(between(5,1,10))

//c
console.log("\n Oppgave 3")

function prime(number){
    for (let i = 2; i < number; i++) {
        if (number % i === 0){
            return true
        }
    }
    return false
}

console.log(prime(7))

//d

console.log("\n Oppgave 4")


function is_palindrome(word){

    word = word.toLowerCase()

    //Finds first and last half of word and makes an array of its letters
    let first_half = word.slice( 0 , Math.ceil(word.length/2) ).split("")
    let last_half  = word.slice( word.length/2 , word.length  ).split("")

    //makes arrays into strings
    first_half = first_half.join("")
    //reverser last half also
    last_half = last_half.reverse().join("")

    if (first_half === last_half){
        return true
    }
    return false
}

console.log(is_palindrome('Racecar'))
