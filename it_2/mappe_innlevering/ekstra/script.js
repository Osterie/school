class Square {
  constructor(xpos, ypos, color, saturation, hue) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.color = color;
    this.saturation = saturation;
    this.hue = hue;
  }

  tegn() {
    tegnFyltRektangel(
      this.xpos,
      this.ypos,
      1,
      1,
      "hsl(" + this.color + ", " + this.saturation + "%," + this.hue + "%)"
    );
  }
}

//TODO: Create option to make a variable that changes every second f.eks. goes from 1 to 10 then 10 to 1, call it n and then n can be
// used in the color chooser

var ctx;

var canvas = elGetId("canvas");

var runspeed = 1;

//!TODO: create variable for width and height of squares, must change array size to compensate, only natural numbers()

var animId;
var old_size_upper = 0;
var old_size_lower = 0;
var size_lower = -10;
var size_upper = 10;
var size = Math.abs(size_lower) + size_upper;

// WITH SIZE 100 (and also try 1000?:)
// Change color with these:
// try x*y
// try x*n/y
// try x+y
// try x-y
// try -x+y
// try -x-y
// try x*3-y*5
// try x*(x/y)
// try x**x-y**y
// try Math.sin(x)*100 + Math.sin(y)*100)
// try (x+y)**2
// try x*y**2 - (y**3)
// try x*y**2 - (y**2)
// try x*y**2
// try (x*3-y)*(y*10)
// try (x*3-y)*(y*120)
// try (sin(x*y)*2)**6
//try Math.random()*1000

//SUPER COOL
//try ln(abs(x*y))*100
//try ln(x*y)*100
//try (y)**2 + (x)**2
//try (y/10)**2 + (x/10)**2
//try x%y * n or whatever
//try x<<y
//try x/y*1000
//try (y)**2>>x*10000
//try y&x
//try y^x
//try y|x
//try (x.y)^100
//try (x.y)**2
//try (x.y)*x*y
//try (x.y)*x
//try (x.y)*ln(x)
//try sqrt((x)**2 + (y)**2)
//try sqrt((x)**3 + (y)**3)
//try sqrt((x)**4 + (y)**3)
//try sqrt((x)**4 + (y)**4)
//try sqrt((x)**4 + (y)**5)
//try Math.log(x*y)*1000
//try Math.acosh(abs(x*y))*1000
//try Math.atan(abs(x*y))*100000
//try Math.cbrt(abs(x*y))*10
//try !     Math.clz32(abs(x*y))*100
//try Math.cos(x*y)*100
//try Math.sin(x*y)*100
//try Math.tan(x*y)*100
//try abs(x.y)*y*x
//try xyxy
//try xy*x

//OTHER
//try (x*y)**2 and saturation: x*y -100

var matrix_squares = [];

function create_squares() {
  size = Math.abs(size_lower) + size_upper;
  tegnBrukBakgrunn("black");

  for (let x = 0; x < size; x++) {
    if (matrix_squares[x] == undefined) {
      matrix_squares[x] = [];
    }

    for (let y = 0; y < size; y++) {
      matrix_squares[x][y] = new Square(
        x + size_lower,
        y + size_lower,
        change_color(x + size_lower, y + size_lower),
        change_saturation(x + size_lower, y + size_lower),
        change_hue(x + size_lower, y + size_lower)
      );
    }
  }

  for (let x = old_size_upper; x < size + old_size_lower; x++) {
    for (let y = 0; y < size; y++) {
      matrix_squares[x][y] = new Square(
        x + size_lower,
        y + size_lower,
        change_color(x + size_lower, y + size_lower),
        change_saturation(x + size_lower, y + size_lower),
        change_hue(x + size_lower, y + size_lower)
      );
    }
  }
}
var scalex1 = size_lower;
var scalex2 = size_upper;
var scaley1 = size_lower;
var scaley2 = size_upper;

var square_saturation = 100;
var square_hue = 50;

var scaled = false;

function draw_squares() {
  size = Math.abs(size_lower) + size_upper;

  if (!scaled) {
    tegnBrukXY(size_lower, size_upper, size_lower, size_upper);
  }

  for (let x = 0; x < matrix_squares.length; x++) {
    for (let y = 0; y < matrix_squares.length; y++) {
      matrix_squares[x][y].tegn();
    }
  }
}

function change_color(x, y) {
  if (get_color_expression.value) {
    //This is SUPER slow.
    //for now i recommend just changing the returned expression to whatever you want
    //ie. x*y*10 or something.
    let returnme = get_color_expression.value.replace(/x/g, x).replace(/y/g, y);
    return Function("return " + returnme)();
  } 
  else {
    return 100;
  }
}

