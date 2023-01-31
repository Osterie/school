const input_field = document.getElementById('input')
const button = document.getElementById('button')
const output = document.getElementById('output')

input_field.addEventListener('change', () => {    
    input_handler(input_field)
})

button.addEventListener('click', () =>{
    button_handler(input_field)
})

function input_handler(input){

    const input_verdi = input.value
    output.innerHTML = 'output'
}

function button_handler(input) {
    //do stuff
}