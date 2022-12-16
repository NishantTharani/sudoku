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
        <NewGameButton setGrid={props.setGrid} setOriginalGrid={props.setOriginalGrid} setN={props.setN}
          setWrongCells={props.setWrongCells}
          setLastFilledIn={props.setLastFilledIn}
        />
        <SolveGameButton
            setGrid={props.setGrid} originalGrid={props.originalGrid} changeCell={props.changeCell}
            setLastFilledIn={props.setLastFilledIn}
            lastFilledIn={props.lastFilledIn}
        />
      </div>
  )
}

function App() {
  const [originalGrid, setOriginalGrid] = useState([]);
  const [grid, setGrid] = useState([]);
  const [n, setN] = useState(0);
  const [gameState, setGameState] = useState("incomplete");
  const [wrongCells, setWrongCells] = useState([])
  const [lastFilledIn, setLastFilledIn] = useState(0)

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

  function _getCols(grid) {
    let out = []
    for (let j = 0; j < n*n; j++) {
      let col = []
      for (let i = 0; i < n*n; i++) {
        col.push(grid[i][j])
      }
      out.push(col)
    }
    return out
  }

  function _getSegments(grid) {
    let out = []
    for (let top = 0; top < n*n; top += n) {
      for (let left = 0; left < n*n; left += n) {
        let segment = []
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            segment.push(grid[top+i][left+j])
          }
        }
        out.push(segment)
      }
    }
    return out
  }

  function _getSegment(grid, i, j) {
    // Returns the segment to which i,j belongs
    let top = Math.floor(i / n) * 3
    let left = Math.floor(j / n) * 3
    let segment = []
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        segment.push(grid[top+i][left+j])
      }
    }
    return segment
  }

  function changeCell(row, col, val) {
    // Create a new grid and set it as the current state
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

  // Check which cells are wrong when the grid changes
  useEffect(() => {
    // Identify which cells are incorrectly filled
    const newWrongCells = []
    const cols = _getCols(grid)
    const segments = _getSegments(grid)

    for (let i = 0; i < n*n; i++) {
      for (let j = 0; j < n*n; j++) {
        if (grid[i][j] > 0 && originalGrid[i][j] === 0) {
          // > 0 rules out old cells during the backtracking animation
          if (
              (grid[i].filter(val => val === grid[i][j]).length > 1) ||
              (cols[j].filter(val => val === grid[i][j]).length > 1) ||
              (_getSegment(grid, i, j).filter(val => val === grid[i][j]).length > 1)
          ) {
            newWrongCells.push([i, j])
            console.log(`Found a wrong cell: ${i},${j}`)
            console.log(`Row was: ${grid[i]}`)
            console.log(`Col was: ${cols[j]}`)
            console.log(`Segment was: ${_getSegment(grid, i, j)}`)
          }
        }
      }
    }
    setWrongCells(newWrongCells)
  }, [grid])

  useEffect(() => {
    console.log("Wrong cells: " + wrongCells)
  }, [wrongCells])

  return (
    <div className="App">
      <div className={'gridHolder'}>
        <Status gameState={gameState} />
        <Grid originalGrid={originalGrid} grid={grid} n={n} setGrid={setGrid}
              changeCell={changeCell}
              wrongCells={wrongCells}
              lastFilledIn={lastFilledIn}
        />
        <BottomBar setGrid={setGrid} setOriginalGrid={setOriginalGrid} setN={setN} originalGrid={originalGrid}
                  changeCell={changeCell}
                   setWrongCells={setWrongCells}
                  lastFilledIn={lastFilledIn}
                  setLastFilledIn={setLastFilledIn}
        />
      </div>
    </div>
  );
}

export default App;
