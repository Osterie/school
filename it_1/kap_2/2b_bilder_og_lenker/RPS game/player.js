const stein = document.getElementById('stein');

const saks = document.getElementById('saks');

const papir = document.getElementById('papir');



// document.getElementById("winner_text").innerHTML  = 'hei'

stein.addEventListener('click', function onClick() {
    stein.style.backgroundColor = 'blue';
    saks.style.backgroundColor = 'white';
    papir.style.backgroundColor = 'white';

  });

saks.addEventListener('click', function onClick() {
    saks.style.backgroundColor = 'blue';
    stein.style.backgroundColor = 'white';
    papir.style.backgroundColor = 'white';


  });
  
papir.addEventListener('click', function onClick() {
    papir.style.backgroundColor = 'blue';
    saks.style.backgroundColor = 'white';
    stein.style.backgroundColor = 'white';



  });



    // winner_text = 'salmon';

