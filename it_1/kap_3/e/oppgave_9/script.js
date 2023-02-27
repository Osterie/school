times_table = []

for (let i = 0; i < 11; i++) {
    times_table.push([])
    for (let j = 0; j < 11; j++) {
        times_table[i][j] = i*j
    }
}
console.log(times_table[8][7])