class Moving_rectangle {
  constructor(ctx, xpos, width, deltax, xdir, ypos, heigth, deltay, ydir, hue) {
    this.ctx = ctx;

    this.xpos = xpos;
    this.width = width;
    this.deltax = deltax
    this.xdir = xdir
    
    this.ypos = ypos;
    this.heigth = heigth;
    this.deltay = deltay
    this.ydir = ydir
    
    this.hue = hue;
  }

  move_square() {
    this.xpos += this.deltax * this.xdir
    this.ypos += this.deltay * this.ydir
 
    this.color = `hsl( ${this.hue}, ${75}%, ${50}%)`;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.xpos, this.ypos, this.width, this.heigth);
  }
  change_xdir(){
    this.xdir *= -1
  }
  change_ydir(){
    this.ydir *= -1
  }

  stop(){
    this.deltax = 0
    this.deltay = 0
  }
}

class Paddle{
  
  constructor(paddle_x, paddle_width, paddle_speed){
    this.paddle_x = paddle_x
    this.paddle_width = paddle_width
    this.paddle_speed = paddle_speed

    this.move_paddle_left
    this.move_paddle_right

    this.moving = false

  }
  key_pressed(event) {
    if (event.keyCode === 37) {
      if (event.type == "keydown" && this.moving == false) {
        this.moving = true;
        this.move_paddle_left = setInterval(pad_left, 1000 / this.paddle_speed);
      }
  
      if (event.type == "keyup") {
        this.moving = false;
        clearInterval(this.move_paddle_left);
      }
    }
  
    if (event.keyCode === 39) {
      if (event.type == "keydown" && this.moving == false) {
        this.moving = true;
        this.move_paddle_right = setInterval(pad_right, 1000 / this.paddle_speed);
      }
  
      if (event.type == "keyup") {
        this.moving = false;
        clearInterval(this.move_paddle_right);
      }
    }
    this.ctx.fillRect(this.xpos, this.ypos, this.square_size, this.square_size);

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
}


var runspeed = 50; //Changeable
var animId = setInterval(spill, 1000 / runspeed);

var paddle_x = -10; //Dont change me...
var paddle_width = 50; //Change me! (try >= 120!)

tegnBrukXY(-50, 50, -100, 100);

var leftId;
var rightId;
var moving = false;
var paddle_speed = 50;
var score = 0;

const square_size = 20

var score_el = document.getElementById("score");

function spill() {
  tegnBrukBakgrunn("black");
  tegnFyltRektangel(paddle_x, -73, paddle_width, 3, "blue");


  for (let i = 0; i < moving_squares_array.length; i++) {
    moving_squares_array[i].move_square()
    const paddle_x_lower = paddle.paddle_x
    const paddle_x_upper = paddle.paddle_x + paddle.paddle_width
    const ball_x_lower = moving_squares_array[i].xpos
    const ball_x_upper = moving_squares_array[i].xpos + moving_squares_array[i].square_size
    console.log({ball_x_lower}, {ball_x_upper}, {paddle_x_lower}, {paddle_x_upper})
    if (collides_axis(ball_x_lower, ball_x_upper, paddle_x_lower, paddle_x_upper)){
      // moving_squares_array.push(new Moving_rectangle(ctx, 0, 10, 1, 0, 10, 1, 100, square_size))
      moving_squares_array[i].xdir *= -1
    }
  }
}


function stopAnim() {
  clearInterval(animId);
}
var canvas, ctx;
canvas = elGetId("canvas"); // Hentes fra klassens kodebibliotek teamtools.js (document.getElmentById("canvas")
ctx = canvas.getContext("2d"); // Objekt som inneholder tegneverktøyet i canvas

const paddle = new Paddle(paddle_x, paddle_width, paddle_speed)
const moving_squares_array = []
moving_squares_array.push(new Moving_rectangle(ctx, 0, 10, 1, 0, 10, 1, 100, square_size))

window.onload = winInit;

function winInit() {
  tegnBrukCanvas("canvas"); // Kobler canvas i html sammen med tegnepakka. Viktig ved lokal koding

  


  document.addEventListener("keydown", function(event){
    paddle.key_pressed(event)
  })
  document.addEventListener("keyup", function(event){
    paddle.key_pressed(event)
  })
}

//checks if object1 collides with wall of object2
//x1 left, x2 right
//y1 up, y2 down
function collides_axis(object_1_coordinate_lower, object_1_coordinate_upper, object_2_coordinate_lower, object_2_coordinate_upper){

  if (object_1_coordinate_lower <= object_2_coordinate_lower && object_1_coordinate_upper >= object_2_coordinate_upper) {
    return true
  }
  return false
}

function check_ball_position(ball_x, ball_y, paddle_width, paddle_start_x){
      //Ball hits lef/right bound
      if (ball_x >= 55 || ball_x <= -60) {
        this.xdir *= -1;
      }
  
      //Ball hits top
      if (this.ypos >= 120) {
        this.ydir *= -1;
      }
  
      //If ball hits paddle (-5 and +5 are because of ball width)
      if (
        ball_x >= paddle_x - 5 &&
        ball_x <= paddle_x + paddle_width + 5 &&
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
  
      ball_x += this.deltax * this.xdir;
      this.ypos += this.deltay * this.ydir;
      tegnFyltRektangel(ball_x, this.ypos, 5, 5, this.farge);
}