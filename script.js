const ROWS = 3;
const COLS = 3;

const game = () => {
    const grid = Array.from(Array(ROWS), () => new Array(COLS).fill(""));
    
    // Grid math 
    const checkRow = (row, player) => grid[row].every(placed => placed == player);
    const checkCol = (col, player) => {
        for (let r = 0; r < ROWS; r++)
            if (grid[r][col] != player)
                return false;
        
        return true;
    }
    
    const checkDiagonals = (row, col, player) => {
        let diagonals = 1;

        // Iterative instead of recursive for O(1) space 
        const runDiagonally = (row, col, rise, run) => {
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
            runDiagonally(row, col, -1, -1, player); // Up left
            runDiagonally(row, col, -1, 1, player); // Up right
        }

        if (row != ROWS) { 
            runDiagonally(row, col, 1, -1, player); // Down left
            runDiagonally(row, col, 1, 1, player); // Down right
        }

        return diagonals == ROWS;
    };

    // Game state 
    const checkWin = (row, col, player) => {
        return checkRow(row, player) || checkCol(col, player) || checkDiagonals(row, col, player);
    };

    const placePlayer = (row, col, player) => { 
        grid[row][col] = player;
    };
    
    return {placePlayer};
};