class player {
    constructor(name, state, board) { 
        this.name = name;
        this.state = state;
        this.board = board;
        this.callbacks = [];
    }

    startTurn(placePlayer, board) {
        for (let row = 0; row < board.rows; row++) 
            for (let col = 0; col < board.cols; col++) {
                const callback = () => placePlayer(row, col, this.name);
                const cell = board.cells[row][col];
                
                this.callbacks.push([cell, callback]);
                cell.addEventListener("click", callback);
            }
    }

    endTurn() { 
        for (const [cell, callback] of this.callbacks)  
            cell.removeEventListener("click", callback);

        this.callbacks = [];
    }
}

class bot extends player { 
    constructor(name, enemy) {
        super(name);
        this.enemy = enemy; 
    }

    startTurn(placePlayer) { 
        const {name, state, enemy} = this;
        const cells = state.getEmptyCells(); 

        // Find winning move 
        for (const [r, c] of cells) { 
            state.setCell(r, c, name);
            
            if (state.isWinner(r, c, name)) {  
                placePlayer(r, c, name);
                return;
            }

            state.backTrack();
        }

        // Block winning move 
        for (const [r, c] of cells) { 
            state.setCell(r, c, enemy);

            if (state.isWinner(r, c, enemy)) {
                placePlayer(r, c, name);
                return;
            }

            state.backTrack();
        }
        
        setTimeout(placePlayer, (Math.random() * 250) + 150, cells[0][0], cells[0][1], name);
    }
}

export {player, bot};