const createBoard = (board, rows, cols) => { 
    removeBoard();

    board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    const cells = []; 

    for (let r = 0; r < rows; r++) { 
        const noTop = r == 0;
        const noBot = r == rows - 1;
        const rowCells = [];

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
        
            board.appendChild(cell);
            rowCells.push(cell); 
        }

        cells.push(rowCells);
    }

    return {cells, rows, cols} 
};

const removeBoard = () => { 
    document.querySelectorAll(".cell").forEach(cell => cell.remove());
};

export {createBoard, removeBoard};