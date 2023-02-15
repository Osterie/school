//a
function square(number){
    return number**2
}
const chosen_number = 5
console.log(`kvadratet av ${chosen_number} er ${square(chosen_number)}`)

//b

function areal_trapes(side, parallel_side, heigth){
    return ( (side + parallel_side) / 2) * heigth
}

console.log(areal_trapes(2, 2, 2))
console.log(areal_trapes(1, 2, 2))