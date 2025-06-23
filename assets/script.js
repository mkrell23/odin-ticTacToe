const gameBoard = document.getElementById("board");

let playing = true;

const board = (function(){
    const playBoard = {};

    function newBoard(){
        for (i = 0; i < 9; i++){
            playBoard[i] = "";
        };

        return playBoard;
    }

    const getBoard = () => playBoard

    function markSquare(marker, position){
        if ( playBoard[position] === ""){
            playBoard[position] = marker;
            return playBoard;
        }
        else {
            return false;
        }
    }

    function displayBoard(){
        gameBoard.innerHTML = "";
        for (i = 0; i < 9; i++){
            const square = document.createElement("div");
            square.setAttribute("data-id", i);
            square.classList.add("square");
            square.innerText = playBoard[i];
            square.addEventListener('click', squareClick)
            gameBoard.appendChild(square);
        }
    }

    function squareClick(e){
        if (playing){
            game.playTurn(e.target.dataset.id);
            displayBoard();
        }
    }

    return {getBoard, markSquare, newBoard, displayBoard};
})()

const game = (function(){
    const player1 = newPlayer("X")
    const player2 = newPlayer("O")

    let player1Turn = true;
    board.newBoard();

    function newGame(){
        playing = true;
        player1Turn = true;
        board.newBoard();
        player1.setName(null)
        player2.setName(null)
    }

    function playTurn(square){
        currentPlayer = whoseTurn();
        currentMarker = currentPlayer.getMarker();

        success = board.markSquare(currentMarker, square)

        if (success){
            if (checkWinner(success)){
                playing = false;
                console.log("WINNER IS", (currentPlayer.getName() ? currentPlayer.getName() : currentMarker));
            } else if (boardFull(success)) {
                playing = false;
                console.log("TIE");
            } else {
                switchTurn();
                return success;
            };
        } else {
            return false;
        }
    };

    function switchTurn(){
        player1Turn = !player1Turn
    };

    function checkWinner(board){
        if (board[0] !== "" && board[0] === board[1] && board[0] === board[2]
            || board[3] !== "" && board[3] === board[4] && board[3] === board[5]
            || board[6] !== "" && board[6] === board[7] && board[6] === board[8]
            || board[0] !== "" && board[0] === board[3] && board[0] === board[6]
            || board[1] !== "" && board[1] === board[4] && board[1] === board[7]
            || board[2] !== "" && board[2] === board[5] && board[2] === board[8]
            || board[0] !== "" && board[0] === board[4] && board[0] === board[8]
            || board[2] !== "" && board[2] === board[4] && board[2] === board[6]
        ) {
            return true;
        } else {
            return false;
        }
    }

    function boardFull(playBoard){
        for (i = 0; i < 9; i++){
            if (playBoard[i] === ""){
                return false
            };
        };
        return true;
    }

    const whoseTurn = () => player1Turn ? player1 : player2

    return {playTurn, whoseTurn, newGame, player1, player2}
})()

function newPlayer(playerMarker){
    const marker = playerMarker;
    let name = null;

    function setName(newName){
        name = newName;
    }

    const getName = () => name;

    const getMarker = () => marker;

    return {setName, getName, getMarker}
};

board.displayBoard();