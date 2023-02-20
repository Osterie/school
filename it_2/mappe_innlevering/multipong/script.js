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
  remove_rectangle(rectangle_id){
    this.rectangles.splice(rectangle_id, 1)
  }

  add_rectangle(rectangle){
    this.rectangles.push(rectangle)
  }
  //TODO random_factro must do something
  add_random_rectangle(random_factor){

    const random_color = `hsl( ${random_integer_in_range(0, 256)}, ${75}%, ${50}%)`

    const lower_range = random_factor
    const upper_range = random_factor * random_integer_in_range(1, 4)
    const random_x_speed = random_integer_in_range(lower_range, upper_range)
    const random_y_speed = random_integer_in_range(lower_range, upper_range)

    const random_size = random_integer_in_range(random_factor*3, random_factor*10)
    let random_dir_x = 1;
    if ( Math.random() <= 0.5 ) { random_dir_x = -1; }

    const rectangle = new Rectangle(ctx, canvas.width/2, random_size , 10, random_size, random_color)
    rectangle.moving(random_x_speed,random_dir_x,random_y_speed,1)
    this.rectangles.push(rectangle)
  }
}


const play_button = document.getElementById("play_button")
const restart_button = document.getElementById("restart_button")
const get_score_elemenet = document.getElementById("score_placeholder");
const get_lives_elemenet = document.getElementById("lives_placeholder");

let lives = parseInt(document.getElementById("lives").value)
let random_factor = parseFloat(document.getElementById("randomness_factor").value)
let canvas_width = parseInt(document.getElementById("canvas_width").value)
let paddle_width = parseInt(document.getElementById("paddle_width").value)
let canvas_height = parseInt(document.getElementById("canvas_height").value)
let paddle_speed = parseInt(document.getElementById("paddle_speed").value)



//TODO: store all variables in local storage

let paddle_move_id, animation_id 
var canvas, ctx

let ball_array = new Collection_rectangles()
let paddle



window.onload = winInit;
function winInit() {

  canvas = elGetId("canvas");
  ctx = canvas.getContext("2d");


  play_button.addEventListener("click", function() {

    if (animation_id){
      return  
    }

    //TODO stuff like paddle and such must be made here? make another function bruv
    lives = parseInt(document.getElementById("lives").value)
    random_factor = parseInt(document.getElementById("randomness_factor").value)
    canvas_width = parseInt(document.getElementById("canvas_width").value)
    paddle_width = parseInt(document.getElementById("paddle_width").value)
    canvas_height = parseInt(document.getElementById("canvas_height").value)
    paddle_speed = parseInt(document.getElementById("paddle_speed").value)



    ball_array.add_random_rectangle(random_factor)

    const random_color = `hsl( ${random_integer_in_range(0, 256)}, ${75}%, ${50}%)`
    paddle = new Rectangle(ctx, canvas.width/2 - 75, paddle_width, canvas.height - 60, 20, random_color)

    animation_id = setInterval(draw_game, 1000 / 50);
  })

  restart_button.addEventListener("click", function(){

    clear_all_intervals()
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    animation_id = null

    ball_array = new Collection_rectangles()
  })

  document.addEventListener("keydown", function(event){
    paddle_handler(event)
  })
  document.addEventListener("keyup", function(event) {
    paddle_handler(event)
  })
}




//Creates balls, draws background and detects ball collision
function draw_game() {
  //draw background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  draw_paddle(canvas, paddle)
  draw_squares()
  text_to_element(ball_array.rectangles.length - 1, get_score_elemenet)
  text_to_element(lives, get_lives_elemenet)
}

