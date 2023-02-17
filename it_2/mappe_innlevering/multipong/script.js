const get_score_elemenet = document.getElementById("score");
var score = 0;

//FPS
const runspeed = 50;

const paddle_x = -10;
const paddle_width = 50;

var paddle_move_id, animation_id 

var canvas, ctx;
window.onload = winInit;
canvas = elGetId("canvas"); // Hentes fra klassens kodebibliotek teamtools.js (document.getElmentById("canvas")
ctx = canvas.getContext("2d"); // Objekt som inneholder tegneverktøyet i canvas






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

  rectangle_collides_direction(obstacle_lower, obstacle_upper, dir){

    let rectangle_lower
    let rectangle_upper

    if (dir.toLowerCase() == "x"){
      rectangle_lower = this.xpos
      rectangle_upper = this.xpos + this.width
    }
    else if (dir.toLowerCase() == "y"){
      rectangle_lower = this.ypos
      rectangle_upper = this.ypos + this.heigth
    }

    if( object_collides(rectangle_lower, rectangle_upper, obstacle_lower, obstacle_upper)){
      return true
    }
    return false
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
    const x_dir = this.x_dir
    const y_dir = this.y_dir
    const width = this.width
    const heigth = this.heigth
    return {xpos, ypos, x_dir, y_dir, width, heigth}
  }
}

class All_rectangles {

  constructor(){
    this.rectangles = []
  }

  draw_rectangles(){
    for (let i = 0; i < this.rectangles.length; i++) {
      this.rectangles[i].draw()      
    }
  }

  add_rectangle(rectangle){
    this.rectangles.push(rectangle)
  }

  rectangle_collides_direction(obstacle_lower, obstacle_upper, dir){
    for (let i = 0; i < this.rectangles.length; i++) {

      const rectangle_object = this.rectangles[i].get_rectangle()

      let rectangle_lower
      let rectangle_upper

      if (dir.toLowerCase() == "x"){
        rectangle_lower = rectangle_object.xpos
        rectangle_upper = rectangle_object.xpos + rectangle_object.width
      }
      else if (dir.toLowerCase() == "y"){
        rectangle_lower = rectangle_object.ypos
        rectangle_upper = rectangle_object.ypos + rectangle_object.height
      }

      if( object_collides(rectangle_lower, rectangle_upper, obstacle_lower, obstacle_upper)){
        return true
      }
      return false
    }
  }
}

const ball_array = new All_rectangles()

const rectangle = new Rectangle(ctx, 5, 10, 6, 11, 255)
rectangle.moving(3,1,3,1)

ball_array.add_rectangle(rectangle)

// const balls = [new Rectangle(ctx, 5, 10, 6, 11, 255)];
// balls[0].moving(5,1,5,1)
const paddle = new Rectangle(ctx, canvas.width/2 - 75, 150, canvas.height - 60, 20, 255)

function winInit() {

  animation_id = setInterval(play, 1000 / runspeed);

  document.addEventListener("keydown", function(event){
    paddle_handler(event)
  })
  document.addEventListener("keyup", function(event) {
    paddle_handler(event)
  })
}

function paddle_handler(event){

  if (event.type === "keydown"){
    if (event.key === "ArrowLeft"){
      paddle.moving(5, -1, 0, 0)
    }

    else if (event.key === "ArrowRight"){
      paddle.moving(5, 1, 0, 0)
    }
  }

  if (event.type === "keyup") {
    if (event.key === "ArrowLeft"){
      paddle.moving(0, 0, 0, 0)
    }

    else if (event.key === "ArrowRight"){
      paddle.moving(0, 0, 0, 0)
    }
  }
}

//Creates balls, draws background and detects ball collision
function play() {

  //draw background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  draw_paddle(canvas, paddle)

  // draw_squares(canvas, balls, paddle)

  paddle_info = paddle.get_rectangle()
  const paddle_x1 = paddle_info.xpos
  const paddle_x2 = paddle_info.xpos + paddle_info.width
  const paddle_y1 = paddle_info.ypos
  const paddle_y2 = paddle_info.ypos + paddle_info.height
  

  ball_array.draw_rectangles()
  
  for (let i = 0; i < ball_array.rectangles.length; i++) {
    //ball hits roof
    if (ball_array.rectangles[i].rectangle_collides_direction( 0, 0, "y" )){
      ball_array.rectangles[i].change_y_dir()      
    }


    //ball hits wall
    if (ball_array.rectangles[i].rectangle_collides_direction(0, canvas.width, "x")) {
      ball_array.rectangles[i].change_x_dir()      
    }


    // ball hits paddle
    if (ball_array.rectangles[i].rectangle_collides_direction( paddle_y1, paddle_y2, "y" ) ){
      
      // console.log("paddle")
      ball_array.rectangles[i].change_y_dir()      
      // create another ball
    }

  }



}

//relyes on the Rectangle class, paddle paramater ask for initialized class object of Rectangle class
function draw_paddle(canvas, paddle){
  paddle_info = paddle.get_rectangle()
  const paddle_x1 = paddle_info.xpos
  const paddle_x2 = paddle_info.xpos + paddle_info.width
  const paddle_direction = paddle_info.x_dir

  //Paddle hits wall
  if ( object_collides(paddle_x1, paddle_x2, 0, canvas.width) ){
    if (paddle_direction === 1 && paddle_x2 >= canvas.width){
      paddle.moving(0,0,0,0)
    }
    else if (paddle_direction === -1 && paddle_x1 <= 0){
      paddle.moving(0,0,0,0)
    }
  }
  paddle.draw()
}

//relyes on the Rectangle class, paramaters ask for initialized class objects of Rectangle class
function draw_squares( canvas,  squares, obstacle ){

  ctx = canvas.getContext("2d")
  

  object_info = obstacle.get_rectangle()
  const object_y1 = object_info.ypos
  const object_y2 = object_info.ypos + object_info.heigth
  const object_x1 = object_info.xpos
  const object_x2 = object_info.xpos + object_info.width

  for (let i = 0; i < squares.length; i++) {

    squares[i].draw();
    ball_position = squares[i].get_rectangle()

    const ball_x1 = ball_position.xpos
    const ball_x2 = ball_position.xpos + ball_position.width

    const ball_y1 = ball_position.ypos
    const ball_y2 = ball_position.ypos + ball_position.heigth

    //ball hits walls of canvas
    if( object_collides(ball_x1, ball_x2, 0, canvas.width)){
      squares[i].change_x_dir();
    }

    //ball hits roof or floor of canvas
    if( object_collides(ball_y1, ball_y2, 0, canvas.height)){
      squares[i].change_y_dir();
    }

    //ball hits object
    if( object_collides(ball_y1, ball_y2, object_y1, object_y1) && object_collides(object_x1, object_x2, ball_x1, ball_x2)){
      squares[i].change_y_dir();
      squares.push(new Rectangle(ctx, 5, 10, 6, 11, 255))
      squares[squares.length -1].moving(5,1,5,1)
      text_to_element(squares.length-1, get_score_elemenet)
    }

    //ball misses object
    if (ball_y1 >= object_y2){

      //TODO Idea, ball which makes you lose gets slowly larger and engulfes the screen, then it says "you lost"
      clearInterval(animation_id)
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      console.log("You lost")
      
      //setting i to squares.length stops the for loop
      i = squares.length
    }
  }

}

function text_to_element(text, element){
  element.innerHTML = text
}

//takes axis as arguments, if one of the axis of object 2 is between the two axis of object 1, returns true
function object_collides(object_1_lower, object_1_upper, object_2_lower, object_2_upper){
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