//player factory function
let player = (name) => {
    const getName = () => name;
    return {
        getName,
    }
};

//gameBoard module
const gameBoard = (function() {
    let board = [null, null, null,
                null, null, null,
                null, null, null];

    const getBoard = () => board;

    return {
        getBoard,
    }
})();

//gameEngine module

//displayController module 

computer = player("computer");
player = player("player");