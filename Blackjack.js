const messageEl = document.getElementById("message-el");
const sumEl = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");
const playerEl = document.getElementById("player-el");
const betAmountInput = document.getElementById("bet-amount");

function updatePlayerChips() {
    playerEl.textContent = `${player.name}: $${player.chips}`;
}

function startGame() {
    fetch('/start-game', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            updatePlayerChips();
            resetUI();
        });
}

function placeBet() {
    const betAmount = betAmountInput.value;
    fetch('/bet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: betAmount }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            updatePlayerChips();
            resetUI();
        });
}

function bet50() {
    fetch('/bet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 50 }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            updatePlayerChips();
            resetUI();
        });
}

function bet100() {
    fetch('/bet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 100 }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            updatePlayerChips();
            resetUI();
        });
}

function bet150() {
    fetch('/bet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 150 }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            updatePlayerChips();
            resetUI();
        });
}

function bet200() {
    fetch('/bet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 200 }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            updatePlayerChips();
            resetUI();
        });
}

function resetUI() {
    betAmountInput.value = '';
    messageEl.textContent = '';
    sumEl.textContent = '';
    cardsEl.textContent = '';
}

// Add other functions...
