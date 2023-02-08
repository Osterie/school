
const button = document.getElementById('button')
const output = document.getElementById('output')


button.addEventListener('click', () =>{
    const spiller_tall = document.getElementById('spiller_tall')
    const antall_spill = document.getElementById('antall_spill')
    button_handler(spiller_tall.value, antall_spill.value)
})


function button_handler(spiller_tall, antall_spill) {
    output.innerHTML = ''

    for (let i = 0; i < antall_spill; i++) {
    tilfeldig_tall = Math.floor(Math.random()*50) + 1

        if (spiller_tall == tilfeldig_tall){
            output.innerHTML += 'DU VANT! MED TALL:'
        }
        output.innerHTML += tilfeldig_tall + '\n'
    }
}

//b
const trekk_vokal = document.getElementById('trekk_vokal')
const trekk_konsonant = document.getElementById('trekk_konsonant')
const fjern_ord = document.getElementById('fjern_ord')
const output_random_ord = document.getElementById('output_random_ord')

fjern_ord.addEventListener('click', () =>{
    output_random_ord.innerHTML = ''
})

trekk_konsonant.addEventListener('click', () =>{
    lag_ord('konsonant')
})

trekk_vokal.addEventListener('click', () =>{
    lag_ord('vokal')
})


function lag_ord(bokstav) {

    const vokaler = ["a", "e", "i", "o", "u", "y", "æ", "ø", "å"]
    const konsonanter = ["b", "c", "d", "f", "g", "j", "k", "l", "m", "n", "p", "q", "s", "t", "v", "x", "z", "h", "r", "w", "y"]


    if (bokstav === 'konsonant') {
        random_konsonant = konsonanter[Math.floor(Math.random()*konsonanter.length)]
        output_random_ord.innerHTML += random_konsonant
    }
    else if (bokstav === 'vokal') {
        random_konsonant = vokaler[Math.floor(Math.random()*vokaler.length)]
        output_random_ord.innerHTML += random_konsonant
    }

    else{
        console.log('feil bokstav type angitt')
    }
}



