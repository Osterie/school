function kast_to_terninger(){
    let terning1 = terning()
    let terning2 = terning()

    console.log(terning1, terning2)
    if (terning1 + terning2 === 7){
        return "sum lik 7"
    }

    else if(terning1 === terning2){
        return "fikk to like"
    }
    else{
        return "ikke noe spesielt"
    }

}

function terning() {
    return Math.floor(Math.random() * 6) + 1;
}

console.log(`${kast_to_terninger()}`)