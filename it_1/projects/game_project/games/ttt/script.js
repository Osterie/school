const ttt_quadrants = document.querySelectorAll(".ttt_quadrants");

const ttt_board = document.getElementById('ttt_board');

const ttt_column = document.getElementById("column2"); 

const gamemode1 = document.getElementById("ttt_gamemode1")

const gamemode2 = document.getElementById("ttt_gamemode2")

const replay = document.getElementById("ttt_q5")

const player1_score = document.getElementById("ttt_player1_score")

const player2_score = document.getElementById("ttt_player2_score")


//This variable tells how many players are playing
var players = 2;


gamemode1.addEventListener('click', event => 
{
    gamemode1.style.backgroundColor = 'red'
    gamemode2.style.backgroundColor = 'white'
})

gamemode2.addEventListener('click', event => 
{
    gamemode1.style.backgroundColor = 'white'
    gamemode2.style.backgroundColor = 'red'
})





// When a playe wins playagain changes to true if the play again button is clicked
var playagain = false
// when the number is pair, player 1 plays, when odd player 2
var whosplayin = 0
// if winner = 1 player 1 has won, if 2 player 2 has won
var winner = 0


var ttt_quadrants_array = Array.from(ttt_quadrants);

var ttt_player_positions   = [ [0, 0, 0],
                               [0, 0, 0],
                               [0, 0, 0] ];

var ttt_opponent_positions = [ [0, 0, 0],
                               [0, 0, 0],
                               [0, 0, 0] ];


var ttt_horizontal_product_player   = 1
var ttt_vertical_product_player     = 1
var ttt_diagonal_product_playerlr   = 1
var ttt_diagonal_product_playerrl  = 1

var ttt_horizontal_product_opponent = 1
var ttt_vertical_product_opponent   = 1
var ttt_diagonal_product_opponentlr = 1
var ttt_diagonal_product_opponentrl = 1





