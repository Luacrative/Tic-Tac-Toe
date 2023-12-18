const newGame = (board) => {
    const ROWS = board.rows, COLS = board.cols; 
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
        const runDiagonally = (row, col, rise, run) => {
            let diagonals = 0;
    
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
    
            return diagonals;
        };
    
        const positive = 1 + runDiagonally(row, col, -1, -1) + runDiagonally(row, col, 1, 1);
        const negative = 1 + runDiagonally(row, col, 1, -1) + runDiagonally(row, col, -1, 1);

        return (positive == ROWS) || (negative == ROWS);
    };

    // Game state 
    const checkWin = (row, col, player) => {
        return checkRow(row, player) || checkCol(col, player) || checkDiagonals(row, col, player);
    };

    const placePlayer = (row, col, player) => { 
        if (grid[row][col] != "")  
            return false; 

        grid[row][col] = player;

        const cell = board.cells[row][col];
        cell.textContent = player;
        cell.classList.add(player + "-color");

        return true; 
    };
    
    return {placePlayer};
};

const startGame = (board, playerSelected) => { 
    const session = newGame(board); 
    session.isTurn = true; 

    for (let row = 0; row < board.rows; row++)
        for (let col = 0; col < board.cols; col++) 
            board.cells[row][col].addEventListener("click", () => { 
                if (!session.isTurn) return;

                session.placePlayer(row, col, playerSelected);
                session.isTurn = false;
            });

    return session; 
};

export default startGame;