//player factory function
let player = (name) => {
    const getName = () => name;
    return {
        getName,
    }
};

//gameBoard module
const gameBoard = (function() {
    let board = ['', '', '',
                '', '', '',
                '', '', ''];

    const getBoard = () => board;

    const addMarker = (position, marker) => {
        board[position] = marker;
    }

    const cleanBoard = () => {
        board = [null, null, null,
            null, null, null,
            null, null, null];
    }

    return {
        getBoard,
        addMarker,
        cleanBoard
    }
})();

//gameEngine module

//displayController module 
const displayController = (function() {

    let squares = [];
    squares.push(document.querySelector("#s0"));
    squares.push(document.querySelector("#s1"));
    squares.push(document.querySelector("#s2"));
    squares.push(document.querySelector("#s3"));
    squares.push(document.querySelector("#s4"));
    squares.push(document.querySelector("#s5"));
    squares.push(document.querySelector("#s6"));
    squares.push(document.querySelector("#s7"));
    squares.push(document.querySelector("#s8"));
    
    const updateDisplay = () => {
        let board = gameBoard.getBoard();
        for(let i = 0; i < board.length; i++) {
            let square = squares[i]
            square.textContent = board[i];
        }
    }

    return {
        updateDisplay,
        squares,
    }

})();


//instasiation of game
computer = player("computer");
player = player("player");