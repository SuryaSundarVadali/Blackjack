// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Blackjack {
    address public owner;
    uint256 public betAmount;
    uint256 public seed;
    uint256[] public cards;
    
    event CardDrawn(uint256 card);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier validBet(uint256 amount) {
        require(amount > 0, "Bet amount must be greater than zero");
        _;
    }

    constructor() {
        owner = msg.sender;
        seed = block.timestamp; // Use the current block timestamp as the initial seed
    }

    function setBetAmount(uint256 _betAmount) external onlyOwner {
        betAmount = _betAmount;
    }

    function drawCard() external payable validBet(msg.value) {
    require(cards.length < 52, "All cards have been drawn");
    
    uint256 card = generateRandomCard();
    cards.push(card);

    emit CardDrawn(card);
}


    function generateRandomCard() internal returns (uint256) {
        seed = uint256(keccak256(abi.encodePacked(seed, blockhash(block.number))));
        uint256 card = (seed % 13) + 1; // Cards range from 1 to 13
        return card;
    }

    function getCards() external view returns (uint256[] memory) {
        return cards;
    }

    function resetGame() external onlyOwner {
        delete cards;
        seed = block.timestamp;
    }
}