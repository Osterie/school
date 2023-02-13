function tall_mellom(nedre_grense, øvre_grense){

    return (Math.random() * (øvre_grense - nedre_grense)) + nedre_grense
}

console.log(tall_mellom(3, 8))