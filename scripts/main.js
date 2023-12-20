// Dependencies 
import newGame from "./game.js";

// Variables 
const menu = document.querySelector("#menu");
const playerSelect = document.querySelector("#player-select");
const playerOptions = document.querySelectorAll(`input[name = "player-option"`);
const modeSelect = document.querySelector("#mode-select");
const modeOptions = document.querySelectorAll(".mode-option");
const boardSelect = document.querySelector("#board-select");
const boardOptions = document.querySelectorAll(".board-option");
const game = document.querySelector("#game");

const settings = {};

// Functions 
const selectPlayer = (player) => { 
    settings.player1 = player;
    
    playerSelect.classList.add("scale-zero");
    modeSelect.classList.add("scale-transition");
    modeSelect.classList.remove("scale-zero");
};

const selectMode = (mode) => { 
    settings.mode = mode; 

    modeSelect.classList.add("scale-zero");
    boardSelect.classList.add("scale-transition");
    boardSelect.classList.remove("scale-zero");
};

const selectBoard = (board) => { 
    settings.size = board;

    boardSelect.classList.remove("scale-transition");
    boardSelect.classList.add("scale-zero");
    
    startGame();
};

const startGame = () => { 
    menu.style.display = "none";
    game.style.display = "flex";

    const session = newGame(settings);
    session.onGameEnd((winner) => { 
        console.log(winner);
    });

    session.start(); 
};

// Event listeners
playerOptions.forEach(option => {
    option.addEventListener("change", () => selectPlayer(option.value));
});

modeOptions.forEach(option => { 
    option.addEventListener("click", () => selectMode(option.getAttribute("value")));
});

boardOptions.forEach(option => { 
    const size = parseInt(option.getAttribute("value"));
    option.addEventListener("click", () => selectBoard(size));
});