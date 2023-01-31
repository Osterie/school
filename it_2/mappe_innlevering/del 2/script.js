var måneder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

var min_temp = [
  -10.2, -11.1, -5.1, -3.7, 0, 6.9, 7.8, 6.5, 4.2, -1.0, -6.1, -7.3,
];
var maks_temp = [
  8.9, 15.4, 13.8, 16.5, 21.2, 26.4, 29.1, 26.2, 21.8, 19.7, 15.0, 11.8,
];

var differanse_temp = [];
var gjennomsnitt_temp = [];

function differanse(maks, min) {
  var dif_temp = [];
  if (len(maks) != len(min)) {
    return print("Listene må være like store! feil svar om ikke");
  }

  for (let i = 0; i < maks.length; i++) {
    dif_temp.push(maks[i] - min[i]);
  }

  return dif_temp;
}

differanse_temp = differanse(maks_temp, min_temp);

function gjennomsnitt(maks, min) {
  var gjen_temp = [];
  if (len(maks) != len(min)) {
    return print("Listene må være like store! feil svar om ikke");
  }

  for (let i = 0; i < maks.length; i++) {
    gjen_temp.push(((maks[i] + min[i]) / 2).toFixed(1));
  }

  return gjen_temp;
}

gjennomsnitt_temp = gjennomsnitt(maks_temp, min_temp);

function plot(xliste, yliste, graf_farge, tekst) {
  tegnTittel("Tafjord [SN60500]", "svart", "18", "Calibri");
  tegnBrukXY(0, 13, -20, 30);
  tegnTekst(
    tekst,
    xliste[0],
    yliste[0] - 3,
    graf_farge,
    0,
    "left",
    20,
    "Calibri",
    "bottom"
  );
  tegnKurve(xliste, yliste, graf_farge, "strek", 2);
}

function oppstart() {
  tegnBrukBakgrunn("white");

  plot(måneder, maks_temp, "rød", "Maks temp");
  plot(måneder, min_temp, "svart", "Min temp");

  tegnAkser("Måned", "Temperatur", 0, 1, true, true, false);
}

function gjennomsnitt_plot() {
  tegnBrukBakgrunn("white");

  plot(måneder, gjennomsnitt_temp, "blå", "Gjennomsnitt temp");

  tegnAkser("Måned", "Temperatur", 0, 1, true, true, false);
}

function differanse_plot() {
  tegnBrukBakgrunn("white");

  plot(måneder, differanse_temp, "grønn", "Differanse maks og min");

  tegnAkser("Måned", "Temperatur Forskjell", 0, 1, true, true, false);
}

function søyle_maks() {
  tegnBrukBakgrunn("white");

  tegnTittel("Tafjord [SN60500]", "svart", "18", "Calibri");
  tegnAkser("Måned", "Temperatur", 0, 1, true, true, false);

  var color = "red";
  for (let i = 0; i < maks_temp.length; i++) {
    if (i % 2 == 0) {
      color = "blue";
    } 
    else {
      color = "red";
    }

    tegnFyltRektangel(måneder[i] - 0.25, 0, 0.5, maks_temp[i], color);
  }
  tegnTekst(
    "Maks temperaturer",
    3,
    -10,
    "svart",
    0,
    "left",
    25,
    "Calibri",
    "bottom"
  );
}

function søyle_min() {
  tegnBrukBakgrunn("white");
  tegnAkser("Måned", "Temperatur", 0, 1, true, true, false);
  tegnTittel("Tafjord [SN60500]", "svart", "18", "Calibri");

  var color = "red";
  for (let i = 0; i < min_temp.length; i++) {
    if (i % 2 == 0) {
      color = "blue";
    } 
    else {
      color = "red";
    }

    tegnFyltRektangel(måneder[i] - 0.25, 0, 0.5, min_temp[i], color);
  }

  tegnTekst(
    "Min temperaturer",
    3,
    -10,
    "svart",
    0,
    "left",
    25,
    "Calibri",
    "bottom"
  );
}

function viskUt() {
  tegnBrukBakgrunn("white");
}

var canvas, ctx;
window.onload = winInit;

function winInit() {
  // Hovedprogrammet

  canvas = elGetId("canvas"); // Hentes fra klassens kodebibliotek teamtools.js (document.getElmentById("canvas")
  ctx = canvas.getContext("2d"); // Objekt som inneholder tegneverktøyet i canvas
  tegnBrukCanvas("canvas"); // Kobler canvas i html sammen med tegnepakka. Viktig ved lokal koding

  elGetId("min_maks").onclick = oppstart;

  elGetId("gjennomsnitt").onclick = gjennomsnitt_plot;
  elGetId("differanse").onclick = differanse_plot;
  elGetId("søyle_maks").onclick = søyle_maks;
  elGetId("søyle_min").onclick = søyle_min;

  elGetId("viskut").onclick = viskUt; // Oppsett av hendelse ved klikk på viskut-knapp

  oppstart();
}
