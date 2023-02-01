const button = document.getElementById('button')
const output = document.getElementById('output')

button.addEventListener('click', () =>{
    button_handler()
})

function button_handler() {
    random_num = Math.floor(Math.random()*21)
    console.log(random_num)
    if (random_num == 13){
        output.innerHTML = "Du fikk 13!"
    }

    else if (random_num >= 18){
        output.innerHTML = 'Du fikk 18 eller mer'
    }

    else if (random_num <= 6){
        output.innerHTML = 'Du fikk 6 eller mindre'
    }
    else{
        output.innerHTML = "Du fikk mellom 6 og 18"
    }
    
}