// 2 player, only runs if playagain == false, which means only when a round has not been finished
ttt_quadrants.forEach((quadrant) => 
{   

    //event click for all tic tac toe quadrants
    quadrant.addEventListener('click', event => {
        

        if (playagain == false){


            // if this statement is true, it means the turn is to player 1 turn
            if (whosplayin % 2 == 0)
            {   
                // Checks if the clicked area has the symbol "x" or "o", if not, excecutes code.
                if (quadrant.innerHTML != 'x' && quadrant.innerHTML != 'o')
                {    
                    whosplayin += 1

                    //Sets an "x" on the clicked square if there is not any other symbol
                    quadrant.innerHTML = "x"

                    //just shortens the expression on the right side for more readable code.
                    //The right side gives a number for the position of the clicked quadrant
                    numb_shortened = (quadrant.id.replace('ttt_q', ''))
                    

                    //First bracket is "y" position in matrix, second is x.

                    //This basically does:
                    //when a tic tac toe quadrant is clicked, for example the one in the middle, lets call it quadrant number 5,
                    //the expression under places quadrant number 5 in a matrix in the corresponding position:
                    // [ [0, 0, 0],
                    //   [0, 5, 0],
                    //   [0, 0, 0] ];
                    ttt_player_positions[( Math.floor((numb_shortened-1)/3)) ] [ (numb_shortened-1) -  3*(Math.floor((numb_shortened-1)/3)) ] = parseInt(numb_shortened)        
                }
            }

            //player 2 turn
            else
            {
                if (quadrant.innerHTML != 'x' && quadrant.innerHTML != 'o')
                {
                whosplayin += 1
                quadrant.innerHTML = "o"
                numb_shortened = (quadrant.id.replace('ttt_q', ''))
                ttt_opponent_positions[( Math.floor((numb_shortened-1)/3)) ] [ (numb_shortened-1) -  3*(Math.floor((numb_shortened-1)/3)) ] = parseInt(numb_shortened)
                }
            }

            //How am i going to check if someone has won?
            //In the code above these comments, i make matrixes which show the positions in a 3x3 grid which
            //have been clicked and by who.
            //The matrix made for player 1 may look like this.
            //[1, 0, 3]
            //[4, 0, 0]
            //[7, 0, 0]
            //the places which have numbers != 0 have been clicked.
            //we see that every number multiplied in the first column != 0,
            //which means player 1 wins since they have three in a row.
            //the code below checks every column, row and diagonal if the == 0,
            //and if they != 0, one of the players have won.


            for (let i = 0; i <3; i++)
            {
                //If any og the products != 0, that means that eithar an entire row, column or diagonal has nubmers, which means a player has won!
                //Diagonal, top left top bottom right (couold not find a pretty way to include both diagonals apart from making more variables (uglu))
                ttt_diagonal_product_playerlr *= (ttt_player_positions[i][i])
                ttt_diagonal_product_opponentlr *= (ttt_opponent_positions[i][i])


                //Diagonal top right to bottom left
                ttt_diagonal_product_playerrl *= (ttt_player_positions[i][2-i])
                ttt_diagonal_product_opponentrl *= (ttt_opponent_positions[i][2-i])
                

                //If any og the products != 0, that means that eithar an entire row, column or diagonal has nubmers, which means a player has won!
                //vertical and horizontal
                for (let j = 0; j <3; j++)
                {
                    ttt_horizontal_product_player *= (ttt_player_positions[i][j])
                    ttt_vertical_product_player   *= (ttt_player_positions[j][i])

                    ttt_horizontal_product_opponent *= (ttt_opponent_positions[i][j])
                    ttt_vertical_product_opponent   *= (ttt_opponent_positions[j][i])
                }


                //If any og the products != 0, that means that eithar an entire row, column or diagonal has nubmers, which means a player has won!
                if (ttt_horizontal_product_player != 0 || ttt_vertical_product_player != 0)
                {
                    playagain = true
                    winner = 1
                }

                else if (ttt_horizontal_product_opponent != 0 || ttt_vertical_product_opponent != 0)
                {
                    playagain = true
                    winner = 2
                }

                //reset numbers so they can be checked again.
                ttt_horizontal_product_player = 1
                ttt_vertical_product_player = 1

                ttt_horizontal_product_opponent = 1
                ttt_vertical_product_opponent = 1
            }

            
            //Diagonals
            if (ttt_diagonal_product_playerrl != 0 || ttt_diagonal_product_playerlr)
            {
                playagain = true
                winner = 1
            }

            else if ( ttt_diagonal_product_opponentrl != 0 || ttt_diagonal_product_opponentlr)
            {
                playagain = true
                winner = 2
            }

            ttt_diagonal_product_playerlr = 1
            ttt_diagonal_product_playerrl = 1
            
            ttt_diagonal_product_opponentlr = 1
            ttt_diagonal_product_opponentrl = 1


            if (whosplayin == 9 && playagain == false)
            {
                playagain = true
                winner = 0
                
            }
        }
    })
})



// This only responds if playagain == true, which means only if
// someone has won
ttt_board.addEventListener('click', event => 
{
    if (playagain == true)
    {
        //Resets count
        whosplayin = 0

        //changes text in all quadrants of tic tac toe grid
        ttt_quadrants.forEach((quadrant) => 
        {   
            quadrant.style.fontSize = '2vw';

            if (winner == 1)
            {
                quadrant.innerHTML = 'Player 1 wins!'
            }

            else if (winner == 2)
            {
                quadrant.innerHTML = 'Player 2 wins!'
            }

            else
            {
                quadrant.innerHTML = 'Draw!'
            }
        })
        
        //change middle element in tic tac toe grid 
        ttt_quadrants[4].innerHTML = 'Play again?'
        
        //increases score by 1
        if (winner == 1)
        {
            player1_score.innerHTML = parseInt(player1_score.innerHTML) + 1
        }

        else if (winner == 2)
        {
            player2_score.innerHTML = parseInt(player2_score.innerHTML) + 1
        }
    }
})


// This only excecutes if the player clicks the play again button, which appears after a round
replay.addEventListener('click', event => 
    {
    if (playagain == true)
    {
        ttt_quadrants.forEach((quadrant) => 
        {   
            quadrant.style.fontSize = '5vw';
            quadrant.innerHTML = ''        
        })

        playagain = false

        //resets variables, as if the page just reloaded
        ttt_player_positions   = [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ];
        ttt_opponent_positions = [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ];
    }
})