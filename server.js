const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
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

let betPlaced = false;  

app.post('/start-game', (req, res) => {
    isAlive = true;
    betPlaced = false;
    cards = []; // Reset cards
    sum = 0; // Reset sum
    player.currentbet = 0;
    res.json({ message: 'Game started. Place your bet.' });
});

app.post('/bet', (req, res) => {
    if (betPlaced) {
        res.json({ message: 'Error: Bet already placed.' });
        return;
    }
    const amount = req.body.amount;
    if(amount <= 0) {
        res.json({ message: 'Error: Invalid bet.' });
        return;
    }
    if(amount > player.chips) {
        res.json({ message: 'Error: Insufficient chips.' });
        return;
    }
    player.chips -= amount;
    player.currentbet = amount;
    cards = [getRandomCard(), getRandomCard()];
    sum = calculateSum(cards);
    betPlaced = true; // Set betPlaced to true
    res.json({ message: 'Bet placed.', cards: cards, sum: sum, chips: player.chips });
    console.log(sum);
});

app.get('/status', (req, res) => {
    res.json({ player: player, cards: cards, sum: sum, isAlive: isAlive, hasBlackJack: hasBlackJack,chips: player.chips});
});

app.post('/new-card', (req, res) => {
    if (!isAlive || hasBlackJack) {
        res.json({ message: 'You cannot draw a new card right now.' });
        return;
    }

    const newCard = getRandomCard();
    cards.push(newCard);
    sum = calculateSum(cards);

    if (sum > 21) {
        isAlive = false;
        hasBlackJack = false;
        message = 'You are out of the game!';
    } else if (sum === 21) {
        hasBlackJack = true;
        message = 'You got blackjack!';
    } else {
        message = 'Do you want to draw a new card?';
    }

    res.json({ cards: cards, sum: sum, isAlive: isAlive, hasBlackJack: hasBlackJack, message: message });
});

app.post('/end-game', (req, res) => {
    const dealerSum = Math.floor(Math.random() * 5) + 17;
    if (sum > 21) {
        message = 'You went over 21! You lost!';
    } else if (dealerSum > 21) {
        message = 'Dealer went over 21! You won!';
        player.chips += 2 * player.currentbet;
    } else if (sum > dealerSum) {
        message = 'You won!';
        player.chips += 2 * player.currentbet;
    } else if (sum < dealerSum) {
        message = 'You lost!';
    } else {
        message = 'It\'s a draw!';
        player.chips += player.currentbet;
    }
    isAlive = false;
    betPlaced = false;
    res.json({ message: message, player: player });
});

app.listen(port, () => console.log(`Server started on port ${port}`));