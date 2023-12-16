// Dependencies 
import {fillBoard, clearBoard} from "./board.js";
import {start} from "./game.js";

// Variables 
const menu = document.querySelector("#menu");
const playerSelect = document.querySelector("#player-select");
const playerOptions = document.querySelectorAll(`input[name = "player-option"`);
const modeSelect = document.querySelector("#mode-select");
const modeOptions = document.querySelectorAll(".mode-option");
const game = document.querySelector("#game");
const board = document.querySelector("#board");

var playerSelected;

// Functions 
const selectPlayer = (player) => { 
    playerSelected = player;
    
    playerSelect.classList.add("hidden");
    modeSelect.classList.add("scale-transition");
    modeSelect.classList.remove("hidden");
};

const selectMode = (mode) => { 
    const size = parseInt(mode);

    fillBoard(board, size, size);

    modeSelect.classList.remove("scale-transition");
    modeSelect.classList.add("hidden");

    menu.style.display = "none";
    game.style.display = "flex";
};

// Event listeners
playerOptions.forEach(option => {
    option.addEventListener("change", () => selectPlayer(option.value));
});

modeOptions.forEach(option => { 
    option.addEventListener("click", () => selectMode(option.getAttribute("value")));
});