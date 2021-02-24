'use strict';
var active = 1;
var diceRoller = () => Math.floor(Math.random() * 6) + 1; // random generator
var selectedElement = (takeElement) => document.querySelector(takeElement); // qurySelector Handler
var sectionOne = selectedElement('.player.player--0');
var sectionTwo = selectedElement('.player.player--1');
var newGameButton = selectedElement('.btn.btn--new');
var diceNumber = selectedElement('.dice');
var playerOneTotal = selectedElement('#score--0')
var playerTwoTotal = selectedElement('#score--1');
var playerOneCurrentScore = selectedElement('#current--0');
var playerTwoCurrentScore = selectedElement('#current--1');
var rollDiceButton = selectedElement('.btn.btn--roll');
var holdButton = selectedElement('.btn.btn--hold');
var gameEnded = selectedElement('.over.hidden');

// Game reset function
var resetGame = function () {
    active=1;
    playerOneTotal.textContent = '0';
    playerTwoTotal.textContent = '0';
    playerOneCurrentScore.textContent = '0';
    playerTwoCurrentScore.textContent = '0';
    gameEnded.classList.add('hidden');
    rollDiceButton.disabled = false;
    holdButton.disabled = false;
}
resetGame();// reset on start

// new game function
newGameButton.addEventListener('click', ()=> resetGame());

// function that switchs between players
var switchPlayer = function (){ 
    if(active === 1){
        sectionOne.classList.remove('player--active');
        sectionTwo.classList.add('player--active');
        active = 2;
    }
    else if(active === 2){
        sectionTwo.classList.remove('player--active');
        sectionOne.classList.add('player--active');
        active = 1;
    }
}


// function to set score before checking for winner
var setScore = function (){
    let rol = diceRoller();
    if(active == 1){
        diceNumber.setAttribute('src', `dice-${rol}.png`);
        if(rol === 1){
            playerOneTotal.textContent = '0';
        }
        playerOneCurrentScore.textContent = rol;
        playerOneTotal.textContent = parseInt(playerOneTotal.textContent) + rol;
    }
    else if(active == 2){
        diceNumber.setAttribute('src', `dice-${rol}.png`);
        if(rol === 1){
            playerTwoTotal.textContent = '0';
        }
        playerTwoCurrentScore.textContent = rol;
        playerTwoTotal.textContent = parseInt(playerTwoTotal.textContent) + rol;
    }
}

// function to check for  winner after every dice roll
var checkWinner = function () {
    if(parseInt(playerOneTotal.textContent) >= 100){
        gameEnded.textContent = "🎈🎁 Player One WON 🎉";
        gameEnded.classList.remove('hidden');
        rollDiceButton.disabled = true;
        holdButton.disabled = true;
    }
    else if(parseInt(playerTwoTotal.textContent) >= 100){
        gameEnded.textContent = "🎈🎁 Player Two WON 🎉";
        gameEnded.classList.remove('hidden');
        rollDiceButton.disabled = true;
        holdButton.disabled = true;
    }
}
// roll dice event handler
rollDiceButton.addEventListener('click', ()=> {
    setScore();
    checkWinner();
})

// switch player event handler
holdButton.addEventListener('click',  switchPlayer);

