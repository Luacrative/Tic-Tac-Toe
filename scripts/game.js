import {createBoard, removeBoard} from "./board.js";
import gridState from "./gridState.js";
import {player, bot} from "./player.js";

const makeGrid = (board) => Array.from(Array(board.rows), () => new Array(board.cols).fill(""));
const game = (board) => {
    const states = [gridState(makeGrid(board))];
    const players = [];
    var turnIndex = 0;
    var gameEndCallback;
    
    const addPlayer = player => { 
        const state = gridState(makeGrid(board));   
        states.push(state);
        
        player.state = state;
        player.board = board;
        players.push(player);
    };
    
    const onGameEnd = callback => { 
        gameEndCallback = callback;
    };

    const placePlayer = (row, col, player) => { 
        if (player != players[turnIndex].name || states[0].getCell(row, col) != "") return; 
    
        const cell = board.cells[row][col];
        cell.textContent = player;
        cell.classList.add(player + "-color");

        for (const state of states)
            state.setCell(row, col, player);
        
        players[turnIndex].endTurn();

        const winner = states[0].isWinner(row, col, player); 
        if (winner || states[0].isStale()) { 
            gameEndCallback(winner && player); 
            return; 
        }
        
        turnIndex = (turnIndex + 1) % players.length;
        players[turnIndex].startTurn(placePlayer, board);
    };
    
    const start = () => { 
        players[turnIndex].startTurn(placePlayer, board);
    };

    return {addPlayer, onGameEnd, start};
};


const getSymbol = chosen => chosen == "x" ? "o" : "x";
const newGame = settings => {  
    const player1 = new player(settings.player1); 
    const player2 = settings.mode == "2" ? new bot(getSymbol(player1.name), player1.name) : new player(getSymbol(player1.name));
        
    const session = game(createBoard(board, settings.size, settings.size));
    session.addPlayer(player1);
    session.addPlayer(player2);

    return session; 
};

export default newGame;