function change_saturation(x, y) {
  if (get_saturation_expression.value) {
    let returnme = get_saturation_expression.value
      .replace(/x/g, x)
      .replace(/y/g, y);
    return Function("return " + returnme)() % 100;
  } 
  else {
    return 100;
  }
}
function change_hue(x, y) {
  if (get_saturation_expression.value) {
    let returnme = get_hue_expression.value.replace(/x/g, x).replace(/y/g, y);

    return Function("return " + returnme)() % 100;
  } 
  else {
    return 50;
  }
}

const get_color_expression = document.getElementById("color_expression");
const get_saturation_expression = document.getElementById(
  "saturation_expression"
);
const get_hue_expression = document.getElementById("hue_expression");

const get_size_lower = document.getElementById("size_lower");
const get_size_upper = document.getElementById("size_upper");

const get_runspeed = document.getElementById("runspeed");

get_size_upper.addEventListener("change", change_size_upper);
get_size_lower.addEventListener("change", change_size_lower);

// get_runspeed.addEventListener("change", change_runspeed);

get_color_expression.addEventListener("change", color_changed);
get_saturation_expression.addEventListener("change", color_changed);
get_hue_expression.addEventListener("change", color_changed);

function color_changed() {
  old_size_upper = 0;
  old_size_lower = 0;
  create_squares();
  draw_squares();
}

var max_size = 0;
function change_size_upper() {
  new_size = parseInt(get_size_upper.value);

  if (new_size > size_upper) {
    old_size_upper = size_upper;
    size_upper = new_size;

    if (new_size > max_size) {
      max_size = new_size;
      create_squares();
    }
  }
  size_upper = new_size;

  draw_squares();
}

function change_size_lower() {
  new_size = parseInt(get_size_lower.value);

  if (new_size < size_lower) {
    old_size_lower = size_lower;
    size_lower = new_size;

    if (new_size < max_size) {
      max_size = new_size;
      create_squares();
    }
  }
  size_lower = new_size;

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

var down_x;
var down_y;
var up_x;
var up_y;
var zooming;
var list1;
var list2;
var absolute_width_square;
var absolute_heigth_square;

absolute_width_square = canvas.width / size;
absolute_heigth_square = canvas.height / size;

function get_cursor_position(canvas, event) {
  const rect = canvas.getBoundingClientRect();

  if (event.type == "mousedown") {
    absolute_width_square = canvas.width / size;
    absolute_heigth_square = canvas.height / size;

    zooming = true;
    down_x = (event.clientX - rect.left) / absolute_width_square + size_lower;
    down_y = -((event.clientY - rect.top) / absolute_width_square + size_lower);
    console.log(down_x, down_y);
    list1 = [down_x];
    list2 = [-down_y];
    console.log(list1, list2);
  } 
  
  else if (event.type == "mouseup") {
    zooming = false;
    up_x = (event.clientX - rect.left) / absolute_width_square + size_lower;
    up_y = -((event.clientY - rect.top) / absolute_heigth_square + size_lower);

    scaled = true;
    if (event.ctrlKey) {
      scaled = false;
    }

    list1 = [down_x, up_x];
    list2 = [down_y, up_y];

    list1.sort(function (a, b) {
      return a - b;
    });
    list2.sort(function (a, b) {
      return a - b;
    });

    tegnBrukXY(list1[0], list1[1], list2[0], list2[1]);
    create_squares();
    draw_squares();
  }
}

function zoom_guider() {
  if (zooming) {
    tegnBrukBakgrunn("black");
    const rect = canvas.getBoundingClientRect();

    current_x =
      (event.clientX - rect.left) / absolute_width_square + size_lower;
    current_y =
      (event.clientY - rect.top) / absolute_heigth_square + size_lower;

    var difference = Math.abs(size_lower) - Math.abs(size_upper);
    list1[1] = current_x;
    list2[1] = current_y;

    tegnFirkant(
      list1[0],
      -list2[0] - difference,
      current_x,
      -current_y - difference,
      "blue",
      false
    );
  }
}

canvas.addEventListener("mousemove", zoom_guider);

canvas.addEventListener("mousedown", function (e) {
  get_cursor_position(canvas, e);
});

canvas.addEventListener("mouseup", function (e) {
  get_cursor_position(canvas, e);
});

window.onload = winInit;
function winInit() {
  ctx = canvas.getContext("2d"); // Objekt som inneholder tegneverktøyet i canvas
  tegnBrukCanvas("canvas");
  tegnBrukBakgrunn("black");
  tegnBrukSynsfelt(0, 1, 0, 1);
  // ctx.filter = 'hue-rotate(200deg)'

  create_squares();
  draw_squares();
}
