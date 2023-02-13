function kast_tre_terninger(){
    let terning1 = terning()
    let terning2 = terning()
    let terning3 = terning()
    console.log(`sum for de tre terningene er: (${terning1 + terning2 + terning3})`)

    while (terning1 !== terning2 || terning2 !== terning3) {
        terning1 = terning()
        terning2 = terning()
        terning3 = terning()
        console.log(`sum for de tre terningene er: (${terning1 + terning2 + terning3})`)
    }

    return
}

function terning() {
    return Math.floor(Math.random() * 3) + 1;
}

kast_tre_terninger()