//finner tilfeldig tall mellom argument1 og argument 2
function tall_mellom(nedre_grense, øvre_grense){
    //øvre_grense - nedre_grense gir området
    //+ nedre_grense fører verdien opp til minste verdien
    return (Math.random() * (øvre_grense - nedre_grense)) + nedre_grense
}

console.log(tall_mellom(3, 8))