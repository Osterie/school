console.time("myCode");

const radius = 1;
const diameter = radius * 2;
const square_area = 2 * diameter;

let a = -1;
let b = 1;
let n = 4000;

let dx = (b - a) / n;
let circle_area = 0;

function f(x) {
  return Math.sqrt(1 - x ** 2);
}

for (let i = 0; i < n; i++) {
  circle_area += f(a + i * dx) * dx;
}

circle_area *= 2;
console.log(circle_area);
console.log((circle_area - Math.PI).toFixed(10));

console.timeEnd("myCode");
