//a
for (let i = 0; i < 75; i++) {
    console.log("Around the world, around the world")
}

//b

for (let i = 0; i < 74; i++) {

    for (let i = 0; i < 9; i++) {
        console.log("gucci gang")
        
    }
    console.log("spend three racks on new chains")
}

//c

let vers1 = "A well a everybody's heard about the bird B-b-b bird, bird, bird, b-bird's the word";
let vers2 = "A well a don't you know about the bird? Well, everybody knows that the bird is the word!";
let vers3 = "Surfin' bird  B-b-b aah, aah!";
let refreng1 = "A well a bird, bird, bird, the bird is the word";
let refreng2 = "A well a bird, bird, bird, well the bird is the word";

for (let i = 1; i <= 7; i++) {
    if((i-8) % 7 == 0){
        console.log(vers1)
    }

    else if (i % 2 == 0){
        //refreng
        for (let j = 0; j < 7; j++) {
            if (j % 2 == 0){
                console.log(refreng2)
            }
            else{
                console.log(refreng1)
            }
        }
    }
    else if(i % 3 == 0){
        console.log(vers2)
    }

    else if (i % 7 == 0){
        console.log(vers3)
    }
}