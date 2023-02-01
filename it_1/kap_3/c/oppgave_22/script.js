let alfabet = "abcdefghijklmnopqrstuvwxyzæøå";

for (let i = 0; i < 10; i++) {
    let word = ''
    let word_length = Math.floor(Math.random()*10) + 3
    for (let j = 0; j < word_length; j++) {
        random_num = Math.floor(Math.random()*alfabet.length)
        word += alfabet[random_num]
    }
    console.log(word)    
}