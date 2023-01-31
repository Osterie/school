// -----------------------------GETTING ELEMENTS------------------------

const winner_text =  document.getElementById("winner_text");

winner_text.addEventListener('click', function onClick()
{
    winner_text.innerHTML = 'Dont Click Me...';
});

const rock = document.getElementById('rock');

const scissors = document.getElementById('scissors');

const paper = document.getElementById('paper');

const rock_op = document.getElementById('rock_op');

const scissors_op = document.getElementById('scissors_op');

const paper_op = document.getElementById('paper_op');

const score_raw = document.getElementById("rps_scoreboard"); //Gives raw score data which gets processed and returned

const streak = document.getElementsByClassName("rps_streak"); //Streak shows how many times in a row a opponents hand repeats

let score_list = score_raw.innerHTML.split(":"); //Splits the score into ["index 0: player score", "index 1: opponent score"]
                                                 //When player wins the value the element in index 0 (player score) increases by 1, opponent same but for index 1 

//-----------------------------PLAYER CLICKING HAND-------------------------------

//Changes color of button/image the player clicks (player side)
rock.addEventListener('click', function onClick() 
{
    rock.style.backgroundColor = 'blue';
    scissors.style.backgroundColor = '#dadff1';
    paper.style.backgroundColor = '#dadff1';
});

paper.addEventListener('click', function onClick() 
{
    paper.style.backgroundColor = 'blue';
    scissors.style.backgroundColor = '#dadff1';
    rock.style.backgroundColor = '#dadff1';
});

scissors.addEventListener('click', function onClick() 
{
    scissors.style.backgroundColor = 'blue';
    rock.style.backgroundColor = '#dadff1';
    paper.style.backgroundColor = '#dadff1';
});



//-------------------------PLAY BUTTON CLICKED-----------------------------

var player;
var opponent;

function play()
{
    //Defines player_num as not a number until given a value    
    var player_num = NaN

    //Creates Opponents Hand, random number
    var opponent_num = (Math.floor (Math.random() * 3));
    
    // changes opponents button color based on random number, but only
    // if player is defined, i.e if player has chosen a hand
    if (opponent_num == 0 && player != undefined)
    {    
        opponent = 'rock'
           
        rock_op.style.backgroundColor = 'red';
        scissors_op.style.backgroundColor = '#dadff1';
        paper_op.style.backgroundColor = '#dadff1';

        //Rock streak increases, other streak stops
        streak[0].innerHTML += 'o' 
        streak[1].innerHTML = '' 
        streak[2].innerHTML = '' 
    }

    else if (opponent_num == 2 && player != undefined)
    {
        opponent = 'paper'

        rock_op.style.backgroundColor = '#dadff1';
        scissors_op.style.backgroundColor = '#dadff1';
        paper_op.style.backgroundColor = 'red';

        //Paper streak increases, other streak stops
        streak[0].innerHTML = '' 
        streak[1].innerHTML += 'o' 
        streak[2].innerHTML = '' 
    }

    else if (opponent_num == 1 && player != undefined)
    {
        opponent = 'scissors'

        rock_op.style.backgroundColor = '#dadff1';
        scissors_op.style.backgroundColor = 'red';
        paper_op.style.backgroundColor = '#dadff1';

        //Scissors streak increases, other streak stops
        streak[0].innerHTML = '' 
        streak[1].innerHTML = '' 
        streak[2].innerHTML += 'o' 
    }

    //Basically just changes players hand id to a number.
    //When player chooses a hand it returns either "rock", "scissors" or "paper" to this script,
    //Which is changed to a number, for easier interpretation. 
    if (player == 'rock')
    {
        player_num = 0;
    }
    
    else if (player == 'scissors')
    {
        player_num = 1;
    }
    
    else if (player == 'paper')
    {
        player_num = 2;
    }

    //These conditionals tell who the winner is.
    if (player_num == opponent_num+1 || player_num == opponent_num-2 )
    {
        score_list[1] = parseInt(score_list[1]) + 1; // Increases opponents score by 1
        winner_text.innerHTML = 'You Lose!';         // Alternative text: 'Player lost ' +  'Player ' + player + ' Opponent: ' + opponent
    }

    else if (player_num == opponent_num)
    {
        winner_text.innerHTML = 'Draw!';            // Alternative text:  'draw ' +  'Player ' + player + ' Opponent: ' + opponent
    }

    else if (isNaN(player_num))
    {
        winner_text.innerHTML = "Choose A Hand!";
    }

    else 
    {
        score_list[0] = parseInt(score_list[0]) + 1; // Increases players score by 1
        winner_text.innerHTML = 'You Win!';           // Alternative text: 'Player won ' +  'Player ' + player + ' Opponent: ' + opponent
    }
    
    //New score, which is player score +1 if player wins, opponent score +1 if opponent score, and +0 if draw 
    score_raw.innerHTML =  score_list[0] + ":" + score_list[1];
}

//when a button on player side is clicked, the name of the image clicked is sent to this script.
//either "rock", "paper" or "scissors"
function hand(button_name)
{
    player = button_name
}
