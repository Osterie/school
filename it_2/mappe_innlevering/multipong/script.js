class Ball {
  constructor(xpos, ypos, deltax, deltay, xdir, farge, parent_balls_class) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.deltax = deltax;
    this.deltay = deltay;
    this.xdir = xdir;
    this.ydir = 1;
    this.farge = farge;
    this.parent_balls_class = parent_balls_class
  }

  draw() {
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
      this.ydir = 1;
      this.ypos = -70;
      score += 1;
      score_el.innerHTML = score;
      this.parent_balls_class.add_ball()
    }

    if (this.ypos <= -90) {
      stopAnim(animId);
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

class Balls {

  constructor(){
    this.balls = []
    this.ball_count = 0
  }

  add_ball(){
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
    // ball_count += 1;
    //Since amount of balls increases, new array item can get created
    // balls[ball_count] = new Ball(
    //   0,
    //   120,
    //   rand_x,
    //   rand_y,
    //   rand_dir_x,
    //   colors[rand_color],
    //   this
    // );



    this.balls.push(new Ball(0, 120, rand_x, rand_y, rand_dir_x, colors[rand_color], this))
    this.ball_count += 1
  }

  draw_balls(){
    // console.log(this.balls)
    for (let i = 0; i < ball_count; i++) {
      this.balls[i].draw()
    }
  }
}

class Pong_game{
  constructor(canvas, paddle_width, paddle_speed){
    
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.paddle_width = paddle_width
    this.paddle_speed = paddle_speed

    this.moving = false
    this.paddle_x = 0

    this.moving_paddle_left 
    this.moving_paddle_right

    this.ball_array = new Balls
    this.ball_array.add_ball()
    console.log(this.ball_array)
  }

  start(){
    this.pong_game_animation_id = setInterval(this.draw_game.bind(this), 1000 / this.paddle_speed)
  }

  stop(){
    clearInterval(this.pong_game_animation_id)
  }

  key_pressed(event) {
    if (event.keyCode === 37) {
      if (event.type == "keydown" && this.moving == false) {
        this.moving = true;
        this.moving_paddle_left = setInterval(this.pad_left.bind(this), 1000 / this.paddle_speed);
      }
  
      if (event.type == "keyup") {
        this.moving = false;
        clearInterval(this.moving_paddle_left);
      }
    }
  
    if (event.keyCode === 39) {
      if (event.type == "keydown" && this.moving == false) {
        this.moving = true;
        this.moving_paddle_right = setInterval(this.pad_right.bind(this), 1000 / this.paddle_speed);
      }
  
      if (event.type == "keyup") {
        this.moving = false;
        clearInterval(this.moving_paddle_right);
      }
    }

    tegnFyltRektangel(this.paddle_x, -73, this.paddle_width, 3, "blue");
  }

  pad_left() {
    if (this.paddle_x >= -60) {
      this.paddle_x -= 3;
    }
  }
  
  pad_right() {
    if (this.paddle_x <= 60 - this.paddle_width) {
      this.paddle_x += 3;
    }
  }

  draw_game(){
    tegnBrukBakgrunn("black");
    tegnFyltRektangel(this.paddle_x, -73, this.paddle_width, 3, "blue");
    this.ball_array.draw_balls()
  }
}

var ball_count = 0; //Dont change me...
var balls = [new Ball(0, 120, 1, 1, 1, "red")];

var runspeed = 50; //Changeable

var player_x = -10; //Dont change me...
var paddle_width = 50; //Change me! (try >= 120!)

tegnBrukXY(-50, 50, -100, 100);

var leftId;
var rightId;
var moving = false;
var paddle_speed = 50;
var score = 0;

var score_el = document.getElementById("score");

const ball_array = new Balls

var canvas, ctx;
window.onload = winInit;

function winInit() {
  canvas = elGetId("canvas"); // Hentes fra klassens kodebibliotek teamtools.js (document.getElmentById("canvas")
  ctx = canvas.getContext("2d"); // Objekt som inneholder tegneverktøyet i canvas
  tegnBrukCanvas("canvas"); // Kobler canvas i html sammen med tegnepakka. Viktig ved lokal koding

  const pong_game = new Pong_game(canvas, paddle_width, paddle_speed)
  document.addEventListener("keydown", function(event) {
    pong_game.key_pressed(event)
  })
  document.addEventListener("keyup", function(event) {
    pong_game.key_pressed(event)
  })
  pong_game.start()
}
