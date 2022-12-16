import React from "react";
import Button from "react-bootstrap/Button"


function NewGameButton(props) {
    const setGrid = props.setGrid;
    const setOriginalGrid = props.setOriginalGrid;
    const setN = props.setN;

    function _handleNewGameClick(e) {
        fetch('/api/new_puzzle')
            .then(response => response.text())
            .then(data => JSON.parse(data))
            .then(newGame => {
                console.log(newGame.grid);
                setOriginalGrid(newGame.grid);
                setGrid(newGame.grid);
                setN(newGame.n);
                props.setWrongCells([])
                props.setLastFilledIn(0)
            });
    }

    return (
        <button
            onClick={_handleNewGameClick}
            className={'new-button'}
        >
            New Game
        </button>
        // <Button variant="info" onClick={_handleNewGameClick}>New Game</Button>
    )
}

export default NewGameButton