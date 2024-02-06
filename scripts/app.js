// start button
let startBtn = document.getElementById('startBtn');
//retry button
let retryBtn = document.getElementById('retryBtn');
// input field where you guess the letters
let userInput = document.getElementById('userInput');
// displays the length of the word you have to guess
let GameWord = document.getElementById('GameWord');
// number of guesses left out of 6
let numofGuesses = document.getElementById('numofGuesses');
// displays all the letters used
let lettersused = document.getElementById('lettersused');

// will become the random word we pull from our array
let randomWord = "";

// this will contain an array that we will join together later
// in order to display the underscores and letters they have guessed correctly,
// in the spaces they would take up in a word
let letterArray = [];

// this will be the letters they have guessed
let wrongGuess = "";

//number of guesses they have made, or turns taken, starts at zero
let guesses = 0;

let maxGuesses = 6;

const canvas = document.getElementById("canvas");
//start
startBtn.addEventListener('click', function(){
    dataCall();
})

//  fetchs data from data.json .then turns it into reponse.json .then data 
function dataCall() {
    fetch('./data/data.json').then(response => response.json()).then( data => {

        let rndNum = Math.floor(Math.random() * data.words.length);
        randomWord = data.words[rndNum];
        console.log(randomWord);

        startGame(randomWord);
    })
}


// calls the letter array and you get the word you need to get along with the length of thw word & everytime you updategamestate you update if you guessed correct
function startGame(word){
    letterArray = [];
    for(let i = 0; i < word.length; i++){
        letterArray[i] = "_";
        updateGameState();
        userInput.readOnly = false;
    }
    }


//retry game
retryBtn.addEventListener('click', function(){
    resetGame();
})

// on pressing "keydown" or ENTER this will run the function event and also stores the data from the function  
userInput.addEventListener('keydown', function(event) {
    
    if(event.key === "Enter"){
        let guess = userInput.value.toLowerCase();
        //Check if the users guess is included in our random word
        if(randomWord.includes(guess)){
            
            for(let i = 0; i < randomWord.length; i++){
                if(randomWord[i] === guess){
                    letterArray[i] = guess;
                }
            }
        }else{
            wrongGuess += guess;
            lettersused.textContent = wrongGuess;
            guesses++;
        }
        updateGameState();
        userInput.value = "";
        gameEnd();
    }
})





// updates the number of guesses & tells you if you have a correct letter
function updateGameState(){
    GameWord.textContent = letterArray.join(" ");
    numofGuesses.textContent = `Number Of Guesses: ${guesses} / ${maxGuesses}`;
    
    
}

//resets the game back to the original screen

function resetGame(){
    randomWord = "";
    wrongGuess = "";
    letterArray = [];
    guesses = 0;
    userInput.readOnly = true;
    userInput.value = "";
    numofGuesses.textContent = "Guesses Used: X / X";
    GameWord.textContent = "Press Start!";
    lettersused.textContent = "Letters Used";
}

function gameEnd(){
    // Lose: check if guesses === maxGuesses
    // Win: check if randomWord === letterArray
    if(guesses === maxGuesses){
        alert(`You lose! Your word was ${randomWord}`);
        resetGame();
    }else if(letterArray.join("") === randomWord && randomWord != ""){
        alert(`You win! Your word was ${randomWord}`);
        resetGame();
    }
}


//plays audio on button click
function play1() {
    var audio = document.getElementById("audio");
    audio.play();
  }

  function play2() {
    var audio2 = document.getElementById("audio2");
    audio2.play();
  }
  

