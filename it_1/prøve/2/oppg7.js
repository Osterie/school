// a

//den summerere tallene og skriver ut resultatet i konsollen
function summer(tall1, tall2){
    console.log(`summen av ${tall1} + ${tall2} er ${tall1 + tall2}`)
    return tall1 + tall2
}

summer(4,5)

// b

console.log("Arealet av trekanten blir: " + arealTrekant(7,3))

//formelen for trekant areal
function arealTrekant(g, h){
    return g*h/2
}