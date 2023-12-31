export default (grid) => { 
    const rows = grid.length;
    const cols = grid[0].length; 
    const lastMove = [];

    const getEmptyCells = () => { 
        const cells = []; 

        for (let r = 0; r < rows; r++) 
            for (let c = 0; c < cols; c++) 
                if (grid[r][c] == "")
                    cells.push([r, c]);

        return cells;
    };

    const getCell = (row, col) => grid[row][col];
    const setCell = (row, col, player) => { 
        grid[row][col] = player;
        lastMove[0] = row; 
        lastMove[1] = col; 
    };

    const backTrack = () => { 
        setCell(lastMove[0], lastMove[1], "");
        lastMove.length = 0;
    }

    const hasRow = (row, player) => grid[row].every(placed => placed == player);
    const hasCol = (col, player) => {
        for (let r = 0; r < rows; r++)
            if (grid[r][col] != player)
                return false;
        
        return true;
    }
    
    const hasDiagonal = (row, col, player) => {
        const runDiagonally = (row, col, rise, run) => {
            let diagonals = 0;
    
            while (true) { 
                row += rise;
                col += run;
    
                if (row >= 0 && row < rows && col >= 0 && col < cols) 
                    if (grid[row][col] == player) {
                        diagonals++;
                        continue;
                    }
    
                break;
            }
    
            return diagonals;
        };
    
        const positive = 1 + runDiagonally(row, col, -1, -1) + runDiagonally(row, col, 1, 1);
        const negative = 1 + runDiagonally(row, col, 1, -1) + runDiagonally(row, col, -1, 1);
    
        return (positive == rows) || (negative == rows);
    };
    
    const isWinner = (row, col, player) => hasRow(row, player) || hasCol(col, player) || hasDiagonal(row, col, player);
    const isStale = () => getEmptyCells().length == 0;

    return {getEmptyCells, getCell, setCell, backTrack, isWinner, isStale}
};