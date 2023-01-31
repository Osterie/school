const gun = document.getElementById("gun");

const barrel = document.getElementById("barrel");

const laser = document.getElementById("laser");

const bullet = document.getElementById("bullet");

const links = document.querySelectorAll("a");

var laser_end = laser.getBoundingClientRect();
var laser_end_y;
var laser_end_x;

var barrel_end = barrel.getBoundingClientRect();
var barrel_end_y;
var barrel_end_x;

document.addEventListener("mousemove", (event) => {
  var mouse_x = event.clientX;
  var mouse_y = event.clientY;

  var x_vector = [1, 0];
  var y_vector = [0, 1];
  var mid_to_mouse_vector = [
    mouse_x - window.innerWidth / 2,
    window.innerHeight / 2 - mouse_y,
  ];

  var laser_end = laser.getBoundingClientRect();
  var recoil_hit = document.getElementById("recoil_target").getBoundingClientRect();
  var gun_dimentions = gun.getBoundingClientRect();

  if (v2a(x_vector, mid_to_mouse_vector) <= 90) {
    sum_degrees = v2a(y_vector, mid_to_mouse_vector);
    laser_end_y = laser_end.y;
    laser_end_x = laser_end.x;

    barrel_end_y = recoil_hit.height;
    barrel_end_x = recoil_hit.width;

    if (v2a(y_vector, mid_to_mouse_vector) <= 90) {
      laser_end_y = laser_end.y + laser_end.height;
      laser_end_x = laser_end.x;

      barrel_end_y =
        recoil_hit.y + recoil_hit.height - gun_dimentions.height / 2;
      barrel_end_x = recoil_hit.x - gun_dimentions.width / 2;
    }
  } 
  else if (v2a(y_vector, mid_to_mouse_vector) <= 90) {
    sum_degrees = -v2a(x_vector, mid_to_mouse_vector) + 90;
    laser_end_y = laser_end.height + laser_end.y;
    laser_end_x = laser_end.width + laser_end.x;

    barrel_end_y = recoil_hit.y + recoil_hit.height - gun_dimentions.height / 2;
    barrel_end_x = recoil_hit.x + recoil_hit.width - gun_dimentions.width / 2;
  } 
  else {
    sum_degrees = v2a(x_vector, mid_to_mouse_vector) + 90;
    laser_end_y = laser_end.y;
    laser_end_x = laser_end.x + laser_end.width;

    barrel_end_y = recoil_hit.y - gun_dimentions.height / 2;
    barrel_end_x = recoil_hit.x + recoil_hit.width - gun_dimentions.width / 2;
  }

  bullet.style.transform = "rotate(" + sum_degrees + "deg) ";
  gun.style.transform = "rotate(" + sum_degrees + "deg) ";
});

// Vectors to angle
function v2a(vector1, vector2) {
  vector1_length = Math.sqrt(vector1[0] ** 2 + vector1[1] ** 2);
  vector2_length = Math.sqrt(vector2[0] ** 2 + vector2[1] ** 2);
  vector_product = vector1[0] * vector2[0] + vector1[1] * vector2[1];

  var angle =
    (Math.acos(vector_product / (vector1_length * vector2_length)) * 180) /
    Math.PI;
  return angle;
}

function elementsOverlap(el1, el2) {
  const domRect1 = el1.getBoundingClientRect();
  const domRect2 = el2.getBoundingClientRect();
  return !(
    domRect1.top >= domRect2.bottom ||
    domRect1.right <= domRect2.left ||
    domRect1.bottom <= domRect2.top ||
    domRect1.left >= domRect2.right
  );
}

document.addEventListener("click", (event) => {
  document.getElementById("test").style.left = laser_end_x + "px";
  document.getElementById("test").style.top = laser_end_y + "px";

  document.documentElement.style.setProperty(
    "--bullet-end-x",
    laser_end_x + "px"
  );
  document.documentElement.style.setProperty(
    "--bullet-end-y",
    laser_end_y + "px"
  );

  bullet.style.animationName = "bullet_travel";

  setTimeout(() => {
    bullet.style.animationName = "none";
  }, 1000);
  setTimeout(() => {
    gun.style.animationName = "none";
  }, 1000);
});

laser.style.backgroundColor = "transparent";
var link_name;
bullet.addEventListener("animationstart", (event) => {
  let link_counter = 0;

  let count = 0;

  // function creation
  let interval = setInterval(function () {
    // increasing the count by 1
    count += 1;

    // when count equals to 5, stop the function
    if (count === 100) {
      clearInterval(interval);
    }

    links.forEach((link) => {
      if (elementsOverlap(document.getElementById(link.id), bullet)) {
        bullet.style.display = "none";
        if (link.innerHTML != '<img src="./images/explosion.gif" alt="">') {
          link_name = link.innerHTML;
        }
        document.getElementById(link.id).innerHTML =
          '<img src="./images/explosion.gif" alt="">';

        if (link.id == "link2") {
          if (laser.style.backgroundColor == "red" && link_counter == 0) {
            link_counter += 1;
            laser.style.backgroundColor = "transparent";
          } else if (
            laser.style.backgroundColor == "transparent" &&
            link_counter == 0
          ) {
            link_counter += 1;
            laser.style.backgroundColor = "red";
          }
        }
        setTimeout(() => {
          bullet.style.display = "block";
          if (link.id != "link2") {
            location.href = ("../" + link_name + '/index.html') /* ("../" + link_name + "/", "_self"); */ 
          }

          document.getElementById(link.id).innerHTML = link_name;
        }, 1000);
      }
    });
  }, 1);
  link_counter = 0;
});
