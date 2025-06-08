// Game state
const MIN_NUMBER = 1;
const MAX_NUMBER = 10;
let secretNumber;
let attempts;
let gamesPlayed = 0;
let bestScore = null;

// DOM elements
const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const feedback = document.getElementById('feedback');
const newGameBtn = document.getElementById('new-game-btn');
const attemptsDisplay = document.getElementById('attempts');
const bestScoreDisplay = document.getElementById('best-score');
const gamesPlayedDisplay = document.getElementById('games-played');
const numberButtons = document.querySelectorAll('.number-btn');

// Initialize game
function initGame() {
    secretNumber = Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
    attempts = 0;
    updateStats();
    feedback.textContent = "I'm thinking of a number between 1 and 10...";
    feedback.style.color = "black";
    guessInput.value = '';
    guessInput.disabled = false;
    guessBtn.disabled = false;
    console.log("Secret number:", secretNumber); // For testing
}

// Update statistics display
function updateStats() {
    attemptsDisplay.textContent = attempts;
    gamesPlayedDisplay.textContent = gamesPlayed;
    if (bestScore !== null) {
        bestScoreDisplay.textContent = bestScore;
    }
}

// Event listeners
guessBtn.addEventListener('click', makeGuess);
newGameBtn.addEventListener('click', newGame);

// Add click handlers to number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        guessInput.value = button.textContent;
    });
});

// Guess function
function makeGuess() {
    const guess = parseInt(guessInput.value);
    
    // Validate input
    if (isNaN(guess)) {
        feedback.textContent = "Please enter a number!";
        feedback.style.color = "red";
        return;
    }
    
    if (guess < MIN_NUMBER || guess > MAX_NUMBER) {
        feedback.textContent = `Please enter between ${MIN_NUMBER} and ${MAX_NUMBER}!`;
        feedback.style.color = "red";
        return;
    }
    
    attempts++;
    updateStats();
    
    // Check guess
    if (guess === secretNumber) {
        feedback.textContent = `🎉 Correct! You got it in ${attempts} ${attempts === 1 ? 'try' : 'tries'}!`;
        feedback.style.color = "green";
        
        // Update best score
        if (bestScore === null || attempts < bestScore) {
            bestScore = attempts;
            bestScoreDisplay.textContent = bestScore;
        }
        
        // Disable input
        guessInput.disabled = true;
        guessBtn.disabled = true;
    } else {
        feedback.textContent = guess < secretNumber ? "Too low!" : "Too high!";
        feedback.style.color = "red";
    }
}

// New game function
function newGame() {
    gamesPlayed++;
    initGame();
}

// Start the game when page loads
initGame();