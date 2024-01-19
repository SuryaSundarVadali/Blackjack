const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.json());

let player = {
    name: "Per",
    chips: 20000,
    currentbet: 0,
};

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";

function updatePlayerChips() {
    return `${player.name}: $${player.chips}`;
}

function bet(amount) {
    if (player.chips >= amount) {
        player.chips -= amount;
        player.currentbet = amount;
        return true;
    } else {
        return "Error: Insufficient chips.";
    }
}

function win(amount) {
    player.chips += 2 * amount;
}

function lose(amount) {
    player.chips -= amount;
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

app.post('/start-game', (req, res) => {
    isAlive = true;
    cards = []; // Reset cards
    sum = 0; // Reset sum
    player.currentbet = 0;
    res.json({ message: 'Game started. Place your bet.' });
});

app.post('/bet', (req, res) => {
    const amount = req.body.amount;
    if (bet(amount)) {
        cards = [getRandomCard(), getRandomCard()];
        sum = calculateSum(cards);
        res.json({ message: 'Bet placed.', cards: cards, sum: sum });
    } else {
        res.json({ message: 'Error: Insufficient chips.' });
    }
});

app.get('/status', (req, res) => {
    res.json({ player: player, cards: cards, sum: sum, isAlive: isAlive, hasBlackJack: hasBlackJack });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
