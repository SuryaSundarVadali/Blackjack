const player = {
    name: "Per",
    chips: 200
};

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";

// DOM elements
const messageEl = document.getElementById("message-el");
const sumEl = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");
const playerEl = document.getElementById("player-el");

// Display initial player information
function updatePlayerChips() {
    playerEl.textContent = `${player.name}: $${player.chips}`;
}

// Simple bet function without error handling
function bet(amount) {
    if (player.chips >= amount) {
        player.chips -= amount;
        updatePlayerChips();
        return true;
    } else {
        // Optionally, you can still set a message if needed
        // setMessage("Error: Insufficient balance.");
        return false;
    }
}

// Handle winning
function win(amount) {
    player.chips += amount;
    updatePlayerChips();
}

// Handle losing
function lose(amount) {
    player.chips -= amount;
    updatePlayerChips();
}

// Betting functions for specific amounts
function bet50() {
    return bet(50);
}

function bet100() {
    return bet(100);
}

function bet150() {
    return bet(150);
}

function bet200() {
    return bet(200);
}

// Start the game with a specific bet amount
function startGame(betAmount) {
    if (bet(betAmount)) {
        isAlive = true;
        let firstCard = getRandomCard();
        let secondCard = getRandomCard();
        cards = [firstCard, secondCard];
        sum = firstCard + secondCard;
        renderGame();
    }
}

// Display the current game state
// Display the current game state
function renderGame() {
    cardsEl.textContent = "Cards: ";
    for (const card of cards) {
        cardsEl.textContent += `${card} `;
    }

    sumEl.textContent = `Sum: ${sum}`;
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
    } else {
        message = "You're out of the game!";
        isAlive = false;
    }
    messageEl.textContent = message;
}


// Draw a new card
function newCard() {
    if (isAlive && !hasBlackJack) {
        const card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();
    }
}

// Set a message in the message element
function setMessage(msg) {
    messageEl.textContent = msg;
}
