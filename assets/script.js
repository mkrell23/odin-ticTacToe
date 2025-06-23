const p = document.getElementById("edit")
p.innerText = "I'm here too";
console.log("and here");





const board = (function(){
    const playBoard = {};

    function newBoard(){
        for (i = 1; i <= 9; i++){
            playBoard[i] = "";
        };

        return playBoard;
    }

    const showBoard = () => playBoard

    function markSquare(marker, position){
        if ( playBoard[position] === ""){
            playBoard[position] = marker;
            return playBoard;
        }
        else {
            return false;
        }
    }

    return {showBoard, markSquare, newBoard};
})()

const game = (function(){
    const player1 = newPlayer("X")
    const player2 = newPlayer("O")

    let player1Turn = true;

    function newGame(){
        player1Turn = true;
        board.newBoard();
    }

    function playRound(square){
        currentPlayer = player1Turn ? player1 : player2;
        currentMarker = currentPlayer.getMarker();

        success = board.markSquare(currentMarker, square)

        if (success){
            player1Turn = !player1Turn;
            return true;
        } else {
            return false;
        }
    };

    function whoseTurn(){
        // Why doesn't this work??
        // player1Turn ? player1 : player2
        if (player1Turn) {
            return player1;
        } else {
            return player2;
        }
    };

    return {playRound, whoseTurn, newGame}
})()

function newPlayer(playerMarker){
    const marker = playerMarker;
    const name = "";

    function setName(newName){
        name = newName;
    }

    const getName = () => name;

    const getMarker = () => marker;

    return {setName, getName, getMarker}
};