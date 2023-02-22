class Rectangle {
  constructor(ctx, x_position, width, y_postion, height, color) {
    this.x_position = x_position;
    this.width = width
    this.y_postion = y_postion;
    this.height = height
    this.color = color;
    this.ctx = ctx;

    this.x_velocity = 0
    this.x_direction = 0
    this.y_velocity = 0
    this.y_direction = 0
  }

  draw() {
    this.x_position += this.x_velocity * this.x_direction
    this.y_postion += this.y_velocity * this.y_direction
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x_position, this.y_postion, this.width, this.height);
  }

  move(x_velocity, x_direction, y_velocity, y_direction){
    this.x_velocity = x_velocity
    this.x_direction = x_direction
    this.y_velocity = y_velocity
    this.y_direction = y_direction
  }

  grow(growth_margin){
    this.y_postion -= growth_margin        
    this.x_position -= growth_margin        
    this.width += growth_margin * 2        
    this.height += growth_margin * 2        
  }

  rectangle_collides_direction(obstacle_lower, obstacle_upper, dir){

    let rectangle_lower, rectangle_upper

    if (dir.toLowerCase() === "x"){
      rectangle_lower = this.x_position
      rectangle_upper = this.x_position + this.width
    }
    else if (dir.toLowerCase() === "y"){
      rectangle_lower = this.y_postion
      rectangle_upper = this.y_postion + this.height
    }

    if( object_collides(rectangle_lower, rectangle_upper, obstacle_lower, obstacle_upper)){
      return true
    }
    return false
  }

  change_x_direction(){
    this.x_direction *= -1
  }
  change_y_direction(){
    this.y_direction *= -1
  }

  get_values(){
    //TODO: should return all values?
    const x_position = this.x_position
    const y_postion = this.y_postion
    const x_direction = this.x_direction
    const y_direction = this.y_direction
    const width = this.width
    const height = this.height
    return {x_position, y_postion, x_direction, y_direction, width, height}
  }
}

class Collection_rectangles {

  constructor(){
    this.rectangles = []
  }

  draw_colliding_rectangles(){
    this.rectangles.forEach( rectangle => rectangle.draw() )
  }
  remove_rectangle(rectangle_id){
    this.rectangles.splice(rectangle_id, 1)
  }

  add_rectangle(rectangle){
    this.rectangles.push(rectangle)
  }
  
  add_random_rectangle(random_factor){

    if (random_factor){
      this.random_factor = random_factor
    }

    const random_color = create_hsl_expression( random_integer_in_range(0,256) , 75 , 50 )

    const lower_range = this.random_factor
    const upper_range = this.random_factor * random_integer_in_range(1, 4)
    const random_x_speed = random_integer_in_range(lower_range, upper_range)
    const random_y_speed = random_integer_in_range(lower_range, upper_range)

    const random_size = random_integer_in_range(this.random_factor*3, this.random_factor*10)
    let random_direction_x = 1;
    if ( Math.random() <= 0.5 ) { random_direction_x = -1; }

    const rectangle = new Rectangle(ctx, canvas.width/2, random_size , 10, random_size, random_color)
    rectangle.move(random_x_speed,random_direction_x,random_y_speed,1)
    this.rectangles.push(rectangle)
  }

  add_random_factor(random_factor){
    this.random_factor = random_factor
  }

}


const play_button = document.getElementById("play_button")
const restart_button = document.getElementById("restart_button")
const get_score_elemenet = document.getElementById("score_placeholder");
const get_lives_elemenet = document.getElementById("lives_placeholder");

//TODO: store all variables in local storage

let paddle_move_id, animation_id 
var canvas, ctx

let ball_array = new Collection_rectangles()
let paddle



window.onload = winInit;
function winInit() {

  canvas = elGetId("canvas");
  ctx = canvas.getContext("2d");

  let paddle_speed

  play_button.addEventListener("click", function() {

    if (animation_id){ return }

    //TODO stuff like paddle and such must be made here? make another function bruv

    const lives = parseInt(document.getElementById("lives").value)
    const random_factor = parseInt(document.getElementById("randomness_factor").value)
    const canvas_width = parseInt(document.getElementById("canvas_width").value)
    const canvas_height = parseInt(document.getElementById("canvas_height").value)
    const paddle_width = parseInt(document.getElementById("paddle_width").value)
    paddle_speed = parseInt(document.getElementById("paddle_speed").value)


    ball_array.add_random_rectangle(random_factor)
    ball_array.add_random_factor(random_factor)
    const random_color = create_hsl_expression( random_integer_in_range(0,256) , 75 , 50 )
    paddle = new Rectangle(ctx, canvas.width/2 - 75, paddle_width, canvas.height* 0.9, 20, random_color)
    
    animation_id = setInterval( function () {
      draw_multipong_game(canvas, paddle, lives, ball_array)
    }, 1000 / 50);
  })

  restart_button.addEventListener("click", function(){

    clear_all_intervals()
    draw_background(canvas, "black")
    animation_id = null
    ball_array = new Collection_rectangles()
  })

  document.addEventListener("keydown", function(event){ rectangle_event_handler(event, paddle, paddle_speed) })
  document.addEventListener("keyup", function(event) { rectangle_event_handler(event, paddle, paddle_speed) })
}

