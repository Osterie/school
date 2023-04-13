// Henter bildeelementene
let dorbilderEl = document.querySelectorAll("img");
let random_images = ["https://assets.codepen.io/5037447/geit.png", "https://assets.codepen.io/5037447/geit.png", "https://assets.codepen.io/5037447/bil.png"]
let random_indexes = []

while (random_indexes.length < 3) {

    let random_dor = Math.floor(Math.random()*3)

    if (!random_indexes.includes(random_dor)){
        random_indexes.push(random_dor)
    }
}

// Går gjennom alle bildene og legger på samme lytter på hver av dem
for (let i = 0; i < dorbilderEl.length; i++) {
  dorbilderEl[i].addEventListener("click", sjekkDor);
}

// Funksjon som sjekker hvilken dør som ble trykket
function sjekkDor(e) {
  let trykketDor = e.target;

  // Bytter ut bilde av valgt dør med geit eller bil
  if (trykketDor.id === "dor1") {
    e.target.src = random_images[random_indexes[0]];
  } 
  else if (trykketDor.id === "dor2") {
    e.target.src = random_images[random_indexes[1]];
  } 
  else {
    e.target.src = random_images[random_indexes[2]];
  }
}