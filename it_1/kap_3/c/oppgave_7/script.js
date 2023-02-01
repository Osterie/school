const button = document.getElementById('button')

button.addEventListener('click', () =>{
    button_handler()
})

function button_handler() {
    random_num = Math.floor(Math.random()*7)
    output.innerHTML = 'terningen sier:' +random_num
}
