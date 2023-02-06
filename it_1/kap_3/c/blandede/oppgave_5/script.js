//a

for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 10; j++) {
        // console.log(i*j)
    }
}


//b
let suma = 0
let sumb = 1
let sumc = suma + sumb
for (let i = 0; i <= 10; i++) {
    console.log(sumb)
    suma = sumb
    sumb = sumc
    sumc = suma + sumb
}
