function tilfeldigHilsen(){
    random_num = Math.floor(Math.random()*3)

    greetings = ["Hei", "Hallo","God dag"]

    return greetings[random_num]
}

console.log(tilfeldigHilsen())