length = 10
width = 20

areal_trekant = arealRektangel(length, width)
console.log(`areal av trekanten er ${areal_trekant}`)


function arealRektangel(lengde, bredde) {
    const areal = (lengde*bredde)

    if (typeof areal == Number && areal > 0){
        return areal
    }
    else{
        return "error"
    }
  }
