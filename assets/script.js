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

    function showBoard(){
        return playBoard
    }

    function markSquare(marker, position){
        if ( playBoard[position] === ""){
            playBoard[position] = marker;
        }
        return playBoard
    }

    newBoard()


    return {showBoard, markSquare, newBoard};
})()

const game = (function(){
    function playRound(){

    }
})()