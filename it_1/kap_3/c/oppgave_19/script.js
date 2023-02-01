for (let i = 99; i > 0; i--) {
    
    console.log(`${i} flasker med brus på hylla, {i} flasker med brus. Ta en ned og send den rundt, ${i-1} flasker med brus på hylla.`)

    if(i-1 == 0){
        console.log(`Ingen flere flasker på hylla, ingen flasker igjen. Gå i butikken og kjøp noen flere, 99 flasker med brus på hylla.`)    
    }
}