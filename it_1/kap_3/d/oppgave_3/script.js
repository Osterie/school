
function magic8ball() {
    const respons = ["Ja, garantert", "Skjer ikke", "Ikke regn med det", "Spør senere", "Tviler på det", "Prøv igjen"]
    random_num = Math.floor(Math.random()*6)
    return respons[random_num]
}

console.log(magic8ball())