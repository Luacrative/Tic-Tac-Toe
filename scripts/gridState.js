export default (rows, cols, grid) => { 
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
     
    const checkWin = (row, col, player) => hasRow(row, player) || hasCol(col, player) || hasDiagonal(row, col, player);

    return {hasRow, hasCol, hasDiagonal, checkWin}
};