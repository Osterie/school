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

var melk = new Vare("melk", 32, 0);
var egg = new Vare("egg", 29, 0);
var brød = new Vare("brød", 33, 0);
var ost = new Vare("ost", 110, 0);
var troika = new Vare("troika", 17, 0);

varer_available = [melk, egg, brød, ost, troika];


const vare_elementer = document.querySelectorAll(".input_felter");

vare_elementer.forEach((vare) => {
  vare.addEventListener("change", (event) => {
    for (let i = 0; i < varer_available.length; i++) {
      if (varer_available[i].navn == vare.id) {
        varer_available[i].endring(vare.value);
      }
    }
    sum = 0;
    sum_antall = 0;
    i = -1;

    vare_elementer.forEach((vare) => {
      i += 1;
      document.getElementById("sum_" + vare.id).innerHTML = varer_available[i].sum;

      sum += varer_available[i].sum;
    });
    document.getElementById("total_pris").innerHTML = "sum: " + sum + "kr";
  });
});

const handlekurv_button = document.getElementById("handlekurv");

var grid = document.getElementById("grid");
var handlekurv_side

function kassalapp() {
	grid.style.display = "none";
	handlekurv_button.style.display = "none";
	var sum = 0;
	var div;
	
	handlekurv_side = document.getElementById("handlekurv_side");
  
  for (let i = 0; i < varer_available.length; i++) {
    div = document.createElement("div");
    div.id = "vare_kassalapp";

    sum += varer_available[i].sum;
    div.innerHTML = 
      varer_available[i].navn + " x " +
      varer_available[i].antall + " : " + 
	  varer_available[i].sum + "kr";

    handlekurv_side.appendChild(div);
    //TODO litt lite tid igjen, men burde plasserer varesummen på høyre siden i div elementet sitt,
    //kan løses med å bruke 2 flexbox elementer eller 1 grid.
  }

  div = document.createElement("div");
  div.id = "sum_kassalapp";
  div.innerHTML = "sum: " + sum + "kr ";
  handlekurv_side.appendChild(div);

  div = document.createElement("button");
  div.id = "bekreft";
  div.innerHTML = "Bekreft kjøp";
  handlekurv_side.appendChild(div);
  const bekreft_button = document.getElementById("bekreft");
  bekreft_button.onclick = bekreft;

  div = document.createElement("button");
  div.id = "tilbake";
  div.innerHTML = "Tilbake";
  handlekurv_side.appendChild(div);
  const tilbake_button = document.getElementById("tilbake");
  tilbake_button.onclick = tilbake;
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

window.onload = winInit; // Hendelse onload(nettsida ferdig lasta): winInit kjøres automatisk
function winInit() {
  handlekurv_button.onclick = kassalapp;
}