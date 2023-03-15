// oppgave 6
// B

const navn = "Adrian"
console.log(`Hei ${navn}`)

// c

const tall_1 = 0
const tall_2 = 15

const sum = sum_to_tall(tall_1, tall_2)

console.log(`Summen av ${tall_1} og ${tall_2} er ${sum}`)

//summerer to tall
function sum_to_tall(tall_1, tall_2){
    return tall_1 + tall_2
}

// d

const grunnlinje = 10
const høyde = 5

console.log(`arealet av trekanten med grunnlinje ${grunnlinje} og høyde ${høyde} er ${areal_trekant(grunnlinje, høyde)}`)

//returnerer arealet av en trekant, gitt grunnlinje og høyde
function areal_trekant(grunnlinje, høyde){
    return grunnlinje*høyde/2
}

// e

const alder = 18
skriv_ut_kjørebare_kjøretøy(alder)


//bruker conditions til å sjekke hvilke kjøretøy som kan brukes gitt en alder
function skriv_ut_kjørebare_kjøretøy(alder){
    if (alder >= 18){
        console.log("kan kjøre sparkesykkel, moped, og bil")
    }
    else if (alder >= 16){
        console.log("kan kjøre sparkesykkel og moped, men ikke bil")
    }
    else{    
        console.log("kan kjøre sparkesykkel, men ikke moped, og bil")
    }
}
