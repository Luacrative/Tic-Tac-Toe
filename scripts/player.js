const bot = (self, enemy) => {
    return (placePlayer) => { 
        const {state, name} = self;
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

        placePlayer(cells[0][0], cells[0][1], name);
    };
};

export default class player {
    constructor(name) { 
        this.name = name;
        this.state = undefined;
        this.callbacks = [];
    }

    makeBot(enemy) {
        this.startTurn = bot(this, enemy);
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