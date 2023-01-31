var canvas,ctx;

window.onload = winInit;  

function winInit()
{
    canvas = elGetId("canvas");                 // Hentes fra klassens kodebibliotek teamtools.js (document.getElmentById("canvas")
	ctx    = canvas.getContext("2d"); 			// Objekt som inneholder tegneverktøyet i canvas
	tegnBrukCanvas("canvas"); // Kobler canvas i html sammen med tegnepakka. Viktig ved lokal koding
	
	animasjon()
	elGetId("startAnim").onclick = startAnim
	elGetId("stopAnim").onclick = stopAnim

	elGetId("viskut").onclick     = viskUt;     // Oppsett av hendelse ved klikk på viskut-knapp
}

function viskUt()
{
	bgcol = elGetId("bakgrunn").value; // Henter verdien i feltet med id='bakgrunn'
	tegnBrukBakgrunn(bgcol);
	clearprint(); 
}

//------------------------------------|BEAM|----------------------------------------------------------------------------

var Beam_L = 7.0 ; var Beam_A = 90 ; var Beam_V = 0.99; // Beam lengde: Startvinkel til beam, Radarfart, maks 0.99
var xb = Beam_L  ; var yb = 0      ;                    //XBeam posisjon , YBeam posisjon           

//------------------------------------|META|----------------------------------------------------------------------------

var mappe = 'https://fulab.no/skolemappe/demo/media/';
var animId ='';     // Variabel for animasjonen
var runspeed = 70;  //fps

//------------------------------------|ENEMY_RECONNAISSANCE|------------------------------------------------------------

var x_vektor = [5,  0];   //Vektor som går langs x-aksen, brukes til å finne posisjonen til fienden
var y_vektor = [0,  5];   //Vektor som går langs y-aksen, brukes til å finne posisjonen til fienden
var enemyV   = [];        //Vektor som brukes til å finne fienden

//------------------------------------|ENEMY_SPOTTED|-------------------------------------------------------------------

var fading  = 0.15;          //enemy_spotted, Farten fienden forsvinner med på radaren
var enemy_opacity = [];      //enemy_spotted, Angir hvor mange fiender som er på radaren og opacityen deres
var remember_enemy_pos = []; //enemy_spotted, Husker hvor fiendene er på radaren for å ha flere prikker om gangen på radaren
var create_enemy = true;     //Kun for startup, skaper en fiende

//------------------------------------|LEMINSCATE_FUNCTION|-------------------------------------------------------------

var signature_color = 0;     //Endrer fargen på signature()
var LEM_loop = 0;            //Fungerer som en løkke, hver gang et bilde av animasjonen vises øker verdien med LEM_step_len, helt til 1. (til 1 også ned til 0 igjen)
var LEM_step_len = 0.0033;   //Step lengde for LEM_loop
var function_changer = 0;    //Endrer på funksjonen som tegner Lemniscate kurvene, bruker listene under som informasjon til hvilken funksjon som skal brukes til å finne verdier

//                     1        2           3         4         5         6          7         8
var cords       =  [  0,1  ,   0,1    ,    0,1   ,   1,0   ,   1,0  ,    1,0   ,    1,0   ,   0,1  ]; //Om x eller y kommer først
var range       =  [ -1,0  ,   0,1    ,   -1,0   ,   0,1   ,  -1,0  ,    0,1   ,   -1,0   ,   0,1  ]; //Loop range
var color_sign  =  [ 'red' , 'orange' , 'yellow' , 'green' , 'blue' , 'indigo' , 'violet' , 'black']; //Farge
var sign_x      =  [   1   ,    1     ,    -1    ,   -1    ,    1   ,    -1    ,     1    ,   -1   ]; //Fortegn til x
var sign_y      =  [   1   ,   -1     ,     1    ,   -1    ,    1   ,     1    ,    -1    ,   -1   ]; //Fortegn til y

var LEMx = '';  //Lemniscate curve x posisjon
var LEMy = '';  //Lemniscate curve y posisjon

var LEMxBL = '';
var LEMyBL = '';

var trail_meteor = [];
var trail2 = [];

var trailYY  = [];
var trail2BL = [];

var LEMx = LEM_pos()[0];
var LEMy = LEM_pos()[1];

//------------------------------------|ANIMATION|-----------------------------------------------------------------------
//------------------------------------|RADAR|---------------------------------------------------------------------------

