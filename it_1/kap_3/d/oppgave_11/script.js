grunnflate = 10
høyde = 20

areal_trekant = beregn_areal_trekant(grunnflate, høyde)
console.log(`areal av trekanten er ${areal_trekant}`)

function beregn_areal_trekant(grunnflate, høyde){
    return (grunnflate*høyde)/2
}