
    function drawPoint(context, x, y, label, color, size) {
        if (color == null) {
          color = '#000';
      }
      if (size == null) {
          size = 5;
      }
    
        // to increase smoothing for numbers with decimal part
        var pointX = Math.round(x);
      var pointY = Math.round(y);

      context.beginPath();
      context.fillStyle = color;
      context.arc(pointX, pointY, size, 0 * Math.PI, 2 * Math.PI);
      context.fill();
    
        if (label) {
          var textX = pointX;
            var textY = Math.round(pointY - size - 3);
        
          context.font = 'Italic 14px Arial';
          context.fillStyle = color;
          context.textAlign = 'center';
          context.fillText(label, textX, textY);
      }
  }

  
  // Usage example:

  var canvas = document.querySelector('#my-canvas');
  var context = canvas.getContext('2d');

//---------------------------------INFINITY SYMBOL-------------------------------
function func_inf_neg(x){
  
  y = (-0.5)*(Math.sqrt(2))*(Math.sqrt(-2*x**2 + Math.sqrt(8*x**2 + 1) - 1));

  return y;
}

function func_inf_pos(x){

  y = (0.5)*(Math.sqrt(2))*(Math.sqrt(-2*x**2 + Math.sqrt(8*x**2 + 1) - 1));
  
  position = [x,y];
  return position;
}


//---------------------------------EIGHT-------------------------------

function func_eit_neg_in(x){
  
  y = (-0.5)*(Math.sqrt(2))*(Math.sqrt(-2*x**2 - Math.sqrt((-8)*x**2 + 1) + 1));

  return y;

}

function func_eit_neg_out(x){
  
  y = (-0.5)*(Math.sqrt(2))*(Math.sqrt(-2*x**2 + Math.sqrt((-8)*x**2 + 1) + 1));

  return y;

}

function func_eit_pos_inn(x){
  
  y = (0.5)*(Math.sqrt(2))*(Math.sqrt(-2*x**2 - Math.sqrt((-8)*x**2 + 1) + 1));

  return ;

}

function func_eit_pos_out(x){
  
  y = (0.5)*(Math.sqrt(2))*(Math.sqrt(-2*x**2 + Math.sqrt((-8)*x**2 + 1) + 1));

  return y;

}

//             1       2         3          4       5        6          7         8
var cords = [ 0,1  ,  0,1  ,    0,1    ,   1,0  ,  1,0  ,   1,0   ,    1,0  ,    0,1  ] //Om x eller y kommer først
var range = [ -1,0  ,  0,1  ,    -1,0   ,  0,1  ,  -1,0 ,   0,1   ,   -1,0  ,   0,1  ] //Loop range
var color = ['red' , 'orange', 'yellow', 'green', 'blue' , 'indigo', 'violet', 'black'] //Farge
var sign_l =  [ 1   ,    1  ,     -1    ,   -1   ,    1  ,     -1  ,     1   ,     -1   ] //Fortegn
var sign_r =  [ -1   ,    1  ,     -1    ,   1   ,    -1  ,     -1  ,    1   ,     1   ] //Fortegn


for (let k = 0; k < 8; k++){



  for (let i = range[k*2] ; i<= range[k*2+1] ; i+= 0.001){

  x = sign_l[k] * func_inf_pos(i)[cords[k*2]]  *100
  y = sign_r[k] * func_inf_pos(i)[cords[k*2+1]]*100 
  drawPoint(context,  250 + x  ,  250 + y, '', color[k], 3);

  }
}