function visBeam()
{ //Grønne Trekantformen som skytes ut fra midten, scanner


    xb =  Beam_L*cosD(Beam_A);
    yb =  Beam_L*sinD(Beam_A);

    xb1 = (Beam_L*1.42)*cosD(Beam_A-10.5);
    yb1 = (Beam_L*1.42)*sinD(Beam_A-10.5);
    
    xb2 = (Beam_L*1.42)*cosD(Beam_A+10.5);
    yb2 = (Beam_L*1.42)*sinD(Beam_A+10.5);
    
    xb3 = (Beam_L*1.42)*cosD(Beam_A+15.5);
    yb3 = (Beam_L*1.42)*sinD(Beam_A+15.5);
    
   
    pv  = [xb , yb  ];
    pv1 = [xb1, yb1 ];
    pv2 = [xb2, yb2 ];
    vector_foremost = [xb3, yb3];   //Fremste vektoren på den grænne beamen
    
    
    xliste1 = [0, xb1, xb*1.44, xb2 ];
    yliste1 = [0, yb1, yb*1.44, yb2 ];
    
    xliste2 = [0, xb2, xb3 ];
    yliste2 = [0, yb2, yb3 ];
    
    
    tegnFyltPolygon(xliste1 , yliste1 , 'rgb(82 , 173, 58, 1');    //Tegner beam
    tegnFyltPolygon(xliste2 , yliste2 , 'rgb(110, 237, 74, 1');   //Tegner også beam
    
    Beam_A = Beam_A + Beam_V;
}


function visRadar()
{ // Lager det lyse grønne og den hvite sirkelen som har sentrum i 0,0
    
    for(let i = 1; i < 6; i++)
    {
        
        color = 'rgb(110, 237, 74)'; //tynne lysegrønne sirkler
        
        for(let function_changer = 0; function_changer < 0.05; function_changer+= 0.02)
        {
            
            if (i==5)
            {
                color = 'rgb(255, 255, 255)'; //hvit sirkel ytterst
            }
            
            tegnSirkel(0 , 0 , i*2+function_changer , color , false); // tynne sirkler
        }
    }
}

//------------------------------------|ENEMY|----------------------------------------------------------------------------

function enemy()
{
    var radar_vinkel1 = Math.round(v2dVinkel(x_vektor, vector_foremost));
    var enemy_vinkel1 = Math.round(v2dVinkel(x_vektor, enemyV));
    
    var radar_vinkel2 = Math.round(v2dVinkel(y_vektor, vector_foremost));
    var enemy_vinkel2 = Math.round(v2dVinkel(y_vektor, enemyV));
    

    if(radar_vinkel1 == enemy_vinkel1 && radar_vinkel2 == enemy_vinkel2 || create_enemy == true )
    { //Kjører først en gang, uansett hva, og deretter lager kun ny fiende etter nåværende er funnet
        
        position = [];
        
        //Sirkelligningen konsepter brukt:), x^2 + y^2 = 10^2
        var x = (Math.random() *  90);    //x blir tall mellom 0 og 90
        var y = (Math.random() * (90-x)); // y blir et tall mellom 0 og 90-x
        
        x = Math.sqrt(x) * (Math.round(Math.random()) ? 1 : -1); //Random tall mellom 0 og 1 blir rundet av til 1 eller 0, om 1 blir blir x/y positivt, eller negativt
        y = Math.sqrt(y) * (Math.round(Math.random()) ? 1 : -1); //Samme greia, avgjør om y blir + eller -
        
        position.push(x);
        position.push(y);
        
        enemyV = [position[0], position[1]];
        
        create_enemy = false;
    }
}

