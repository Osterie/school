let xArr   = [ ];				// Oppretter en array for x-verdier
let yArr   = [ ]; 				// Oppretter en array for y-verdier
let tittel = '';
let aksetekst = [];
let separator = ';'				// Skilletegnet på fila

window.onload = winInit ;   // Når nettsiden er ferdig lasta kjøres winInit

function winInit(){
	tegnBrukCanvas("canvas"); // Kobler sammen canvas med tegnepakka
	elGetId("valgtCSVeneste").onchange  = csvInputOne; // Funksjonen som mottar innholdet etter innlesing
	elGetId("valgtCSVleggtil").onchange  = csvInputMany;
    //lesFil('datafiler/juni.csv')
	visCSVdata();
}

// De neste tre funksjonene kan brukes ved innlesing av fil fra en server.
// Direkte innlesing fra serverfil løses med async og await.
// Legg merke til JQuery biblioteket som er inkludert i HTML
// Og at det er bare er funksjonen csvAnalyser som er spesifikk for dette datasettet.

// async function lesFil(filnavn) { // Prosess: sjekk, les inn, analyser
// 	if (sjekkFilServer(filnavn)){ 
// 		try {
// 			filinnhold = await lastInn(filnavn);
// 			csvAnalyser(filinnhold); // Analyserer filas innhold
// 		} catch (error) {
// 			console.error('Error:', error.message);
// 		}
// 	}
// 	else {
// 		alert('Fant ikke fila :'+filnavn)
// 		return false
// 	}
// }

function lastInn(file) { // Laster inn filinnholdet fra fila
    return fetch(file).then((response) => response.text() );
}

// Så kommer hjelpefunksjoner for å analysere datasettet og vise innholdet grafisk i canvas
//
function csvInputOne(){ // Funksjon om knyttes til innlesingsknappen for CSV
	let file = this.files[0]; // Objektet som lagre informasjonen etter fil-inn dialogen
	let reader = new FileReader();
	reader.onload = function(evt) {
					let csvdata = evt.target.result;
					csvAnalyserOne(csvdata); 
				    };
	reader.readAsText(file);
}

function csvInputMany(){ // Funksjon om knyttes til innlesingsknappen for CSV
	let file = this.files[0]; // Objektet som lagre informasjonen etter fil-inn dialogen
	let reader = new FileReader();
	reader.onload = function(evt) {
					let csvdata = evt.target.result;
					csvAnalyserMany(csvdata); // Funksjonen som 
				    };
	reader.readAsText(file);
}

function csvAnalyserOne(innhold){    // Behandler CSV-data og kaller opp plottefunksjonen
	xArr = [];
	yArr = [];
	let linjer = innhold.split('\n');
	tittel = linjer[0] // Første linje brukes i dette tilfellet som tittel
	aksetekst = linjer[1].split(separator); // Aksetekster på neste linje
	let rad = []
	for (let i = 2; i < linjer.length; i++){ // Deretter datapunktene. Ett punkt per linje
		rad = linjer[i].split(separator);
		xArr.push(parseFloat(rad[0]));
		yArr.push(parseFloat(rad[1]));
	}
	visCSVdata(); // Plotter fra arrayene
}

function csvAnalyserMany(innhold){    // Behandler CSV-data og kaller opp plottefunksjonen
	let linjer = innhold.split('\n');
	//tittel = linjer[0] // Første linje brukes i dette tilfellet som tittel
	//aksetekst = linjer[1].split(separator); // Aksetekster på neste linje
	let rad = []
	for (let i = 2; i < linjer.length; i++){ // Deretter datapunktene. Ett punkt per linje
		rad = linjer[i].split(separator);
		xArr.push(parseFloat(rad[0]));
		yArr.push(parseFloat(rad[1]));
	}
	visCSVdata(); // Plotter fra arrayene
}

function visCSVdata(){ // Plottefunksjonen
    tegnBrukBakgrunn('lightgrey')
	if (xArr.length < 2){
		tegnBrukXY(0,1,0,1);
		tegnTekst('Ingen data å plotte',0.35,0.5);
	}
	else{
		let x1 = min(xArr)
		let x2 = max(xArr)
		let y1 = min(0.0,yArr)
		let y2 = max(yArr)
		tegnBrukXY(x1,x2,y1,y2); // Verdenskoordinater
		tegnKurve(xArr,yArr,'blue');   // Grafen
		tegnMarkørliste(xArr,yArr,'sirkel','red',3);   // Symboler for hver punkt
		tegnAkser(aksetekst[0],aksetekst[1]); // Akser med tekst fra fila (linje 1 i dette tilfellet)
		tegnTittel(tittel)
	}
}