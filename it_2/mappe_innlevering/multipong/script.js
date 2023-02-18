class Rectangle {
  constructor(ctx, position_x, width, position_y, height, color) {
    this.position_x = position_x;
    this.width = width
    this.position_y = position_y;
    this.height = height
    this.color = color;
    this.ctx = ctx;

    this.x_change = 0
    this.x_dir = 0
    this.y_change = 0
    this.y_dir = 0
  }

  draw() {
    this.position_x += this.x_change * this.x_dir
    this.position_y += this.y_change * this.y_dir
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.position_x, this.position_y, this.width, this.height);
  }

  moving(x_change, x_dir, y_change, y_dir){
    this.x_change = x_change
    this.x_dir = x_dir
    this.y_change = y_change
    this.y_dir = y_dir
  }

  grow(growth_margin){
    this.position_y -= growth_margin        
    this.position_x -= growth_margin        
    this.width += growth_margin * 2        
    this.height += growth_margin * 2        
  }

  rectangle_collides_direction(obstacle_lower, obstacle_upper, dir){

    let rectangle_lower
    let rectangle_upper

    if (dir.toLowerCase() == "x"){
      rectangle_lower = this.position_x
      rectangle_upper = this.position_x + this.width
    }
    else if (dir.toLowerCase() == "y"){
      rectangle_lower = this.position_y
      rectangle_upper = this.position_y + this.height
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
    const position_x = this.position_x
    const position_y = this.position_y
    const x_dir = this.x_dir
    const y_dir = this.y_dir
    const width = this.width
    const height = this.height
    return {position_x, position_y, x_dir, y_dir, width, height}
  }
}

class Collection_rectangles {

  constructor(){
    this.rectangles = []
  }

  draw_rectangles(){
    this.rectangles.forEach( rectangle => rectangle.draw() )
  }

  add_rectangle(rectangle){
    this.rectangles.push(rectangle)
  }
}

const get_score_elemenet = document.getElementById("score");
let score = 0;

const runspeed = 50;
const ball_speed = 15;

let paddle_move_id, animation_id 
var canvas = elGetId("canvas"); // Hentes fra klassens kodebibliotek teamtools.js (document.getElmentById("canvas")
const ctx = canvas.getContext("2d"); // Objekt som inneholder tegneverktøyet i canvas

const ball_array = new Collection_rectangles()
let random_color = `hsl( ${random_integer_in_range(0, 256)}, ${75}%, ${50}%)`

const rectangle = new Rectangle(ctx, canvas.width/2, 10 , 6, 10, random_color)
rectangle.moving(ball_speed,1,ball_speed,1)
ball_array.add_rectangle(rectangle)

random_color = `hsl( ${random_integer_in_range(0, 256)}, ${75}%, ${50}%)`

const paddle_width = 100 
const paddle = new Rectangle(ctx, canvas.width/2 - 75, paddle_width, canvas.height - 60, 20, random_color)


window.onload = winInit;

function winInit() {

  document.addEventListener("keydown", function(event){
    paddle_handler(event)
  })
  document.addEventListener("keyup", function(event) {
    paddle_handler(event)
  })

  animation_id = setInterval(draw_game, 1000 / runspeed);
}


//Creates balls, draws background and detects ball collision
function draw_game() {
  //draw background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  draw_paddle(canvas, paddle)
  draw_squares()
  text_to_element(ball_array.rectangles.length - 1, get_score_elemenet)
}


function paddle_handler(event){

  paddle_info = paddle.get_rectangle()
  const paddle_direction = paddle_info.x_dir

  if (event.type === "keydown"){
    if (event.key === "ArrowLeft"){
      paddle.moving(14, -1, 0, 0)
    }

    else if (event.key === "ArrowRight"){
      paddle.moving(14, 1, 0, 0)
    }
  }

  if (event.type === "keyup") {
    if (event.key === "ArrowLeft" && paddle_direction !== 1){
      paddle.moving(0, 0, 0, 0)
    }

    else if (event.key === "ArrowRight" && paddle_direction !== -1){
      paddle.moving(0, 0, 0, 0)
    }
  }
}

