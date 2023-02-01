//a
for (let i = 0; i <= 100; i++) {
    console.log(i)    
}

//b

for (let i = 0; i <= 100; i++) {
    if (i % 10 == 0 && i != 0){
        continue
    }
    console.log(i)    
}

//c
for (let i = 0; i <= 10; i++) {
    console.log(i*8)    
}

//d

//For løkke er best å bruke når man vet hvor mange ganger man skal
//utføre en oppgave, derfor oppgave a og b

//Vet ikke hvor mange ganger man vil utføre å printe et tall
//fra 8 gangen, kanskje den er bedre da (c)
//jeg ville brukt for løkker for a, b og c egentlig