function enemy_spotted()
{  
    var radar_vinkel1 = Math.round(v2dVinkel(x_vektor, vector_foremost));
    var enemy_vinkel1 = Math.round(v2dVinkel(x_vektor, enemyV));
    
    var radar_vinkel2 = Math.round(v2dVinkel(y_vektor, vector_foremost));
    var enemy_vinkel2 = Math.round(v2dVinkel(y_vektor, enemyV));
    
    if(radar_vinkel1 == enemy_vinkel1 && radar_vinkel2 == enemy_vinkel2)
    { 
        enemy_opacity.push(0); //Startopacity til fiende
        remember_enemy_pos.push(position[0], position[1]);
    }
    
    for (let i = 0; i < enemy_opacity.length; i++)
    {    
        if(enemy_opacity[i] < 50) 
        {
            opacity = (50-enemy_opacity[i])/(50);
            
            tegnFyltSirkel(remember_enemy_pos[(i*2)] , remember_enemy_pos[(i*2)+1] , 15 , 'hsl(99, 100%, 51%,' + opacity + ')', true);
            
            enemy_opacity[i] = enemy_opacity[i] + fading;
        }
        
        else if(enemy_opacity[0] >= 50)
        {
             enemy_opacity.shift();
             remember_enemy_pos.shift();
             remember_enemy_pos.shift();
        }
    }
}

//------------------------------------|LEMNISCATE_FUNCTION|-----------------------------------------------------------

function LEM_func_cords(LEM_x)
{ //Bruker konsepter fra Lemniscate curve'en

    var LEM_y = (0.5)* ( Math.sqrt(2) ) * ( Math.sqrt (-2*pow(LEM_x,2) + Math.sqrt(8*pow(LEM_x,2) + 1) - 1) );
    
    Lemniscate_position = [LEM_x, LEM_y];

    return Lemniscate_position;
}


function LEM_pos()
{ // Gir  kordinater på en dobbel Lemniscate kurve som brukes til å lage dobbel 8 symbolene i hjørnene.
    LEM_loop = LEM_loop + LEM_step_len;
    
    if (LEM_loop >= 1)
    {
        LEM_loop = 0;
        function_changer = function_changer + 1;
    }
    
    if (function_changer==8)
    {
        function_changer = 0;
    }
    
    var newLEMx = sign_x[function_changer] * ( LEM_func_cords( range[function_changer*2]  +   LEM_loop )[cords[function_changer*2]] )  *2;
    var newLEMy = sign_y[function_changer] * ( LEM_func_cords( range[function_changer*2]  +   LEM_loop )[cords[function_changer*2+1]]) *2;
    
    list = [newLEMx, newLEMy];
    
    return list
}

//------------------------------------|LEMNISCATE_COOLSTUFFS|-----------------------------------------------------------

class Corners{ //RENAME TO SOMETHING LEMNISCATE
    
    constructor(){}
    
    tegn(repetition, x, y, size, color, cloning)
    {
        this.x = x
        this.y = y
        
        for (let i = 0; i < repetition; i++)
        {
            if (cloning == true) 
            {
                this.LEMx2 = sign_x[function_changer] * ( LEM_func_cords( range[function_changer*2]  +   LEM_loop - (i/10))[cords[function_changer*2]] )  *2;
                this.LEMy2 = sign_y[function_changer] * ( LEM_func_cords( range[function_changer*2]  +   LEM_loop - (i/10))[cords[function_changer*2+1]]) *2;
                
                tegnFyltSirkel( this.LEMx2 +9 , this.LEMy2 + 10 , size, color, true);              
            }
            
            else
            {    
                tegnFyltSirkel(x, y , size, color , true); 
            }
        }
    }
        
    trail(len)
    {
        this.len = len
        if (trail_meteor.length <= 0)
        {
            trail_meteor = [] 
        }
        
        trail_meteor.push(this.x, this.y); //Coolifier

        for (let i = 0; i < trail_meteor.length; i++)
        {
            tegnFyltSirkel( trail_meteor[trail_meteor.length-2] + 9 , trail_meteor[trail_meteor.length-1] - 10 , 0+(i/50) , 'rgb(86 , 71 , 66 )' , true);
            tegnFyltSirkel( trail_meteor[i*2+20]                + 9 , trail_meteor[i*2+1+20]              - 10 , 0+(i/12) , 'hsl(65 , 99%, 51%)' , true);  
            tegnFyltSirkel( trail_meteor[i*2+50]                + 9 , trail_meteor[i*2+1+50]              - 10 , 0+(i/6 ) , 'rgb(255, 165, 0  )' , true); 
            tegnFyltSirkel( trail_meteor[i*2]                   + 9 , trail_meteor[i*2+1]                 - 10 , 0+(i/20) , 'rgb(255, 0  , 0  )' , true);
        }
    
        if(trail_meteor.length > this.len)
        {
            trail_meteor.shift();
            trail_meteor.shift();
        }    
    }
}

var signature_black = new Corners();
var signature_colored = new Corners();