//relyes on the Rectangle class, paddle paramater ask for initialized class object of Rectangle class
function draw_paddle(canvas, paddle){
  paddle_info = paddle.get_rectangle()
  const paddle_x1 = paddle_info.position_x
  const paddle_x2 = paddle_info.position_x + paddle_info.width
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

function draw_squares(){

  paddle_info = paddle.get_rectangle()
  const paddle_x1 = paddle_info.position_x
  const paddle_x2 = paddle_info.position_x + paddle_info.width
  //top of paddle
  const paddle_y2 = paddle_info.position_y

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

    const ball_x1 =  ball_array.rectangles[i].position_x + ball_array.rectangles[i].width
    const ball_x2 =  ball_array.rectangles[i].position_x
    //bottom of ball
    const ball_y1 = ball_array.rectangles[i].height + ball_array.rectangles[i].position_y

    // ball hits paddle
    if ( ball_array.rectangles[i].rectangle_collides_direction( paddle_y2, paddle_y2, "y" ) && object_collides(paddle_x1, paddle_x2, ball_x1, ball_x2) ){
      ball_array.rectangles[i].change_y_dir()      
      //ensures ball does not get stuck in paddle, if f.x middle of ball hits paddle, ball is moved ball_height/2 up from paddle
      ball_array.rectangles[i].position_y -= (ball_y1 - paddle_y2)

      const random_color = `hsl( ${random_integer_in_range(0, 256)}, ${75}%, ${50}%)`
      const random_x_speed = random_integer_in_range(1, 5)
      const random_y_speed = random_integer_in_range(1, 5)
      const random_size = random_integer_in_range(7, 37)
      let random_dir_x = 1;
      if ( Math.random() <= 0.5 ) { random_dir_x = -1; }

      const rectangle = new Rectangle(ctx, canvas.width/2, random_size , 10, random_size, random_color)
      rectangle.moving(random_x_speed,random_dir_x,random_y_speed,1)
      ball_array.add_rectangle(rectangle)
    }

    //ball misses paddle
    if ( ball_array.rectangles[i].rectangle_collides_direction( canvas.height, canvas.height, "y" ) ) {
      clearInterval(animation_id)
      ball_array.rectangles[i].moving(0, 0, 0, 0)
      
      const grow_ball_interval_id = setInterval( function() {

        ball_array.rectangles[i].grow(30)
        ball_array.rectangles[i].draw()  

        if (ball_array.rectangles[i].rectangle_collides_direction( 0, 0, "y" ) && ball_array.rectangles[i].rectangle_collides_direction( -canvas.width, canvas.width*2, "x" )){
          clearInterval(grow_ball_interval_id)

          fill_canvas_centered_text(canvas, "WWWWWWWWWWWWwwwwwwwwwwwwwwwwwwwww", canvas.height, "black")

        }
      }, 1000/50)
    }
  }
}

// console.log("á́́́́́́́́́́́́́́́́́́́́́́́́́́́́́")

function fill_canvas_centered_text(canvas, text, y_postion, color){

  const descenders = ["g", "j", "q", "p", "y"]
  
  const ctx = canvas.getContext("2d"); 
  const smallest_canvas_size = smallest(canvas.height, canvas.width)
  let font_size
  console.log({smallest_canvas_size})
  //1:2 ratio monospace font, hence these checks
  if (smallest_canvas_size === canvas.height){
    // font_size = Math.floor(smallest_canvas_size / text.length)
    font_size = canvas.height
  }
  console.log(text.length)
  if (font_size * text.length >= canvas.width){
    font_size = (canvas.width / text.length+2) * 2
  }

  // else if (smallest_canvas_size === canvas.width){
  //   font_size = Math.floor( (smallest_canvas_size / (text.length+1)) * 2 )
  // }

  console.log({font_size})
  console.log(text.length)
  console.log({smallest_canvas_size})
  ctx.fillStyle = color
  ctx.font = `${font_size}px monospace`;
  ctx.textAlign = "center";
  ctx.fillText(text, canvas.width/2, y_postion);
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

function random_integer_in_range(lower_limit, upper_limit){
  return Math.floor( (Math.random() * (upper_limit - lower_limit)) + lower_limit)
}

function largest(number_1, number_2){
  if (number_1 >= number_2){
    return number_1
  }
  return number_2
}

function smallest(number_1, number_2){
  if (number_1 <= number_2){
    return number_1
  }
  return number_2
}