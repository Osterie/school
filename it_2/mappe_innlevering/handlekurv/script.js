
class Vare {
  constructor(navn, pris, antall) {
    this.navn = navn;
    this.pris = pris;
    this.antall = antall;
    this.sum = this.pris * this.antall;
  }

  endring(antall) {
    this.antall = antall;
    this.sum = this.pris * this.antall;
  }
}

window.onload = winInit; // Hendelse onload(nettsida ferdig lasta): winInit kjøres automatisk
function winInit() {
  
  handlekurv_button.addEventListener("click", function(){
    kassalapp();
  })
}
const handlekurv_button = document.getElementById("handlekurv");


// TODO make a function for creating the html for the products...

var melk = new Vare("melk", 32, 0);
var egg = new Vare("egg", 29, 0);
var brød = new Vare("brød", 33, 0);
var ost = new Vare("ost", 110, 0);
var troika = new Vare("troika", 17, 0);


varer_available = [melk, egg, brød, ost, troika]; 

const vare_elementer = document.querySelectorAll(".input_felter");

vare_elementer.forEach((vare) => {

  vare.addEventListener("change", (event) => {

    //finner indexen til den endret varen, også endrer varen sin verdi
    const vare_index = varer_available.findIndex(obj => obj.navn === vare.id);
    varer_available[vare_index].endring(vare.value);

    let sum = 0;
    let i = 0;

    vare_elementer.forEach((vare) => {
      document.getElementById("sum_" + vare.id).innerHTML = varer_available[i].sum;
      sum += varer_available[i].sum;
      i += 1
    });
    document.getElementById("total_pris").innerHTML = "sum: " + sum + "kr";
  });
});


var grid = document.getElementById("grid");
var handlekurv_side

function kassalapp() {
	grid.style.display = "none";
	handlekurv_button.style.display = "none";
	var div;
	
	handlekurv_side = document.getElementById("handlekurv_side");
  
  let vare_innerhtml_array = [];

	var sum = 0;

  
  for (let i = 0; i < varer_available.length; i++) {
    let vare_innerhtml = varer_available[i].navn + " x " + varer_available[i].antall + " : " + varer_available[i].sum + "kr";
    vare_innerhtml_array.push(vare_innerhtml)
    sum += varer_available[i].sum;
  }


  create_flexbox(handlekurv_side, varer_available, "vare_kassalapp", vare_innerhtml_array)

  div = document.createElement("div");
  div.id = "sum_kassalapp";
  div.innerHTML = "sum: " + sum + "kr ";
  handlekurv_side.appendChild(div);


  div = document.createElement("button");
  div.id = "bekreft";
  div.innerHTML = "Bekreft kjøp";
  handlekurv_side.appendChild(div);
  const bekreft_button = document.getElementById("bekreft");

  bekreft_button.addEventListener("click", function(){
    replace_div(handlekurv_side, "bekreft_kjøp", "Kjøp Gjennoført", document.body)
  })

  div = document.createElement("button");
  div.id = "tilbake";
  div.innerHTML = "Tilbake";
  document.body.appendChild(div);
  const tilbake_knapp = document.getElementById("tilbake");
  
  tilbake_knapp.addEventListener("click", function(){
    tilbake()
    this.remove()
  })
}

function replace_div(old_div, new_div_id, new_div_text, new_div_location){

  old_div.remove();
  var div;
  div = document.createElement("div");
  div.id = new_div_id;
  div.innerHTML = new_div_text;
  new_div_location.appendChild(div);
}


function create_flexbox(flexbox_location, flexbox_array, child_id, child_texts){

  let flexbox = document.createElement("div");
  flexbox_location.appendChild(flexbox);

  for (let i = 0; i < flexbox_array.length; i++) {

    let div = document.createElement("div");
    div.id = child_id;
    sum += flexbox_array[i].sum;
    div.innerHTML = child_texts[i]

    flexbox.appendChild(div);
  }


}


function bekreft() {
  handlekurv_side.remove();
  var div;
  div = document.createElement("div");
  div.id = "bekreft_kjøp";
  div.innerHTML = "Kjøp Gjennomført!";
  document.body.appendChild(div);
}



function tilbake() {
  grid.style.display = "grid";
  handlekurv_button.style.display = "inline";

  handlekurv_side.remove();
  var div;
  div = document.createElement("div");
  div.id = "handlekurv_side";
  document.body.appendChild(div);
}