//Creates balls, draws background and detects ball collision
function draw_multipong_game(canvas, paddle, lives, balls) {

  draw_background(canvas, "black")

  draw_rectangle(canvas, paddle)
  

  draw_colliding_rectangles(canvas, balls, paddle, lives)


  text_to_element(balls.rectangles.length - 1, get_score_elemenet)
  text_to_element(lives, get_lives_elemenet)
}

//TODO, more arguments, change name to rectangle, add x_speed, y_speed and 
//TODO: also event.key for up and down keys
function rectangle_event_handler(event, rectangle, speed){

  rectangle_info = rectangle.get_values()
  const rectangle_direction = rectangle_info.x_direction

  if (event.type === "keydown"){
    if (event.key === "ArrowLeft"){
      rectangle.move(speed, -1, 0, 0)
    }

    else if (event.key === "ArrowRight"){
      rectangle.move(speed, 1, 0, 0)
    }
  }

  if (event.type === "keyup") {
    if (event.key === "ArrowLeft" && rectangle_direction !== 1){
      rectangle.move(0, 0, 0, 0)
    }

    else if (event.key === "ArrowRight" && rectangle_direction !== -1){
      rectangle.move(0, 0, 0, 0)
    }
  }
}

//TODO: add ability to use mouse for movement, use already made functions for movement

//relyes on the Rectangle class, paddle paramater ask for initialized class object of Rectangle class
function draw_rectangle(canvas, rectangle){

  rectangle_info = rectangle.get_values()
  const rectangle_x1 = rectangle_info.x_position
  const rectangle_x2 = rectangle_info.x_position + rectangle_info.width
  const rectangle_direction = rectangle_info.x_direction

  if (rectangle_direction === 1 && rectangle_x2 >= canvas.width){
    rectangle.move(0,0,0,0)
  }
  else if (rectangle_direction === -1 && rectangle_x1 <= 0){
    rectangle.move(0,0,0,0)
  }
  rectangle.draw()
}

//TODO create a loop to check if obstacles get hit (incase of multiple obstacles, more general)
function draw_colliding_rectangles(canvas, rectangle_array, obstacle, lives){

  obstacle_info = obstacle.get_values()
  const obstacle_x1 = obstacle_info.x_position
  const obstacle_x2 = obstacle_info.x_position + obstacle_info.width
  
  //top of obstacle
  const obstacle_y2 = obstacle_info.y_postion

  rectangle_array.draw_colliding_rectangles()
  
  for (let i = 0; i < rectangle_array.rectangles.length; i++) {

    const rectangle_x1 =  rectangle_array.rectangles[i].x_position + rectangle_array.rectangles[i].width
    const rectangle_x2 =  rectangle_array.rectangles[i].x_position
    //bottom of rectangle
    const rectangle_y1 = rectangle_array.rectangles[i].height + rectangle_array.rectangles[i].y_postion

    //rectangle hits roof
    if (rectangle_array.rectangles[i].rectangle_collides_direction( 0, 0, "y" )){
      rectangle_array.rectangles[i].change_y_direction()      
    }

    //rectangle hits wall
    if (rectangle_array.rectangles[i].rectangle_collides_direction(0, canvas.width, "x")) {
      rectangle_array.rectangles[i].change_x_direction()      
    }

    // rectangle hits obstacle
    if ( rectangle_array.rectangles[i].rectangle_collides_direction( obstacle_y2, obstacle_y2, "y" ) && object_collides(obstacle_x1, obstacle_x2, rectangle_x1, rectangle_x2) ){
      //ensures rectangle does not get stuck in obstacle
      rectangle_array.rectangles[i].y_postion -= (rectangle_y1 - obstacle_y2)
      rectangle_array.rectangles[i].change_y_direction()      
      rectangle_array.add_random_rectangle()
    }

    //rectangle misses obstacle
    else if ( rectangle_array.rectangles[i].rectangle_collides_direction( canvas.height, canvas.height, "y" ) ) {

      lives -= 1

      if (lives === 0){
        clearInterval(animation_id)
        rectangle_array.rectangles[i].move(0, 0, 0, 0)
        const random_rectangle_id = random_integer_in_range(0, rectangle_array.rectangles.length)
        death_drawing_rectangle(ball_array.rectangles[random_rectangle_id])
      }
      rectangle_array.remove_rectangle(i)
      rectangle_array.add_random_rectangle()
    }
  }
}

function death_drawing_rectangle(rectangle){

  growth_number = 1.01
  const grow_ball_interval_id = setInterval( function() {

    growth_number *= 1.1
    rectangle.grow(growth_number)
    rectangle.draw()  
    if (rectangle.width > canvas.width*2.5 && rectangle.height > canvas.height* 2.5 ){
      
      clearInterval(grow_ball_interval_id)

      let i = 0
      setInterval( function() {

        i += 1
        const color = create_hsl_expression( i*3 , 75 , 50 )

        //TODO find a way to determine the distance between text, probably make a function:)
        
        const distance_text = largest_font_size(canvas, "You Are Dead!", "Monospace")
        const vertical_space = Math.ceil(canvas.height / distance_text)

        fill_largest_font_centered(canvas, "You Are Dead!", "monospace", distance_text*(i%vertical_space), color)
      }, 1000/50)
    }
  }, 1000/50)
}

//----------------------Generaler General Functions----------------------------------


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

function draw_background(canvas, color){
  ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function create_hsl_expression(hue, saturation, lightness){
  return `hsl( ${hue}, ${saturation}%, ${lightness}%)`
}

//TODO: when done here, add the general functions (and classes?) to library