class Square {
  constructor(xpos, ypos, color) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.color = color;
  }

  tegn() {
    tegnFyltRektangel(
      this.xpos,
      this.ypos,
      1,
      1,
      "hsl(" + this.color + ", 50%, 50%)"
    );
  }
}

var runspeed = 1;

//!TODO: create variable for width and height of squares, must change array size to compensate, only natural numbers()

var animId;
var old_size = 0;
var size = 10;

//Change me?
// var matrix_squares = Array(size).fill( Array(size).fill(new Square()) );
var matrix_squares = [];

function create_squares() {
  for (let x = old_size; x < size; x++) {
    matrix_squares[x] = [];

    for (let y = old_size; y < size; y++) {
      // WITH SIZE 100 (and also try 1000?:)
      // Change color with these:
      // try x*y
      // try x*n/y
      // try x+y
      // try x-y
      // try -x+y
      // try -x-y
      // try x*3-y*5
      // try x'(x/y)
      // try x**x-y**y
      // try Math.sin(x)*100 + Math.sin(y)*100)
      // try (x+y)**2
      // try x*y**2 - (y**3)
      // try x*y**2 - (y**2)
      // try x*y**2

      matrix_squares[x][y] = new Square(x, y, change_color(x, y));

      // matrix_squares[x][y].tegn()
    }
  }
}

function draw_squares() {
  tegnBrukXY(0, size, 0, size);
  for (let x = old_size; x < size; x++) {
    for (let y = old_size; y < size; y++) {
      matrix_squares[x][y].tegn();
    }
  }
}

function change_color(x, y) {
  if (get_color_expression.value) {
    let returnme = get_color_expression.value;
    returnme = returnme.replace(/x/g, x);
    returnme = returnme.replace(/y/g, y);

    return Function("return " + returnme)();
  } 
  else {
    return x * y * 2;
  }
}

const get_color_expression = document.getElementById("color_expression");

const get_size = document.getElementById("size");

const get_runspeed = document.getElementById("runspeed");

get_color_expression.addEventListener("change", draw_squares);

get_size.addEventListener("change", change_size);

get_runspeed.addEventListener("change", change_runspeed);

function change_size() {
  if (get_size.value > size) {
    old_size = size;
    size = get_size.value;

    create_squares();
  }

  size = get_size.value;
  draw_squares();
}

function change_runspeed() {
  if (get_runspeed.value == 0) {
    clearInterval(animId);
  } 
  else {
    if (animId) {
      clearInterval(animId);
    }
    runspeed = get_runspeed.value;
    animId = setInterval(draw_squares, 1000 / runspeed);
  }
}

var canvas, ctx;
window.onload = winInit;
function winInit() {
  canvas = elGetId("canvas"); // Hentes fra klassens kodebibliotek teamtools.js (document.getElmentById("canvas")
  ctx = canvas.getContext("2d"); // Objekt som inneholder tegneverktøyet i canvas
  tegnBrukCanvas("canvas"); // Kobler canvas i html sammen med tegnepakka. Viktig ved lokal koding

  //For refresh every second(no point yet)
  // animId = setInterval(create_squares,1000/runspeed);
  tegnBrukBakgrunn("black");
  create_squares();
  draw_squares();
}
