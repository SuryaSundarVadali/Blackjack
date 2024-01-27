import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

const theme = createTheme();
const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  height: '100vh',
  width: '100vw',
  backgroundImage: 'url("/Blackjack.jpg")',
  backgroundSize: 'cover', // Update backgroundSize property
  backgroundRepeat: 'no-repeat',
  boxSizing: 'border-box',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

function App() {
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
      if (amount) {
        const response = await axios.post('http://localhost:5000/bet', { amount: parseInt(amount) });
        const { message, player, cards, sum } = response.data;
        setMessage(message);
        setPlayer(player);
        setCards(cards);
        setSum(sum);
      } else {
        setMessage("Please enter a bet amount.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const newCard = async () => {
    try {
      const response = await axios.post('http://localhost:5000/new-card');
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
    <ThemeProvider theme={theme}>
      <StyledContainer component="main">
        <CssBaseline />
          <Typography variant="h1" color="goldenrod">
            Blackjack
          </Typography>
            <Typography variant="p" id="message-el" color="white">
              {message}
            </Typography>
          <Typography variant="p" id="cards-el" color="white">
              
              Cards: {cards ? cards.join(', ') : ''}
          </Typography>
            <Typography variant="p" id="sum-el" color="white">
              Sum: {sum}
            </Typography>
            <Typography variant="body1" id="player-el" color="white">
            Chips {player ? `${player.name}: ${player.chips}` : ''}
            </Typography>

          <StyledButton variant="contained" onClick={startGame} sx={{ mr: 2 }}>
            START GAME
          </StyledButton>
          <StyledButton variant="contained" onClick={newCard}>
            NEW CARD
          </StyledButton>
          <StyledTextField
             InputProps={{
              style: { color: 'white' }
            }}
            InputLabelProps={{
              style: { color: 'white' }
            }}
            type="number"
            id="bet-input"
            inputProps={{ min: 0 }}
            placeholder="Enter bet amount"
            sx={{ mr: 2 }}
          />
          <StyledButton variant="contained" onClick={placeBet}>
            Place Bet
          </StyledButton>
      </StyledContainer>
    </ThemeProvider>
  );
}

export default App;