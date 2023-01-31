class Ball {
  constructor(xpos, ypos, deltax, deltay, xdir, farge) {
    this.xpos = xpos;
    this.ypos = ypos;

    this.deltax = deltax;
    this.deltay = deltay;

    this.xdir = xdir;
    this.ydir = 1;

    this.farge = farge;
  }

  tegn() {
    //Ball hits lef/right bound
    if (this.xpos >= 55 || this.xpos <= -60) {
      this.xdir *= -1;
    }

    //Ball hits top
    if (this.ypos >= 120) {
      this.ydir *= -1;
    }

    //If ball hits paddle (-5 and +5 are because of ball width)
    if (
      this.xpos >= player_x - 5 &&
      this.xpos <= player_x + paddle_width + 5 &&
      this.ypos <= -70 &&
      this.ypos >= -75
    ) {

      //List of possible colors for balls
      var colors = ["red", "green", "blue", "yellow", "white", "orange", "pink", "purple",];

      //Random number with and between 0 to 7, serves as index for the above declared colors array
      var rand_color = Math.round(Math.random() * 7);

      // Random delta x and y, from ca. 0.2 to 2.2
      var rand_x = Math.random() * 2 + 0.2;
      var rand_y = Math.random() * 2 + 0.2;

      //Random direction is chosen as 1(right moving)
      var rand_dir_x = 1;
      // ca. 50/50 chance for rand_dir_x to change to -1(left moving)
      if (Math.random() <= 0.5) {
        rand_dir_x = -1;
      }

      //Amount of balls increases,
      ball_count += 1;
      //Since amount of balls increases, new array item can get created
      balls[ball_count] = new Ball(
        0,
        120,
        rand_x,
        rand_y,
        rand_dir_x,
        colors[rand_color]
      );

      //Ball changes direction (upwards) and this.ypos changes to ensure consistency
      this.ydir = 1;
      this.ypos = -70;
      score += 1;
      score_el.innerHTML = score;
    }

    if (this.ypos <= -90) {
      stopAnim();
      tegnBrukBakgrunn("white");
      paddle_width = 0;
      tegnTekst(
        "GAME OVER",
        -45,
        70,
        "black",
        0,
        "left",
        40,
        "Roboto",
        "bottom"
      );
    }

    this.xpos += this.deltax * this.xdir;
    this.ypos += this.deltay * this.ydir;
    tegnFyltRektangel(this.xpos, this.ypos, 5, 5, this.farge);
  }
}

var ball_count = 0; //Dont change me...
var balls = [new Ball(0, 120, 1, 1, 1, "red")];

var runspeed = 50; //Changeable
var animId = setInterval(spill, 1000 / runspeed);

var player_x = -10; //Dont change me...
var paddle_width = 50; //Change me! (try >= 120!)

tegnBrukXY(-50, 50, -100, 100);

var leftId;
var rightId;
var moving = false;
var paddle_speed = 50;
var score = 0;

var score_el = document.getElementById("score");

//Creates balls, draws background and calls player function
function spill() {
  //Want to see cool art?
  //remove me and change paddel_width to 120
  //Also try moving tegnBrukBakgrunn('black') to winInit!
  tegnBrukBakgrunn("black");

  tegnFyltRektangel(player_x, -73, paddle_width, 3, "blue");

  for (let i = 0; i < balls.length; i++) {
    balls[i].tegn();
  }
}

function key_pressed(event) {
  if (event.keyCode === 37) {
    if (event.type == "keydown" && moving == false) {
      moving = true;
      leftId = setInterval(pad_left, 1000 / paddle_speed);
    }

    if (event.type == "keyup") {
      moving = false;
      clearInterval(leftId);
    }
  }

  if (event.keyCode === 39) {
    if (event.type == "keydown" && moving == false) {
      moving = true;
      rightId = setInterval(pad_right, 1000 / paddle_speed);
    }

    if (event.type == "keyup") {
      moving = false;
      clearInterval(rightId);
    }
  }
  tegnFyltRektangel(player_x, -73, paddle_width, 3, "blue");
}

function pad_left() {
  if (player_x >= -60) {
    player_x -= 3;
  }
}

function pad_right() {
  if (player_x <= 60 - paddle_width) {
    player_x += 3;
  }
}
function stopAnim() {
  clearInterval(animId);
}

var canvas, ctx;
window.onload = winInit;

function winInit() {
  canvas = elGetId("canvas"); // Hentes fra klassens kodebibliotek teamtools.js (document.getElmentById("canvas")
  ctx = canvas.getContext("2d"); // Objekt som inneholder tegneverktøyet i canvas
  tegnBrukCanvas("canvas"); // Kobler canvas i html sammen med tegnepakka. Viktig ved lokal koding

  document.onkeydown = key_pressed;
  document.onkeyup = key_pressed;
}