//TODO, more arguments, change name to rectangle, add x_speed, y_speed and 
//also event.key for up and down keys
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

  if (paddle_direction === 1 && paddle_x2 >= canvas.width){
    paddle.moving(0,0,0,0)
  }
  else if (paddle_direction === -1 && paddle_x1 <= 0){
    paddle.moving(0,0,0,0)
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

    const ball_x1 =  ball_array.rectangles[i].position_x + ball_array.rectangles[i].width
    const ball_x2 =  ball_array.rectangles[i].position_x
    //bottom of ball
    const ball_y1 = ball_array.rectangles[i].height + ball_array.rectangles[i].position_y


    //ball hits roof
    if (ball_array.rectangles[i].rectangle_collides_direction( 0, 0, "y" )){
      ball_array.rectangles[i].change_y_dir()      
    }

    //ball hits wall
    if (ball_array.rectangles[i].rectangle_collides_direction(0, canvas.width, "x")) {
      ball_array.rectangles[i].change_x_dir()      
    }


    // ball hits paddle
    if ( ball_array.rectangles[i].rectangle_collides_direction( paddle_y2, paddle_y2, "y" ) && object_collides(paddle_x1, paddle_x2, ball_x1, ball_x2) ){
      //ensures ball does not get stuck in paddle
      ball_array.rectangles[i].position_y -= (ball_y1 - paddle_y2)
      ball_array.rectangles[i].change_y_dir()      
      // get_score_elemenet.innerHTML = ball_array.rectangles.length - 1
      // get_lives_elemenet.innerHTML = lives

      ball_array.add_random_rectangle(random_factor)
    }

    //ball misses paddle
    if ( ball_array.rectangles[i].rectangle_collides_direction( canvas.height, canvas.height, "y" ) ) {

      lives -= 1

      if (lives === 0){
        clearInterval(animation_id)
        ball_array.rectangles[i].moving(0, 0, 0, 0)
        const random_rectangle_id = random_integer_in_range(0, ball_array.rectangles.length)
        death_drawing(random_rectangle_id)
      }
      ball_array.remove_rectangle(i)
      ball_array.add_random_rectangle(random_factor)
    }
  }
}

function death_drawing(rectangle_id){
  i = 1.01
  const grow_ball_interval_id = setInterval( function() {

    i *= 1.1
    ball_array.rectangles[rectangle_id].grow(i)
    ball_array.rectangles[rectangle_id].draw()  
    if (ball_array.rectangles[rectangle_id].width > canvas.width*2.5 && ball_array.rectangles[rectangle_id].height > canvas.height* 2.5 ){
      
      clearInterval(grow_ball_interval_id)

      let j = 0
      setInterval( function() {
        j += 1
        const color = `hsl( ${j*3}, ${75}%, ${50}%)`
        // largest_font_size(canvas, "You Are Dead", "monspace")
        fill_largest_font_centered(canvas, "You Are Dead!", "monospace", 50*(j%13), color)

      }, 1000/50)
    }
  }, 1000/50)
}


//----------------------General Functions----------------------------------

function fill_largest_font_centered(canvas, text, font, y_postion, color){
  
  const ctx = canvas.getContext("2d");
  let font_size = largest_font_size(canvas, text, font)
  const canvas_center_x = canvas.width / 2;
  
  ctx.font = `${font_size}px ${font}`;
  ctx.fillStyle = color
  ctx.textAlign = "center";
  ctx.fillText(text, canvas_center_x, y_postion);
}

function largest_font_size(canvas, text, font){

  const temp_canvas = document.createElement('canvas');
  temp_canvas.width = canvas.width;
  temp_canvas.height = canvas.height;
  const ctx = temp_canvas.getContext("2d");

  let font_size = smallest(canvas.height, canvas.width)

  ctx.font = `${font_size}px ${font}`;
  let text_metrics = ctx.measureText(text);

  while (text_metrics.width > canvas.width){
    font_size *= 0.9
    ctx.font = `${font_size}px ${font}`;
    text_metrics = ctx.measureText(text);
  }

  while (text_metrics.width + 1 < canvas.width){
    font_size += 1
    ctx.font = `${font_size}px ${font}`;
    text_metrics = ctx.measureText(text);
  }

  return font_size
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

function clear_all_intervals(){
  for (let i = 0; i < 100; i++) {
    window.clearInterval(i)    
  }
}