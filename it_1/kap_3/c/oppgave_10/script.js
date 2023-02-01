const input_field = document.getElementById('input')
const button = document.getElementById('button')
const output = document.getElementById('output')

button.addEventListener('click', () =>{
    button_handler(input_field)
})

function button_handler(input) {
    const input_verdi = input.value

    if(!input_verdi.includes("?")){
        output.innerHTML = 'du må stille et spørsmål'
        return
    }

    const respons = ["Ja, garantert", "Skjer ikke", "Ikke regn med det", "Spør senere", "Tviler på det", "Prøv igjen"]
    random_num = Math.floor(Math.random()*6)
    output.innerHTML = respons[random_num]
}
