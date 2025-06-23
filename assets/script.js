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
        }
        return playBoard
    }

    return {showBoard, markSquare, newBoard};
})()

const game = (function(){
    function playRound(){

    }
})()

function newPlayer(marker){
    const marker = marker;
    const name = "";

    function setName(newName){
        name = newName;
    }

    const getName = () => name;

    const getMarker = () => marker;

    return {setName, getName, getMarker}
}