# Blackjack Game

## Overview

This project is a simple implementation of a Blackjack game using React for the frontend and Node.js with Express for the backend. The project allows players to start a game, place bets, draw cards, and determine the winner based on the Blackjack rules.

## Frontend (React)

### Dependencies

- React
- Axios
- Material-UI (MUI)

### How to Run

1. Install dependencies: `npm install`
2. Run the application: `npm start`

### Code Structure

- **App Component (App.js):** The main React component responsible for rendering the game interface.
- **ThemeProvider and Styling:** MUI's `ThemeProvider` is used along with the `styled` function to apply styles and create a visually appealing interface.
- **API Requests:** Axios is used for making asynchronous requests to the backend.

## Backend (Node.js with Express)

### Dependencies

- Express
- Cors

### How to Run

1. Install dependencies: `npm install`
2. Run the server: `node server.js`

### Code Structure

- **Server (server.js):** The backend server implemented using Express.
- **Game Logic:** Handles the game logic, such as generating random cards, calculating the sum of cards, and determining the winner.
- **RESTful API Endpoints:**
  - `/start-game`: Initiates a new game.
  - `/bet`: Allows the player to place a bet.
  - `/status`: Retrieves the current game status.
  - `/new-card`: Draws a new card during the game.
  - `/end-game`: Determines the winner and ends the game.

## How to Play

1. Start the game by clicking the "START GAME" button.
2. Place a bet using the input field and "Place Bet" button.
3. Draw new cards by clicking the "NEW CARD" button.
4. End the game to see the result.

## Important Notes

- The project uses a minimalistic design with background images to enhance the gaming experience.
- The backend simulates a simple Blackjack game with basic rules.
- Make sure both frontend and backend are running simultaneously for proper functionality.

Feel free to customize and expand upon this project to add more features or improve the existing ones. Happy coding!
