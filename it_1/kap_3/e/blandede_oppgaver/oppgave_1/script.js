let primtall = [7, 11, 13, 17, 19, 23, 43, 47, 53, 59, 61, 67];


wrtite_out_array(primtall)

for (let i = 68; i < 100; i++) {
    
    if (is_prime(i)){
        primtall.push(i)
    }
}

wrtite_out_array(primtall)


function is_prime(number) {
    for (let i = 2; i < number; i++) {
        if (number % i === 0){
            return false
        }
    }
    return true
}

function wrtite_out_array(array) {
    for (let i = 0; i < array.length; i++) {
        console.log(array[i])
    }
}