var deceptive_main = new Corners();
var deceptive_trail = new Corners();

var meteor2 = new Corners();


function meteor()
{  //Bottom right    
    trail_meteor.push(LEMx, LEMy); //Coolifier
    
    for (let i = 0; i < trail_meteor.length; i++)
    {
        tegnFyltSirkel( trail_meteor[trail_meteor.length-2] + 9 , trail_meteor[trail_meteor.length-1] - 10 , 0+(i/50) , 'rgb(86 , 71 , 66 )' , true);
        tegnFyltSirkel( trail_meteor[i*2+20]                + 9 , trail_meteor[i*2+1+20]              - 10 , 0+(i/12) , 'hsl(65 , 99%, 51%)' , true);  
        tegnFyltSirkel( trail_meteor[i*2+50]                + 9 , trail_meteor[i*2+1+50]              - 10 , 0+(i/6 ) , 'rgb(255, 165, 0  )' , true); 
        tegnFyltSirkel( trail_meteor[i*2]                   + 9 , trail_meteor[i*2+1]                 - 10 , 0+(i/20) , 'rgb(255, 0  , 0  )' , true);
    }

    if(trail_meteor.length > 220)
    {
        trail_meteor.shift();
        trail_meteor.shift();
    }    
}

function YinYang()
{ //Bottom left
    trailYY.push(LEMx, LEMy);

    for (let i = 0; i < trail_meteor.length; i++)
    {
        //Yin
        tegnFyltSirkel( trailYY[i*2]   - 9  , trailYY[i*2+1] - 10 , 0+(i/10) , 'rgb(0  , 0  , 0  )' , true);
        tegnFyltSirkel( trailYY[i*2]   - 9  , trailYY[i*2+1] - 10 , 0+(i/30) , 'rgb(255, 255, 255)' , true);
        
        //Yang
        tegnFyltSirkel( trailYY[i*2+1] - 9  , trailYY[i*2]   - 10 , 0+(i/10) , 'rgb(255, 255, 255)' , true);
        tegnFyltSirkel( trailYY[i*2+1] - 9  , trailYY[i*2]   - 10 , 0+(i/30) , 'rgb(0  , 0  , 0  )' , true);
    }
    
    if(trailYY.length > 220)
    {
        trailYY.shift();
        trailYY.shift();
    }
}

//------------------------------------|META_FUNCTIONS|-------------------------------------------------------------------

function animasjon()
{ // Tegner ETT bilde i animasjonen
    tegnBrukBakgrunn('rgb(180, 223, 229'); //Bagrunn samme blå som fulab
    
    tegnFyltSirkel(0 , 0 , 280 , 'rgb(47, 72, 89, 1)' , true);  //Blå ytterkant på radaren
    tegnFyltSirkel(0 , 0 , 247 , 'rgb(41, 76, 34, 1)' , true);  //Grønne bakgrunnen til radaren
    
    visBeam();
    tegnBildeFraFil(mappe+'sol1.png'  , 0,0 , 0.03, 0.03);  //Solen i sentrum 
    visRadar();
    
    enemy_spotted();
    enemy();
    LEM_pos();
    // signature(); //Top left
    // deceptive(); //Top right 
    meteor();    //Bottom right
    YinYang();   //Bottom left
    
    signature_black.tegn(1, (LEMx*0.9) - 9, (LEMy*0.9) + 10, 2,  "black", false);
    
    signature_colored.tegn(1, LEMx - 9 , LEMy + 10 , 3, 'hsl(' + signature_color + ', 100%, 55%)', false);
    
    signature_color = signature_color + 1; 
    
    if (signature_color >= 361)
    {
        signature_color = 0;
    }
    
    deceptive_trail.tegn(10 , LEMx + 9 , LEMy + 10 , 2 , 'black' , true);
    deceptive_main.tegn (1  , LEMx + 9 , LEMy + 10 , 3 , color_sign[function_changer] , true); 
        
    LEMx = LEM_pos()[0]; //Brukes i hjørne animasjonene
    LEMy = LEM_pos()[1]; //Brukes i hjørne animasjonene
}

function startAnim()
{
    if ((animId))
    {
        clearInterval(animId);
    }
    animId = setInterval(animasjon , 1000/runspeed);
}

function stopAnim()
{   
    clearInterval(animId);   
}