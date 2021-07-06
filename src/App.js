import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';

function Grid(props) {
  let height = props.n ** 2;
  let n = props.n;
  let out = [];

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
      rowList.push(<div key={i.toString()} className={`cell ${isTop ? "top" : ""} ${isBottom ? "bottom" : ""} ${isLeft ? "left" : ""} ${isRight ? "right" : ""}
                                                ${isMiniTop ? "miniTop" : ""} ${isMiniBottom ? "miniBottom" : ""}
                                                ${isMiniLeft ? "miniLeft" : ""} ${isMiniRight ? "miniRight" : ""}`}> {props.grid[row][col]} </div> )
    }
    out.push(<div key={row.toString()} className={'row'}>{rowList}</div> )
  }

  return (
      <div className={'grid'}>{out}</div>
  );
}

function App() {
  const [grid, setGrid] = useState([]);
  const [n, setN] = useState(0);

  function _newGame() {
    fetch('/api/new_puzzle')
        .then(response => response.text())
        .then(data => JSON.parse(data))
        .then(newGame => {
          console.log(newGame.grid);
          setGrid(newGame.grid);
          setN(newGame.n);
        });

  }

  useEffect(() => {
    _newGame();
  }, []);

  return (
    <div className="App">
      <Grid grid={grid} n={n}/>
    </div>
  );
}

export default App;
