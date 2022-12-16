import React from "react";
import Button from "react-bootstrap/Button"


function SolveGameButton(props) {
    const setGrid = props.setGrid;
    const originalGrid = props.originalGrid;
    const changeCell = props.changeCell;
    const lastFilledIn = props.lastFilledIn
    const setLastFilledIn = props.setLastFilledIn
    const height = originalGrid.length

    function _handleSolveGameClick(e) {
        fetch('/api/solve_puzzle', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                grid: originalGrid
            })
        })
            .then(response => response.text())
            .then(data => JSON.parse(data))
            .then(data => {
                const history = data.history;
                const interval = 100;
                let timeout = 0;

                if (history[2] === 0) {
                    console.log('here');
                }

                history.forEach(change => {
                    setTimeout(() => {
                        if (change[2] === 0) {
                            console.log('here');
                        }
                        changeCell(change[0], change[1], change[2]);
                        setLastFilledIn(change[0]*height + change[1])
                    }, timeout)
                    timeout += interval;
                })

                console.log(history);
            })
    }

    return (
        <button
            onClick={_handleSolveGameClick}
            className={'solve-button'}
        >
            Solve Game
        </button>
        // <Button variant="secondary" onClick={_handleSolveGameClick}>Solve Game</Button>
    )
}

export default SolveGameButton