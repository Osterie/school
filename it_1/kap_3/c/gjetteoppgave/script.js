let riktig = 42


const input_felt = document.getElementById('input')

input_felt.addEventListener('change', gjett)

function gjett(){
    console.clear()
    const gjettet = input_felt.value

    const tilbakemelding = document.getElementById('tilbakemelding')


    if (gjettet == riktig){
        tilbakemelding.innerHTML = ('riktig')
    }
    else if (gjettet < riktig){
        tilbakemelding.innerHTML = ('altfor lavt')
    }
    else if (gjettet > riktig){
        tilbakemelding.innerHTML = ('altfor høyt')
    }
    else{
        tilbakemelding.innerHTML = ('ugyldig input')
    }
}