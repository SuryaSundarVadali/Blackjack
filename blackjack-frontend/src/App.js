/*import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  makeStyles,
} from '@mui/material';
import axios from 'axios';
 
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: '100vh',
  },
  button: {
    marginTop: theme.spacing(2),
  },
  input: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const [cards, setCards] = useState([]);
  const [sum, setSum] = useState('');
  const [isAlive, setIsAlive] = useState(true);
  const [hasBlackJack, setHasBlackJack] = useState(false);
  const [player, setPlayer] = useState({ name: '', chips: 0 });

  const startGame = async () => {
    try {
      const response = await axios.post('http://localhost:5000/start-game');
      const { message, player, cards, sum } = response.data;
      setMessage(message);
      setPlayer(player);
      setCards(cards);
      setSum(sum);
      setIsAlive(true);
      setHasBlackJack(false);
    } catch (error) {
      console.error(error);
    }
  };

  const placeBet = async () => {
    try {
      const amount = document.getElementById('bet-input').value;
      const response = await axios.post('/bet', { amount: parseInt(amount) });
      const { message, cards, sum } = response.data;
      setMessage(message);
      setCards(cards);
      setSum(sum);
    } catch (error) {
      console.error(error);
    }
  };

  const newCard = async () => {
    try {
      const response = await axios.post('/new-card');
      const { message, cards, sum, isAlive, hasBlackJack } = response.data;
      setMessage(message);
      setCards(cards);
      setSum(sum);
      setIsAlive(isAlive);
      setHasBlackJack(hasBlackJack);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.root}>
        <Typography variant="h1" color="goldenrod">
          Blackjack
        </Typography>
        <Typography variant="p" id="message-el">
          {message}
        </Typography>
        <Typography variant="p" id="cards-el">
          Cards: {cards.join(', ')}
        </Typography>
        <Typography variant="p" id="sum-el">
          Sum: {sum}
        </Typography>
        <Button
          variant="contained"
          onClick={startGame}
          className={classes.button}
        >
          START GAME
        </Button>
        <Button
          variant="contained"
          onClick={newCard}
          className={classes.button}
        >
          NEW CARD
        </Button>
        <TextField
          type="number"
          id="bet-input"
          inputProps={{ min: 0 }}
          placeholder="Enter bet amount"
          className={classes.input}
        />
        <Button
          variant="contained"
          onClick={placeBet}
          className={classes.button}
        >
          Place Bet
        </Button>
        <Typography variant="p" id="player-el">
          {player.name}: ${player.chips}
        </Typography>
      </div>
    </Container>
  );
}

export default App;
*/

import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  ThemeProvider, // Import ThemeProvider
  createTheme, // Import createTheme
} from '@mui/material';
import { makeStyles } from '@mui/styles';


const theme = createTheme(); // Create a theme instance

const useStyles = makeStyles({
  gridAlign : {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.secondary,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: '100vh',
  },
  button: {
    marginTop: theme.spacing(2),
  },
  input: {
    marginTop: theme.spacing(2),
  },
});


function App() {
  
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const [cards, setCards] = useState([]);
  const [sum, setSum] = useState('');
  const [isAlive, setIsAlive] = useState(true);
  const [hasBlackJack, setHasBlackJack] = useState(false);
  const [player, setPlayer] = useState({ name: '', chips: 0 });

  const startGame = async () => {
    try {
      const response = await axios.post('http://localhost:5000/start-game');
      const { message, player, cards, sum } = response.data;
      setMessage(message);
      setPlayer(player);
      setCards(cards);
      setSum(sum);
      setIsAlive(true);
      setHasBlackJack(false);
    } catch (error) {
      console.error(error);
    }
  };

  const placeBet = async () => {
    try {
      const amount = document.getElementById('bet-input').value;
      const response = await axios.post('/bet', { amount: parseInt(amount) });
      const { message, cards, sum } = response.data;
      setMessage(message);
      setCards(cards);
      setSum(sum);
    } catch (error) {
      console.error(error);
    }
  };

  const newCard = async () => {
    try {
      const response = await axios.post('/new-card');
      const { message, cards, sum, isAlive, hasBlackJack } = response.data;
      setMessage(message);
      setCards(cards);
      setSum(sum);
      setIsAlive(isAlive);
      setHasBlackJack(hasBlackJack);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.root}>
        <Typography variant="h1" color="goldenrod">
          Blackjack
        </Typography>
        <Typography variant="p" id="message-el">
          {message}
        </Typography>
        <Typography variant="p" id="cards-el">
          Cards: {cards.join(', ')}
        </Typography>
        <Typography variant="p" id="sum-el">
          Sum: {sum}
        </Typography>
        <Button
          variant="contained"
          onClick={startGame}
          className={classes.button}
        >
          START GAME
        </Button>
        <Button
          variant="contained"
          onClick={newCard}
          className={classes.button}
        >
          NEW CARD
        </Button>
        <TextField
          type="number"
          id="bet-input"
          inputProps={{ min: 0 }}
          placeholder="Enter bet amount"
          className={classes.input}
        />
        <Button
          variant="contained"
          onClick={placeBet}
          className={classes.button}
        >
          Place Bet
        </Button>
        <Typography variant="p" id="player-el">
          {player.name}: ${player.chips}
        </Typography>
      </div>
    </Container>
  );
}

export default App;
