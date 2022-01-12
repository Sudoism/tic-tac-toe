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
    let playerOneTurn = true;

    const squareClicked = (position) => {
        let board = gameBoard.getBoard()
        if (board[position] === '') {
            if(playerOneTurn) {
                gameBoard.addMarker(position,"X")
            } else {
                gameBoard.addMarker(position,"O")
            }
            updateTurn();
            checkBoard();
        } else {
            return
        }
        displayController.updateDisplay();
    }

    const checkBoard = () => {
        let board = gameBoard.getBoard()
        
        if(board[0]===board[3] && board[3]===board[6] && board[6] === 'O' ||
           board[0]===board[3] && board[3]===board[6] && board[6] === 'X' ||
           board[1]===board[4] && board[4]===board[7] && board[7] === 'O' ||
           board[1]===board[4] && board[4]===board[7] && board[7] === 'X' ||
           board[2]===board[5] && board[5]===board[8] && board[8] === 'O' ||
           board[2]===board[5] && board[5]===board[8] && board[8] === 'X' ||
           board[0]===board[1] && board[1]===board[2] && board[2] === 'O' ||
           board[0]===board[1] && board[1]===board[2] && board[2] === 'X' ||
           board[3]===board[4] && board[4]===board[5] && board[5] === 'O' ||
           board[3]===board[4] && board[4]===board[5] && board[5] === 'X' ||
           board[6]===board[7] && board[7]===board[8] && board[8] === 'O' ||
           board[6]===board[7] && board[7]===board[8] && board[8] === 'X' ||
           board[0]===board[4] && board[4]===board[8] && board[8] === 'O' ||
           board[0]===board[4] && board[4]===board[8] && board[8] === 'X' ||
           board[2]===board[4] && board[4]===board[6] && board[6] === 'O' ||
           board[2]===board[4] && board[4]===board[6] && board[6] === 'X' 
            ) {
            endGame()
        }
    }

    const endGame = () => {
        if(playerOneTurn) {
            console.log("O won!")
        } else {
            console.log("X won!")
        }
    }

    const updateTurn = () => {
        playerOneTurn = !playerOneTurn;
    }

    return {
        squareClicked,
        checkBoard,
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
displayController.instantiateDisplay();