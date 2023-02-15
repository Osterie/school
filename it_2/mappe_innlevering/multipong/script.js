class Rectangle {
  constructor(ctx, xpos, width, ypos, heigth, hue) {
    this.xpos = xpos;
    this.width = width
    this.ypos = ypos;
    this.heigth = heigth
    this.hue = hue;
    this.ctx = ctx;
    this.x_change = 0
    this.x_dir = 0
    this.y_change = 0
    this.y_dir = 0
    this.moving(1, 1, 10, 1);

  }

  draw() {
    this.xpos += this.x_change * this.x_dir
    this.ypos += this.y_change * this.y_dir
    this.color = `hsl( ${this.hue}, ${75}%, ${50}%)`;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.xpos, this.ypos, this.width, this.heigth);
  }

  moving(x_change, x_dir, y_change, y_dir){
    this.x_change = x_change
    this.x_dir = x_dir
    this.y_change = y_change
    this.y_dir = y_dir

    //more general if this is not here?
    this.draw()
  }

  change_x_dir(){
    this.x_dir *= -1
  }
  change_y_dir(){
    this.y_dir *= -1
  }

  get_rectangle(){
    const xpos = this.xpos
    const ypos = this.ypos
    const width = this.width
    const heigth = this.heigth
    return {xpos, ypos, width, heigth}
  }
}

var canvas, ctx;
window.onload = winInit;
canvas = elGetId("canvas"); // Hentes fra klassens kodebibliotek teamtools.js (document.getElmentById("canvas")
ctx = canvas.getContext("2d"); // Objekt som inneholder tegneverktøyet i canvas




var ball_count = 0; //Dont change me...

var balls = [new Rectangle(ctx, 5, 10, 6, 11, 255)];

const paddle = new Rectangle(ctx, canvas.width/2 - 75, 150, canvas.height - 60, 20, 255)

var runspeed = 50; //Changeable

var paddle_x = -10; //Dont change me...
var paddle_width = 50; //Change me! (try >= 120!)


var leftId;
var rightId;
var moving = false;
var paddle_speed = 50;
var score = 0;
var score_el = document.getElementById("score");



function winInit() {
  canvas = elGetId("canvas"); // Hentes fra klassens kodebibliotek teamtools.js (document.getElmentById("canvas")
  ctx = canvas.getContext("2d"); // Objekt som inneholder tegneverktøyet i canvas

  var animId = setInterval(spill, 1000 / runspeed);
  document.onkeydown = key_pressed;
  document.onkeyup = key_pressed;

}

//Creates balls, draws background and calls player function
function spill() {

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const x_change = 1
  const x_dir = 1
  const y_change = 1
  const y_dir = 1

  paddle.draw()
  paddle.moving(0, 0, 0, 0)
  paddle_position = paddle.get_rectangle()

  paddle_y1 = paddle_position.ypos
  paddle_y2 = paddle_position.ypos + paddle_position.height

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    ball_position = balls[i].get_rectangle()

    const ball_x1 = ball_position.xpos
    const ball_x2 = ball_position.xpos + ball_position.width

    const ball_y1 = ball_position.ypos
    const ball_y2 = ball_position.ypos + ball_position.heigth

    if( a_collides_b_axis(ball_x1, ball_x2, 0, canvas.width)){
      balls[i].change_x_dir();
      balls.push(new Rectangle(ctx, 5, 10, 6, 11, 255))
    }

    if( a_collides_b_axis(ball_y1, ball_y2, 0, canvas.height)){
      balls[i].change_y_dir();
      balls.push(new Rectangle(ctx, 5, 10, 6, 11, 255))
    }
    if( a_collides_b_axis(ball_y1, ball_y2, paddle_y1, paddle_y2)){
      balls[i].change_y_dir();
      balls.push(new Rectangle(ctx, 5, 10, 6, 11, 255))
    }
  }
}

function a_collides_b_axis(object_1_lower, object_1_upper, object_2_lower, object_2_upper){

  if (object_1_lower <= object_2_lower && object_2_lower <= object_1_upper){
    return true
  }
  else if (object_1_lower <= object_2_upper && object_2_upper <= object_1_upper){
    return true
  }

  return false
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
}

function pad_left() {
  if (paddle_x >= -60) {
    paddle_x -= 3;
  }
}

function pad_right() {
  if (paddle_x <= 60 - paddle_width) {
    paddle_x += 3;
  }
}
function stopAnim() {
  clearInterval(animId);
}
