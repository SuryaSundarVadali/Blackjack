const player = {
    name: "Per",
    chips: 20000,
    currentbet:0,
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

playerEl.textContent = `${player.name}: $${player.chips}`;

function updatePlayerChips() {
    playerEl.textContent = `${player.name}: $${player.chips}`;
}

function bet(amount) {
    if (player.chips >= amount) {
        player.chips -= amount;
        player.currentbet = amount;
        updatePlayerChips();
        return true;
    } else {
        setMessage("Error: Insufficient chips.");
        return false;
    }
}

function win(amount) {
    player.chips += (2*amount);
    updatePlayerChips();
}

function lose(amount) {
    player.chips -= amount;
    updatePlayerChips();
}

function getRandomCard() {
    return Math.floor(Math.random() * 13) + 1;
}

function calculateSum(cards) {
    let sum = 0;
    let numberOfAces = 0;

    for (const card of cards) {
        if (card === 1) {
            sum += 11;
            numberOfAces++;
        } else if (card > 10) {
            sum += 10;
        } else {
            sum += card;
        }
    }

    while (sum > 21 && numberOfAces > 0) {
        sum -= 10;
        numberOfAces--;
    }

    return sum;
}

function startGame() {
    isAlive = true;
    cards = []; // Reset cards
    sum = 0; // Reset sum
    currentbet=0;
    renderGame();
}

function bet50() {
    if (bet(50)) {
        cards = [getRandomCard(), getRandomCard()];
        sum = calculateSum(cards);
        startGame();
    }
}

function bet100() {
    if (bet(100)) {
        cards = [getRandomCard(), getRandomCard()];
        sum = calculateSum(cards);
        startGame();
    }
}

function bet150() {
    if (bet(150)) {
        cards = [getRandomCard(), getRandomCard()];
        sum = calculateSum(cards);
        startGame();
    }
}

function bet200() {
    if (bet(200)) {
        cards = [getRandomCard(), getRandomCard()];
        sum = calculateSum(cards);
        startGame();
    }
}

function renderGame() {
    if (cards.length > 0) {
        cardsEl.textContent = "Cards: ";
        for (const card of cards) {
            cardsEl.textContent += `${card} `;
        }
        sumEl.textContent = `Sum: ${sum}`;
    } else {
        cardsEl.textContent = "";
        sumEl.textContent = "";
    }

    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
        win(player.currentbet); // Add this line to call win when the player gets a Blackjack
    } else {
        message = "You're out of the game!";
        isAlive = false;
    }
    messageEl.textContent = message;
}

function newCard() {
    if (player.currentbet <= 0) {
        setMessage("Error: You must place a bet before drawing a new card.");
        return;
    }
    if (isAlive && !hasBlackJack) {
        const card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();
    }
}

function setMessage(msg) {
    messageEl.textContent = msg;
}

function resetGame() {
    cards = [];
    sum = 0;
    hasBlackJack = false;
    isAlive = false;
    message = "";
    messageEl.textContent = "";
    sumEl.textContent = "";
    cardsEl.textContent = "";
}

// Add an event listener to the "Start Game" button to reset the game and initiate the bet prompt
document.getElementById("start-game-btn").addEventListener("click", function() {
    resetGame();
    betPrompt();
});

// Add event listeners to the bet buttons
document.getElementById("bet-50-btn").addEventListener("click", bet50);
document.getElementById("bet-100-btn").addEventListener("click", bet100);
document.getElementById("bet-150-btn").addEventListener("click", bet150);
document.getElementById("bet-200-btn").addEventListener("click", bet200);