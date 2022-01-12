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
const gameEngine = (function() {

    const squareClicked = (position) => {
        console.log(position)
    }
    return {
        squareClicked,
    }


})();


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

    const instantiateDisplay = () => {
        let board = gameBoard.getBoard();
        for(let i = 0; i < board.length; i++) {
            let square = squares[i]
            let position = i;
            square.addEventListener("click", ()=> {
                gameEngine.squareClicked(position);
            } )
        }
    }
    
    const updateDisplay = () => {
        let board = gameBoard.getBoard();
        for(let i = 0; i < board.length; i++) {
            let square = squares[i]
            square.textContent = board[i];
        }
    }

    return {
        updateDisplay,
        instantiateDisplay
    }

})();


//instasiation of game
player1 = player("player1");
player2 = player("player2");