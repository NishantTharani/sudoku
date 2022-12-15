import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import Grid from "./components/Grid"
import Status from "./components/Status"
import NewGameButton from "./components/NewGameButton";
import SolveGameButton from "./components/SolveGameButton";




function BottomBar(props) {
  return (
      <div className={'bottomBar'}>
        <NewGameButton setGrid={props.setGrid} setOriginalGrid={props.setOriginalGrid} setN={props.setN} />
        <SolveGameButton setGrid={props.setGrid} originalGrid={props.originalGrid} changeCell={props.changeCell} />
      </div>
  )
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

  function changeCell(row, col, val) {
    setGrid(grid => {
      const newGrid = [];
      grid.forEach(row => {
        const newRow = [];
        row.forEach(cell => {
          newRow.push(cell);
        })
        newGrid.push(newRow);
      });
      newGrid[row][col] = val;
      return newGrid;
    });
  }

  useEffect(() => {
    _newGame();
  }, []);

  useEffect(() => {
    let checkGrid = grid.length > 0;
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
        <Grid originalGrid={originalGrid} grid={grid} n={n} setGrid={setGrid} changeCell={changeCell}/>
        <BottomBar setGrid={setGrid} setOriginalGrid={setOriginalGrid} setN={setN} originalGrid={originalGrid}
                  changeCell={changeCell} />
      </div>
    </div>
  );
}

export default App;
