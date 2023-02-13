function navneskilt(navn){
    const stars = multiply_string("*", navn.length + 3)
    console.log(stars)
    console.log(`* ${navn} *`)
    console.log(stars)
}

function multiply_string(string, times){
    new_string = string
    for (let i = 0; i < times; i++) {
        new_string += string
    }
    return new_string
}

navneskilt("Adrian")
