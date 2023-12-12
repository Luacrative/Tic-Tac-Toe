const ROWS = 3;
const COLS = 3;

const game = () => {
    const grid = Array.from(Array(ROWS), () => new Array(COLS).fill(""));
    
    const checkWin = (row, col, player) => {
        // Check row
        if (grid[row].every(placed => placed == player))  
            return true;
        
        // Check column
        let allCols = true;

        for (let r = 0; r < ROWS && allCols; r++) 
            allCols = grid[r][col] == player;

        if (allCols) 
            return true;
        
        // Check diagonals 
        let diagonals = 1;

        const spanOut = (row, col, rise, run) => {
            while (true) { 
                row += rise;
                col += run;

                if (row >= 0 && row < ROWS && col >= 0 && col < COLS)
                    if (grid[row][col] == player) {
                        diagonals++;
                        continue;
                    }
                
                break;
            }
        };

        if (row != 0) {
            spanOut(row, col, -1, -1);
            spanOut(row, col, -1, 1);
        }

        if (row != ROWS) { 
            spanOut(row, col, 1, -1);
            spanOut(row, col, 1, 1);
        }

        return diagonals == ROWS;
    };
    
    const placePlayer = (row, col, player) => { 
        grid[row][col] = player;
        
        console.log(checkWin(row, col, player));
    };
    
    return {placePlayer};
};

const test = game();
test.placePlayer(0, 0, "x");
test.placePlayer(1, 1, "x");
test.placePlayer(2, 2, "x");