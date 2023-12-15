const ROWS = 3;
const COLS = 3;

const board = document.querySelector("#board");

const generateBoard = (rows, cols) => { 
    clearBoard();

    board.style.gridTemplateRows = `repeat(${rows}, 200px)`;
    board.style.gridTemplateColumns = `repeat(${cols}, 200px)`;

    for (let r = 0; r < rows; r++) { 
        const noTop = r == 0;
        const noBot = r == rows - 1;

        for (let c = 0; c < cols; c++) { 
            const cell = document.createElement("div");
            cell.classList.add("cell");
            
            if (noTop) 
                cell.classList.add("no-top"); 
            else if (noBot) 
                cell.classList.add("no-bot");

            if (c == 0)  
                cell.classList.add("no-left");
            else if (c == cols - 1) 
                cell.classList.add("no-right");
        
            cell.setAttribute("row", r);
            cell.setAttribute("col", c);

            board.appendChild(cell);
        }
    }
};

const clearBoard = () => { 
    document.querySelectorAll(".cell").forEach(cell => cell.remove());
};

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
        
        return true; 
    };
    
    return {placePlayer};
};

generateBoard(ROWS, COLS);