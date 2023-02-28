let array3 = [2, 10, 104, 17, 82, 109];
array3.sort(compare_function)
console.log(array3)


function compare_function(a, b) {
    console.log(a + " - " + b + " = " + (a - b));
    return a - b;
}