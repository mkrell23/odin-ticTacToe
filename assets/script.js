const gameBoard = document.getElementById("board");
const resetButton = document.getElementById("reset");
const player1NameBox = document.getElementById("player1Name");
const player2NameBox = document.getElementById("player2Name");
const winnerDisplay = document.getElementById("winner");

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
    }

    function playTurn(square){
        currentPlayer = whoseTurn();
        currentMarker = currentPlayer.getMarker();

        success = board.markSquare(currentMarker, square)

        if (success){
            if (checkWinner(success)){
                playing = false;
                currentWinner = (currentPlayer.getName() ? currentPlayer.getName() : currentMarker)
                winnerDisplay.innerText = (currentWinner + " is the winner!");
                console.log("WINNER IS", (currentPlayer.getName() ? currentPlayer.getName() : currentMarker));
            } else if (boardFull(success)) {
                playing = false;
                winnerDisplay.innerText = "It's a tie!"
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

    const whoseTurn = () => player1Turn ? player1 : player2;

    return {playTurn, whoseTurn, newGame, player1, player2};
})()

function newPlayer(playerMarker){
    const marker = playerMarker;
    let name = null;

    function setName(newName){
        name = newName;
    }

    const getName = () => name;

    const getMarker = () => marker;

    return {setName, getName, getMarker};
};

resetButton.addEventListener('click', resetGame);

function resetGame(){
    game.newGame();
    board.displayBoard();
    game.player1.setName(null)
    game.player2.setName(null)
    winnerDisplay.innerText = ""
    player1NameBox.value = null
    player2NameBox.value = null
};

player1NameBox.addEventListener("input", function(e){
    game.player1.setName(this.value);
})

player2NameBox.addEventListener("input", function(e){
    game.player2.setName(this.value);
})

board.displayBoard();