const two_dimensional_array = []

for (let i = 0; i < 3; i++) {
    two_dimensional_array.push([])
    for (let j = 0; j < 3; j++) {
        two_dimensional_array[i][j] = j
    }
}

console.log(two_dimensional_array)