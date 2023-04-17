const måneder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const min_temp = [ -10.2, -11.1, -5.1, -3.7, 0, 6.9, 7.8, 6.5, 4.2, -1.0, -6.1, -7.3 ];
const maks_temp = [ 8.9, 15.4, 13.8, 16.5, 21.2, 26.4, 29.1, 26.2, 21.8, 19.7, 15.0, 11.8 ];

var canvas, ctx;
window.onload = winInit;

function winInit() {
  // Hovedprogrammet
  canvas = elGetId("canvas"); // Hentes fra klassens kodebibliotek teamtools.js (document.getElmentById("canvas")
  ctx = canvas.getContext("2d"); // Objekt som inneholder tegneverktøyet i canvas
  tegnBrukCanvas("canvas"); // Kobler canvas i html sammen med tegnepakka. Viktig ved lokal koding
 
  const differanse_temp = differanse_to_lister(maks_temp, min_temp);
  const gjennomsnitt_temp = gjennomsnitt_to_lister(maks_temp, min_temp);

  elGetId("min_maks").addEventListener("click", function(event){ oppstart() })
  elGetId("gjennomsnitt").addEventListener("click", function(event){ plot_graf(måneder, gjennomsnitt_temp, "Måneder", "Gjennomsnitt Temperatur") })
  elGetId("differanse").addEventListener("click", function(event){ plot_graf(måneder, differanse_temp, "Måneder", "Temperatur forskjell") })
  elGetId("søyle_maks").addEventListener("click", function(event){ plot_søyle_diagram(måneder, maks_temp, "Tafjord [SN60500]", "Måned", "Temperatur") })
  elGetId("søyle_min").addEventListener("click", function(event){ plot_søyle_diagram(måneder, min_temp, "Tafjord [SN60500]", "Måned", "Temperatur") });
  elGetId("viskut").onclick = viskUt; // Oppsett av hendelse ved klikk på viskut-knapp

  oppstart();
}

function oppstart() {
  tegnBrukBakgrunn("white");
  plot(måneder, maks_temp, "rød", "Maks temp");
  plot(måneder, min_temp, "svart", "Min temp");
  tegnAkser("Måned", "Temperatur", 0, 1, true, true, false);
}

function differanse_to_lister(array_1, array_2) {
  var differanse = [];
  if (len(array_1) != len(array_2)) {
    return print("Listene må være like store!");
  }

  for (let i = 0; i < array_1.length; i++) {
    differanse.push(array_1[i] - array_2[i]);
  }

  return differanse;
}

function gjennomsnitt_to_lister(liste_1, liste_2) {
  var gjen_temp = [];
  if (len(liste_1) != len(liste_2)) {
    return print("Listene må være like store!");
  }

  for (let i = 0; i < liste_1.length; i++) {
    gjen_temp.push(((liste_1[i] + liste_2[i]) / 2).toFixed(1));
  }

  return gjen_temp;
}

function plot_graf(x_liste, y_liste, x_akse, y_akse) {
  tegnBrukBakgrunn("white");
  plot(x_liste, y_liste, "blå", y_akse);
  tegnAkser(x_akse, y_akse, 0, 1, true, true, false);
}

function plot_søyle_diagram(x_liste, y_liste, tittel, x_akse, y_akse ) {
  
  tegnBrukBakgrunn("white");
  tegnTittel(tittel, "svart", "18", "Calibri");
  tegnAkser(x_akse, y_akse, 0, 1, true, true, false);

  let color = "red";
  for (let i = 0; i < y_liste.length; i++) {
    if (i % 2 == 0) { color = "blue"; } 
    else { color = "red"; }
    tegnFyltRektangel(x_liste[i] - 0.25, 0, 0.5, y_liste[i], color);
  }
}

function plot(xliste, yliste, graf_farge, tekst) {
  tegnTittel("Tafjord [SN60500]", "svart", "18", "Calibri");
  tegnBrukXY(0, 13, -20, 30);
  tegnTekst( tekst, xliste[0], yliste[0] - 3, graf_farge, 0, "left", 20, "Calibri", "bottom" );
  tegnKurve(xliste, yliste, graf_farge, "strek", 2);
}

function viskUt() {
  tegnBrukBakgrunn("white");
}