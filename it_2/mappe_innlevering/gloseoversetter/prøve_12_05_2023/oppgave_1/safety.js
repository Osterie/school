//I tilfelle kodesnappen ikke fungerer, her er fulab koden

//276444
// Fusion:fujs [Språk JavaScript - Koden kjøres i plattformen fulab.no ] 
// Bruk en if-setning
//
var tall;

for (var i = 1; i<=50; i++){
    tall = randint(1,100);
    // Skriv ut alle tallene som er større enn 40 og mindre enn 60
    if (tall > 40 && tall < 60){
        print(tall);
    }
}

//903908
// Fusion:fujs [Språk JavaScript - Koden kjøres i plattformen fulab.no ] 
// Rett feilene i koden og fullfør programmet

// Fusion:fujs [Språk JavaScript - Koden kjøres i plattformen fulab.no ] 
// Rett feilene i koden og fullfør programmet

var mulige_terningkast = [1, 2, 3, 4, 5, 6]
var antall = new Array(6).fill(0);
var tall; 
// Kode for å trille terninger og telle opp antallet for hver terningside
for (var i = 1; i <= 1000; i++){

    tall = randint(1,6);
    antall[tall-1] += 1
    //Legg inn resten av koden
    //...
}

let procents_array = get_num_value_to_procent(antall)

// Skriver ut en mulige_terningkast med antall og prosent for hver terningside
//...
print("terning:")

print(mulige_terningkast, "\n")

print("antall av hver terning, 1000 kast:")
print(antall, "\n")

print("prosenten av hver terningside:")
print(procents_array)

function get_num_value_to_procent(array){
    
    let array_sum = 0;
    let procent_array = [];

    // finds the sum of the elements in the array
    for (var i = 0; i < array.length; i++){
        array_sum += parseFloat(array[i]);
    }   
    
    //calculates how the how many percentage each elemente is of the ararys sum
    for (var i = 0; i < array.length; i++){
        procent_array[i] = (array[i] / array_sum).toFixed(3) + "%";
    }   
    return procent_array;

}


// 140166

// Fusion:fujs [Språk JavaScript - Koden kjøres i plattformen fulab.no ] 

// Lager først ei liste av tilfeldige tall. 
liste = [];
for (var i = 0 ; i<10; i++){
   liste.push(randint(0,9) );
}
printListe('Tilfeldige tall:',liste);

// Her kommer kode for å finne minste verdi i lista over.
// Bruk ei for-løkke for å løse oppgava. Ikke ferdige funksjoner.

let largest_number = get_largest_value(liste)
print("largest number in list is: ", largest_number)

// Her kommer kode for å finne største verdi i lista over.
// Bruk ei for-løkke for å løse oppgava. Ikke ferdige funksjoner.

let smallest_number = get_smallest_value(liste)
print("smallest number in array is: ", smallest_number)


function get_largest_value(array){
  let max = -Infinity
  for (let i = 0; i < array.length; i++) {

    if (array[i] > max) {
      max = array[i]
    }
  }
  
  return max
}

function get_smallest_value(array){
  let min = Infinity
  for (let i = 0; i < array.length; i++) {
      if (array[i] < min) {
      min = array[i]
      }
  }
  return min
}



//279344
// Fusion:fujs [Språk JavaScript - Koden kjøres i plattformen fulab.no ] 

// En ansatte skriver opp antall arbeidstimer for hver dag i en måned.
// I dette programmet lages timelista syntetisk i de neste linjene
// Du skal til slutt i koden regne ut overtiden totalt (mer enn 8 timer per dag)
// For overtidstimer betales 550 kr/time
//
timeliste = [];
var ukedag = 1;
for (var i = 1 ; i < 31; i++){
    if (ukedag <= 5){
        timeliste.push({dato:i, timer:randint(8,12)});
    }
    else {
        timeliste.push({dato:i, timer:0});
    }
    ukedag = ukedag + 1;
    if (ukedag == 8) ukedag = 1;
}
// Testutskrift
for (var j = 0; j<timeliste.length;j++){
    print('Dato:',timeliste[j].dato,'Timer:',timeliste[j].timer);
}
// Nå er timene lagra i arrayen timeliste.
// Her kommer kode for å beregne hvor mye det skal bli utbetalt overtid 
// denne måneden. Skriv ut en ryddig overskrift.

let hours = []
for (var j = 0; j<timeliste.length;j++){
    hours.push(timeliste[j].timer)    
}

let overtime_pay = calculate_overtime(8, hours, 550)

print("\novertids betaling for denne måneden er: ", overtime_pay, "kr")


//overtime_start er hvor mye man må jobbe over for at det er overtid
function calculate_overtime(overtime_start, hours, pay_per_hour){
    
    let overtime_pay = 0
    for (var i = 1 ; i < hours.length; i++){
        if (hours[i] > overtime_start){
            overtime_pay += pay_per_hour    
        }
    }
    return overtime_pay
}