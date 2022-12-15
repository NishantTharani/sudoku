import React, {useState} from "react";


function Grid(props) {
    let height = props.n ** 2;
    let n = props.n;
    let setGrid = props.setGrid;
    let grid = props.grid;
    let out = [];
    const changeCell = props.changeCell;

    let [activeRow, setActiveRow] = useState(-1);
    let [activeCol, setActiveCol] = useState(-1);

    function _cellOnClick(e) {
        let cellRow = parseInt(e.target.getAttribute("data-row"));
        let cellCol = parseInt(e.target.getAttribute("data-col"));
        if (props.originalGrid[cellRow][cellCol] === 0) {
            setActiveRow(cellRow);
            setActiveCol(cellCol);
        }
    }

    const handleKeyDown = (event) => {
        let keyCode = event.which;
        console.log(keyCode);
        let newCol = activeCol;
        let newRow = activeRow;
        switch (keyCode) {
            case 37:
                event.preventDefault();
                setActiveCol(Math.max(0, activeCol - 1));
                break;
            case 39:
                event.preventDefault();
                setActiveCol(Math.min(n*n - 1, activeCol + 1));
                break;
            case 38:
                event.preventDefault();
                setActiveRow(Math.max(0, activeRow - 1));
                break;
            case 40:
                event.preventDefault();
                setActiveRow(Math.min(n*n - 1, activeRow + 1));
                break;
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
            case 8:
            case 46:
                const canEditCell = props.originalGrid[activeRow][activeCol] === 0;
                if (canEditCell) {
                    if (keyCode >= 49 && keyCode <= 57) {
                        changeCell(activeRow, activeCol, keyCode - 48);
                    } else if (keyCode === 8 || keyCode === 46) {
                        changeCell(activeRow, activeCol, 0);
                    }
                }
                break;
            default:
                return;
        }
    };

    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        // cleanup this component
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeCol, activeRow]);

    React.useEffect(() => {
        setActiveRow(-1);
        setActiveCol(-1);
    }, [props.originalGrid])

    for (let row = 0; row < height; row++) {
        let rowList = []
        for (let col = 0; col < height; col++) {
            let i = (row * height) + col;
            let isTop = row === 0;
            let isBottom = row === height - 1;
            let isLeft = col === 0;
            let isRight = col === height - 1;
            let isMiniTop = !isTop && row % n === 0;
            let isMiniBottom = !isBottom && (row + 1) % n === 0;
            let isMiniLeft = !isLeft && col % n === 0;
            let isMiniRight = !isRight && (col + 1) % n === 0;
            let isOriginalCell = props.originalGrid[row][col] !== 0;
            let isActiveCell = row === activeRow && col === activeCol;
            let isOldVal = props.grid[row][col] < 0;
            let val = Math.abs(props.grid[row][col]);
            rowList.push(<div key={i.toString()} data-row={row} data-col={col}
                              className={`cell ${isTop ? "top" : ""} ${isBottom ? "bottom" : ""} ${isLeft ? "left" : ""} ${isRight ? "right" : ""}
                                                ${isMiniTop ? "miniTop" : ""} ${isMiniBottom ? "miniBottom" : ""}
                                                ${isMiniLeft ? "miniLeft" : ""} ${isMiniRight ? "miniRight" : ""}
                                                ${isOriginalCell ? "originalCell" : ""} ${isActiveCell ? "activeCell" : ""}
                                                ${isOldVal ? "oldCell" : ""}`}
                              onMouseDown={_cellOnClick}> {val !== 0 ? val : ""} </div> )
        }
        out.push(<div key={row.toString()} className={'row'}>{rowList}</div> )
    }

    return (
        <div className={'grid'}>{out}</div>
    );
}

export default Grid