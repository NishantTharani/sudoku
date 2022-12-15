import React from "react";


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

export default Status