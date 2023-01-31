
//oppgave 1
let antallBoller = 12;
antallBoller -= 4;
antallBoller += 24;
let bollerPerPerson = antallBoller / 4;
//8

//oppgave 2

try {
    console.log(8 + "4"); // 84
} catch (error) {
    console.log(error)
}
try {
    console.log(8 * "4"); // 32
} catch (error) {
    console.log(error)
}
try {
    console.log(8 / "4"); // 2
} catch (error) {
    console.log(error)
}
try {
    console.log(8 - "4"); //4
} catch (error) {
    console.log(error)
}


//oppgave 3
let a = 3;
let b = 7;

//a) a*b
//b) a*(b-1)
//c) (a-1)*b
//d) a*(b+1)
//e) a-b

//oppgave 4, 5
let antall_timer = 3
let antall_minutter = 50
let antall_sekunder = 20

let totalt_sekunder = antall_timer*3600 + antall_minutter*60 + antall_sekunder
let rest_timer = Math.floor(totalt_sekunder / 3600)
let rest_minutter = Math.floor((totalt_sekunder / 60) % 60)
let rest_sekunder = totalt_sekunder % 60

console.log({totalt_sekunder})
console.log({rest_timer})
console.log({rest_minutter})
console.log({rest_sekunder})


//oppgave 6
let target_word = 'HALLO'
let alfabet = "abcdefghijklmnopqrstvuwxyzøæå";

let result_word = ''

for (let i = 0; i < target_word.length; i++) {
    for (let j = 0; j < alfabet.length; j++) {
        if (target_word[i].toLowerCase() == alfabet[j]) {
            result_word += alfabet[j].toUpperCase()       
        }
    }
}

console.log({result_word})