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
        board = ['', '', '',
                '', '', '',
                '', '', ''];
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
    let gameOver = false;

    const squareClicked = (position) => {
        let board = gameBoard.getBoard()
        if(gameOver){
            return;
        }
        if (board[position] === '') {
            if(playerOneTurn) {
                gameBoard.addMarker(position,"X")
            } else {
                gameBoard.addMarker(position,"O")
            }
            displayController.updateBoard();
            updateTurn();
            checkBoard();
        } else {
            return
        }
    }

    const checkBoard = () => {
        let board = gameBoard.getBoard()

        //check for victory
        if(
            board[0]===board[3] && board[3]===board[6] && board[6] !== '' ||
            board[1]===board[4] && board[4]===board[7] && board[7] !== '' ||
            board[2]===board[5] && board[5]===board[8] && board[8] !== '' ||
            board[0]===board[1] && board[1]===board[2] && board[2] !== '' ||
            board[3]===board[4] && board[4]===board[5] && board[5] !== '' ||
            board[6]===board[7] && board[7]===board[8] && board[8] !== '' ||
            board[0]===board[4] && board[4]===board[8] && board[8] !== '' ||
            board[2]===board[4] && board[4]===board[6] && board[6] !== ''
            ){
            endGameVictory()
            return;
        }

        //check for open squares, if none -> its a tie
        for(let i=0; i< board.length;i++){
            if(board[i]===''){
                return;
            }
        }
        endGameTie()
    }

    const endGameVictory = () => {
        if(playerOneTurn) {
            let playerTwo = displayController.getPlayerTwo()
            displayController.updateResult(`${playerTwo} won!`)
        } else {
            let playerOne = displayController.getPlayerOne()
            displayController.updateResult(`${playerOne} won!`)
        }
        gameOver = true;
    }

    const endGameTie = () => {
        displayController.updateResult("Its a tie!")
        gameOver = true;
    }

    const updateTurn = () => {
        playerOneTurn = !playerOneTurn;
    }

    const restartGame = () => {
        gameBoard.cleanBoard();
        gameOver = false;
        playerOneTurn = true;
        displayController.updateResult("");
        displayController.updateBoard()
    }

    const startGame = () => {
        displayController.activateDisplay();
    }

    return {
        squareClicked,
        checkBoard,
        restartGame,
        startGame,
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

    const result = document.querySelector("#result");
    const restart = document.querySelector("#restart");
    const playerOne = document.querySelector("#playerOne");
    const playerTwo = document.querySelector("#playerTwo")

    const activateDisplay = () => {
        let board = gameBoard.getBoard();
        for(let i = 0; i < board.length; i++) {
            let square = squares[i]
            let position = i;
            square.addEventListener("click", ()=> {
                gameEngine.squareClicked(position);
            } )
        }
        restart.addEventListener("click", ()=> {
            gameEngine.restartGame();
        })
    }
    
    const updateBoard = () => {
        let board = gameBoard.getBoard();
        for(let i = 0; i < board.length; i++) {
            let square = squares[i]
            square.textContent = board[i];
        }
    }

    const updateResult = (resultInfo) => {
        result.textContent = resultInfo;
    }

    const getPlayerOne = () => {
        return playerOne.value
    }

    const getPlayerTwo = () => {
        return playerTwo.value
    }

    return {
        updateBoard,
        updateResult,
        activateDisplay,
        getPlayerOne,
        getPlayerTwo,
    }

})();


//instasiation of game
gameEngine.startGame();
