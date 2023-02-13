function kast_til_to_like(){
    let terning1 = terning()
    let terning2 = terning()
    let antall_kast = 1

    while (terning1 != terning2){
        terning1 = terning()
        terning2 = terning()
        antall_kast += 1

    }
    return antall_kast
}

function terning() {
    return Math.floor(Math.random() * 6) + 1;
}

const antall_kast = kast_til_to_like()

console.log(`fikk to like på ${antall_kast} kast`)