import gridState from "./gridState.js";
import opponent from "./opponent.js"; 

class player {
    constructor(name, startTurn, endTurn) { 
        this.name = name;
        this.state = undefined;
        this.startTurn = startTurn || this.connectBoardClick;
        this.endTurn = endTurn || this.disconnectBoardClick;

        this.callbacks = [];
    }

    connectBoardClick(board, place) {
        for (let row = 0; row < board.rows; row++) 
            for (let col = 0; col < board.cols; col++) {
                const callback = () => place(row, col, this.name);
                const cell = board.cells[row][col];
                
                this.callbacks.push([cell, callback]);
                cell.addEventListener("click", callback);
            }
    }

    disconnectBoardClick(board) { 
        for (const [cell, callback] of this.callbacks)  
            cell.removeEventListener("click", callback);

        this.callbacks = [];
    }
}

const game = (board) => {
    const grid = Array.from(Array(board.rows), () => new Array(board.cols).fill(""));
    const state = gridState(board.rows, board.cols, grid);
    
    const players = [];
    var turnIndex = 0;

    const addPlayer = (player) => { 
        player.state = state;   
        players.push(player);
    };

    const placePlayer = (row, col, player) => { 
        if (player != players[turnIndex].name || grid[row][col] != "")  
            return; 
    
        const cell = board.cells[row][col];
        cell.textContent = player;
        cell.classList.add(player + "-color");

        grid[row][col] = player;
        players[turnIndex].endTurn();

        turnIndex = (turnIndex + 1) % players.length;
        players[turnIndex].startTurn(board, placePlayer);
    };
    
    const start = () => { 
        players[turnIndex].startTurn(board, placePlayer);
    };

    return {addPlayer, placePlayer, start};
};

const newGame = (board, playerSelected) => { 
    const session = game(board);
    const you = new player(playerSelected); 
    const enemy = new player(playerSelected == "x" ? "o" : "x"); 

    session.addPlayer(you);
    session.addPlayer(enemy);
    session.start(); 

    return session; 
};

export default newGame;