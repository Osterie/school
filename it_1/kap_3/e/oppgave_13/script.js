let personer = [["Hans", 12], ["Nils", 3], ["Sofie", 5], ["Adrian", 15]];

let run = true
let run_length = personer.length

while (run){

    let stop = true

    for (let i = 0; i < run_length; i++) {

        if (personer[i][1] > personer[i+1][1]){
            const temp = personer[i+1]
            personer[i+1] = personer[i]
            personer[i] = temp
            run_length -= 1
            stop = false
        }
    }
    if (stop){
        run = false
    }
}
console.log(personer)