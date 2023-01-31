const input_felt = document.getElementById('input')

input_felt.addEventListener('change', sjekk_høyde)

function sjekk_høyde(){
    console.clear()
    const høyde = input_felt.value
    const tilbakemelding = document.getElementById('tilbakemelding')

    if (høyde > 100 && høyde < 180) {

        tilbakemelding.innerHTML = 'du kan kjøre!'
    }
    else{
        tilbakemelding.innerHTML = 'høyden din oppfyller ikke kravene våres!'
    }
}