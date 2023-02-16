//TODO change hue with "color" and give hue as argument bruv, seperation of concerns or whatever
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
  }

  change_x_dir(){
    this.x_dir *= -1
  }
  change_y_dir(){
    this.y_dir *= -1
  }

  get_rectangle(){
    //TODO: should return all values?
    const xpos = this.xpos
    const ypos = this.ypos
    const width = this.width
    const heigth = this.heigth
    return {xpos, ypos, width, heigth}
  }
}

var score = 0;
const score_el = document.getElementById("score");

//FPS
var runspeed = 50;

var paddle_x = -10;
var paddle_width = 50;

var paddle_move_id, animation_id 

var canvas, ctx;
window.onload = winInit;
canvas = elGetId("canvas"); // Hentes fra klassens kodebibliotek teamtools.js (document.getElmentById("canvas")
ctx = canvas.getContext("2d"); // Objekt som inneholder tegneverktøyet i canvas


const balls = [new Rectangle(ctx, 5, 10, 6, 11, 255)];
balls[0].moving(5,1,5,1)

const paddle = new Rectangle(ctx, canvas.width/2 - 75, 150, canvas.height - 60, 20, 255)


function winInit() {

  animation_id = setInterval(play, 1000 / runspeed);
  
  document.addEventListener("keydown", () => {

    if (event.key === "ArrowLeft"){
      paddle.moving(5, -1, 0, 0)
    }

    else if (event.key === "ArrowRight"){
      paddle.moving(5, 1, 0, 0)
    }


    paddle_position = paddle.get_rectangle()

    const paddle_y1 = paddle_position.ypos
    const paddle_y2 = paddle_position.ypos + paddle_position.height
  
    const paddle_x1 = paddle_position.xpos
    const paddle_x2 = paddle_position.xpos + paddle_position.width


  //Paddle hits wall
  if ( a_collides_b_axis(paddle_x1, paddle_x2, 0, canvas.width) ){
    paddle.moving(0,0,0,0)
  }

  })

  document.addEventListener("keyup", () => {

    if (event.key === "ArrowLeft"){
      paddle.moving(0, 0, 0, 0)

    }

    else if (event.key === "ArrowRight"){
      paddle.moving(0, 0, 0, 0)
    }
  })
}

function paddle_move(speed, direction){
  paddle.moving(speed, direction, 0, 0)
}


//Creates balls, draws background and detects ball collision
function play() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  paddle_position = paddle.get_rectangle()

  const paddle_y1 = paddle_position.ypos
  const paddle_y2 = paddle_position.ypos + paddle_position.height

  const paddle_x1 = paddle_position.xpos
  const paddle_x2 = paddle_position.xpos + paddle_position.width

  paddle.draw()

  for (let i = 0; i < balls.length; i++) {

    balls[i].draw();
    ball_position = balls[i].get_rectangle()

    const ball_x1 = ball_position.xpos
    const ball_x2 = ball_position.xpos + ball_position.width

    const ball_y1 = ball_position.ypos
    const ball_y2 = ball_position.ypos + ball_position.heigth

    //ball hits walls of canvas
    if( a_collides_b_axis(ball_x1, ball_x2, 0, canvas.width)){
      balls[i].change_x_dir();
    }

    //ball hits roof or floor of canvas
    if( a_collides_b_axis(ball_y1, ball_y2, 0, canvas.height)){
      balls[i].change_y_dir();
    }

    //ball hits paddle
    if( a_collides_b_axis(ball_y1, ball_y2, paddle_y1, paddle_y2) && a_collides_b_axis(paddle_x1, paddle_x2, ball_x1, ball_x2)){
      balls[i].change_y_dir();
      balls.push(new Rectangle(ctx, 5, 10, 6, 11, 255))
      balls[balls.length -1].moving(5,1,5,1)
    }
  }

}


function draw_squares(){


}


function paddle_handler(){

}

function print_to_element(statement, element){

}

//takes axis as arguments, if one of the axis of object 2 is between the two axis of object 1, returns true
function a_collides_b_axis(object_1_lower, object_1_upper, object_2_lower, object_2_upper){

  // object 2 lower value axis is between object 1 lower value of axis and object 1 upper value of axis
  if (is_between_or_equal(object_2_lower, object_1_lower, object_1_upper)){
    return true
  }
  // object 2 upper value axis is between object 1 lower value of axis and object 1 upper value of axis
  else if (is_between_or_equal(object_2_upper, object_1_lower, object_1_upper)){
    return true
  }
  return false
}

function is_between_or_equal(value_1, value_2, value_3){
  const value_array = sort_numerically([value_1, value_2, value_3])
  if (value_array[1] === value_1){
    return true
  }
  return false

}

function sort_numerically(array){
  array.sort(function(a, b) {return a - b;});
  return array
}