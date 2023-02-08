console.log('oppgave 1\n')

//a
function størst_tall_2(tall1, tall2) {
    if (tall1 > tall2){
        return tall1
    }
    return tall2
}

console.log('størst tal lav 10 og 20:', størst_tall_2(10, 20))

//b
function størst_tall_3(tall1, tall2, tall3) {

    let max = tall1
    if (tall2 > max){
        max = tall2
    }

    if (tall3 > max){
        max = tall3
    }
    return max
}

console.log('størst tall av -50, 70, 100:', størst_tall_3(-50, 70, 100))

//c
function partall(tall) {
    if (tall % 2 == 0){
        return true
    }
    return false
}

console.log('er 1 partall?:', (partall(1)));


//d
function skuddår(år){
    if (år % 4 == 0){
        return true
    }
    return false
}

console.log('skuddår i 2025?:', skuddår(2025))