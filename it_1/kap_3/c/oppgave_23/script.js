function krypter(ord) {
    let alfabet = "abcdefghijklmnopqrstuvwxyzæøåa ";
    let nyttord = ""

    for (let i = 0; i < ord.length; i++) {
        let index = alfabet.indexOf(ord[i]);
        let nyindex = index + 1;
        if (alfabet[index] == " "){
            nyttord += ' '
        }
        else{
            nyttord += alfabet[nyindex];
        }
    }
    return nyttord
}

kryptert_ord = krypter('hei hade')
console.log(kryptert_ord)