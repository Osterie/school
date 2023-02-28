let array1 = [2, 1, 7, 5];
array1.sort(compare_function)
console.log(array1)

let array2 = ["melon", "eple", "appelsin", "ananas", "pære"];
array2.sort()
console.log(array2)

let array3 = [2, 10, 104, 17, 82, 109];
array3.sort(compare_function)
console.log(array3)


function compare_function(a, b) {
    return a - b;
}