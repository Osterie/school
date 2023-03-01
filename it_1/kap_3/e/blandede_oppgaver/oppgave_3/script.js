
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10, 11, 12]


revese_array(array)

console.log(array)

function revese_array(array) {

    for (let i = 0; i < Math.floor(array.length/2); i++) {
        const temp = array[i]
        array[i] = array[array.length - i - 1]    
        array[array.length - i - 1] = temp
    }
    return array
}   