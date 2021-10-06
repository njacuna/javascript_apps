
/*

game function:

player must guess bet min and max
player gets a certain amount of guesses
notify player of remaining guesses and the correct answer if player lost
let player choose to play again

*/


let min = 3,
    max = 5,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
})

guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  } else {
    if(guess === winningNum) {

      gameWon(true, `${winningNum} is correct, YOU WIN!`);
  
    } else {
      guessesLeft -= 1;
  
      if(guessesLeft === 0) {
  
        gameWon(false, `boohoo you lost! correct number was ${winningNum}`);
  
      } else {
  
        guessInput.style.borderColor = 'red';
  
        guessInput.value = '';
  
        setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
  
      }
    }
  }

});

function gameWon(won, msg) {
  let color;

  // ternary operator: condition ? if true : else
  won === true ? color = 'green' : color = 'red';

  guessInput.disabled = true;

  guessInput.style.borderColor = color;

  setMessage(msg, color);

  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

function getRandomNum(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}