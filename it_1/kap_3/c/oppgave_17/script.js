let output = ''

for (let i = 1; i <= 50; i++) {
    for (let j = 0; j < i; j++) {
        output += '#'        
    }
    console.log(output)
    output = ''
}


