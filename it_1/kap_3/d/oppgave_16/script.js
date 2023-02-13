function kast_terninger(antall_terninger){
    const terninger = []
    let sum_terninger = 0

    for (let i = 0; i < antall_terninger; i++) {

        terninger[i] = terning()    
        sum_terninger += terninger[i]    
    }

    console.log(terninger, sum_terninger)
}

function terning() {
    return Math.floor(Math.random() * 6) + 1;
}

kast_terninger(5)