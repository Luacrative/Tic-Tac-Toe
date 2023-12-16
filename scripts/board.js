const gameArea = [600, 600];

const fillBoard = (board, rows, cols) => { 
    clearBoard();

    const maxWidth = gameArea[0];
    const maxHeight = gameArea[1];

    board.style.gridTemplateRows = `repeat(${rows}, ${maxHeight / rows}px)`;
    board.style.gridTemplateColumns = `repeat(${cols}, ${maxWidth / rows}px)`;

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

export {fillBoard, clearBoard};