const get_name = document.getElementById('name')
const get_age = document.getElementById('age')
const button = document.getElementById('button')
const output = document.getElementById('output')


button.addEventListener('click', function(){
    output.innerHTML = sjekk_age(get_name.value, get_age.value)
})

function sjekk_age(name, age) {
    if(!age || !name){
        return "Error"
    }
    if (age < 30){
        return `Hei ${name}, du er ung!`
    }
    return "Du er gammel!"
}
