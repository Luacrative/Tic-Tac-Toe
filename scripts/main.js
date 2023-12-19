// Dependencies 
import {createBoard, removeBoard} from "./board.js";
import newGame from "./game.js";

// Variables 
const menu = document.querySelector("#menu");
const playerSelect = document.querySelector("#player-select");
const playerOptions = document.querySelectorAll(`input[name = "player-option"`);
const modeSelect = document.querySelector("#mode-select");
const modeOptions = document.querySelectorAll(".mode-option");
const board = document.querySelector("#board");
const game = document.querySelector("#game");

var playerSelected;
var curGame; 

// Functions 
const selectPlayer = (player) => { 
    playerSelected = player;
    
    playerSelect.classList.add("scale-zero");
    modeSelect.classList.add("scale-transition");
    modeSelect.classList.remove("scale-zero");
};

const selectMode = (mode) => { 
    modeSelect.classList.remove("scale-transition");
    modeSelect.classList.add("scale-zero");
    
    menu.style.display = "none";
    game.style.display = "flex";
    
    const size = parseInt(mode);
    const cells = createBoard(board, size, size);
    curGame = newGame(cells, playerSelected);
};

// Event listeners
playerOptions.forEach(option => {
    option.addEventListener("change", () => selectPlayer(option.value));
});

modeOptions.forEach(option => { 
    option.addEventListener("click", () => selectMode(option.getAttribute("value")));
});