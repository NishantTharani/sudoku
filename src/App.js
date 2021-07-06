import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';

function Status(props) {
  let gameState = props.gameState;

  let statusString = "";
  switch (gameState) {
    case "incomplete":
      statusString = "Your game is: incomplete :s";
      break
    case "incorrect":
      statusString = "Your game is: incorrect :(";
      break
    case "correct":
      statusString = "Your game is: solved :D";
      break
  }

  return (
      <div className={'gameState'}>{statusString}</div>
  )
}

function Grid(props) {
  let height = props.n ** 2;
  let n = props.n;
  let setGrid = props.setGrid;
  let grid = props.grid;
  let out = [];

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
          const newGrid = [];
          grid.forEach(row => {
            const newRow = [];
            row.forEach(cell => {
              newRow.push(cell);
            })
            newGrid.push(newRow);
          });
          if (keyCode >= 49 && keyCode <= 57) {
            newGrid[activeRow][activeCol] = keyCode - 48;
          } else if (keyCode === 8 || keyCode === 46) {
            newGrid[activeRow][activeCol] = 0;
          }
          setGrid(newGrid);
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
      let val = props.grid[row][col];
      rowList.push(<div key={i.toString()} data-row={row} data-col={col}
                          className={`cell ${isTop ? "top" : ""} ${isBottom ? "bottom" : ""} ${isLeft ? "left" : ""} ${isRight ? "right" : ""}
                                                ${isMiniTop ? "miniTop" : ""} ${isMiniBottom ? "miniBottom" : ""}
                                                ${isMiniLeft ? "miniLeft" : ""} ${isMiniRight ? "miniRight" : ""}
                                                ${isOriginalCell ? "originalCell" : ""} ${isActiveCell ? "activeCell" : ""}`}
                  onMouseDown={_cellOnClick}> {val !== 0 ? val : ""} </div> )
    }
    out.push(<div key={row.toString()} className={'row'}>{rowList}</div> )
  }

  return (
      <div className={'grid'}>{out}</div>
  );
}

function App() {
  const [originalGrid, setOriginalGrid] = useState([]);
  const [grid, setGrid] = useState([]);
  const [n, setN] = useState(0);
  const [gameState, setGameState] = useState("incomplete");

  function _newGame() {
    fetch('/api/new_puzzle')
        .then(response => response.text())
        .then(data => JSON.parse(data))
        .then(newGame => {
          console.log(newGame.grid);
          setOriginalGrid(newGame.grid);
          setGrid(newGame.grid);
          setN(newGame.n);
        });

  }

  useEffect(() => {
    _newGame();
  }, []);

  useEffect(() => {
    let checkGrid = true;
    grid.forEach(row => {
      row.forEach(cell => {
        if (cell === 0) {
          checkGrid = false;
        }
      })
    })

    if (checkGrid) {
      fetch('/api/check_puzzle', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          grid: grid
        })
      })
          .then(response => response.text())
          .then(data => JSON.parse(data))
          .then(data => {
            setGameState(data.status);
          })
    } else {
      setGameState("incomplete");
    }
    console.log(gameState);
  }, [grid])

  return (
    <div className="App">
      <div className={'gridHolder'}>
      <Status gameState={gameState} />
      <Grid originalGrid={originalGrid} grid={grid} n={n} setGrid={setGrid} />
      </div>
    </div>
  );
}

export default App;
