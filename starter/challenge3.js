/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


//Declaring global variables
var scores, roundScore, activePlayer, gamePlaying, previousScore,winningScore;

init();
document.querySelector('.btn-roll').addEventListener('click', function(){

    if(gamePlaying){
        //1. Random numner
        var dice = Math.floor(Math.random() * 6) + 1;
        var second_dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        var secondDiceDom = document.querySelector('.dice-dice');
        diceDOM.style.display = 'block';
        secondDiceDom.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        secondDiceDom.src = 'dice-' + second_dice + '.png';

        //3. Update the round score if the rolled number was not a 1
        if(second_dice === 6 && dice === 6)
        {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = 0;
            nextPlayer();
        }
        if(dice !== 1 && second_dice !== 1)
        {
            roundScore = roundScore + dice + second_dice;
            document.getElementById('current-'+ activePlayer).textContent = roundScore;    
        }
        else{
            //Next Player
            nextPlayer();
        }   
        //previousScore = dice;
    }    
});


document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //1. Add the Current score to the Global score
        scores[activePlayer] += roundScore;

        //2. Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        var input = document.querySelector('.final-score').value;
        
        if(input){
            winningScore = input;
        }else{
            winningScore = 100;
        }

        //3. Check if the player won
        if(scores[activePlayer] >= winningScore)
        {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice-dice').style.display = 'none';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else{
            //Next Player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-dice').style.display = 'none';
};

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0; //0 = player 1, 1 = player 2
    gamePlaying = true;
    previousScore = 0;  
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-dice').style.display = 'none';

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};