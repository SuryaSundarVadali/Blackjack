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

playerEl.textContent = `${player.name}: $${player.chips}`;

function updatePlayerChips() {
    playerEl.textContent = `${player.name}: $${player.chips}`;
}

function bet(amount) {
    if (player.chips >= amount) {
        player.chips -= amount;
        updatePlayerChips();
        return true;
    } else {
        setMessage("Error: Insufficient chips.");
        return false;
    }
}

function win(amount) {
    player.chips += amount;
    updatePlayerChips();
}

function lose(amount) {
    player.chips -= amount;
    updatePlayerChips();
}

function betPrompt() {
    const betAmount = prompt("How much would you like to bet?");
    if (betAmount !== null) {
        startGame(parseInt(betAmount, 10));
    }
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

function startGame(betAmount) {
    if (bet(betAmount)) {
        isAlive = true;
        cards = [getRandomCard(), getRandomCard()];
        sum = calculateSum(cards);
        renderGame();
    }
}

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

function newCard() {
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

// Add an event listener to the "Start Game" button to initiate the bet prompt
document.getElementById("start-game-btn").addEventListener("click", betPrompt);
