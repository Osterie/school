function fill_largest_font_centered(canvas, text, font, y_postion, color) {
  const ctx = canvas.getContext("2d");
  let font_size = largest_font_size(canvas, text, font);
  const canvas_center_x = canvas.width / 2;

  ctx.font = `${font_size}px ${font}`;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.fillText(text, canvas_center_x, y_postion);
}

function largest_font_size(canvas, text, font) {
  const temporary_canvas = document.createElement("canvas");
  const temporary_ctx = temporary_canvas.getContext("2d");
  temporary_canvas.width = canvas.width;
  temporary_canvas.height = canvas.height;

  let font_size = smallest(canvas.height, canvas.width);

  temporary_ctx.font = `${font_size}px ${font}`;
  let text_metrics = temporary_ctx.measureText(text);

  //algorithm to quickly find the largest possible font size
  while (text_metrics.width > canvas.width) {
    font_size *= 0.9;
    temporary_ctx.font = `${font_size}px ${font}`;
    text_metrics = temporary_ctx.measureText(text);
  }
  while (text_metrics.width + 1 < canvas.width) {
    font_size += 1;
    temporary_ctx.font = `${font_size}px ${font}`;
    text_metrics = temporary_ctx.measureText(text);
  }
  return font_size;
}

function text_to_element(text, element) {
  element.innerHTML = text;
}

//takes axis as arguments, if one of the axis of object 2 is between the two axis of object 1, returns true
function object_collides(
  object_1_lower,
  object_1_upper,
  object_2_lower,
  object_2_upper
) {
  // object 2 lower value axis is between object 1 lower value of axis and object 1 upper value of axis
  if (is_between_or_equal(object_2_lower, object_1_lower, object_1_upper)) {
    return true;
  }
  // object 2 upper value axis is between object 1 lower value of axis and object 1 upper value of axis
  else if (
    is_between_or_equal(object_2_upper, object_1_lower, object_1_upper)
  ) {
    return true;
  }
  return false;
}

function is_between_or_equal(value_1, value_2, value_3) {
  const value_array = sort_numerically([value_1, value_2, value_3]);
  if (value_array[1] === value_1) {
    return true;
  }
  return false;
}

function sort_numerically(array) {
  array.sort(function (a, b) {
    return a - b;
  });
  return array;
}

function random_integer_in_range(lower_limit, upper_limit) {
  return Math.floor(Math.random() * (upper_limit - lower_limit) + lower_limit);
}

function largest(number_1, number_2) {
  if (number_1 >= number_2) {
    return number_1;
  }
  return number_2;
}

function smallest(number_1, number_2) {
  if (number_1 <= number_2) {
    return number_1;
  }
  return number_2;
}

function clear_all_intervals() {
  for (let i = 0; i < 100; i++) {
    window.clearInterval(i);
  }
}

function draw_background(canvas, color) {
  ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function create_hsl_expression(hue, saturation, lightness) {
  return `hsl( ${hue}, ${saturation}%, ${lightness}%)`;
}

function get_cursor_position(event) {
  //returns cursor position as an array
  return [event.offsetX, event.offsetY];
}
