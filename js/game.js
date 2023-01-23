// Create the board and initialize the rules
var board = new BOARD();
const size = 8;
var swap = true;
squareProxy(board);

// set up event listeners for game-over screen
document.querySelector(".replay").addEventListener("click", () => {
  board.reset();
  swap = false;
  swap = turnControl(true, board, swap);
  document.querySelector(".game-over").classList.add("hidden");
  console.log("hello");
})

// set up event listeners for the squares
function squareProxy(board) {
  for (let i = 1; i <= size; i++) {
    for (let j = 1; j <= size; j++) {
      const square = board.getBoardSquare([i, j]);
      square.getSquare().addEventListener("click", function () {
        const boardTurn = board.control([i, j]);
        swap = turnControl(boardTurn, board, swap);
      });
    }
  }
}

/** controls the turn based on the turn global variable */
function turnControl(bTurn, board, swap) {
  if (bTurn && !swap) {
    // whites turn
    document.getElementById("b-span").classList.add("hidden");
    document.getElementById("w-span").classList.remove("hidden");
    if (board.isCheckMate()) {
      console.log("white is mated");
      document.querySelector(".game-over").classList.remove("hidden");
    }
    return !swap;
  } else if (!bTurn && swap) {
    // blacks turn
    document.getElementById("w-span").classList.add("hidden");
    document.getElementById("b-span").classList.remove("hidden");
    if (board.isCheckMate()) {
      console.log("black is mated");
      document.querySelector(".game-over").classList.remove("hidden");
    }
    return !swap;
  }
  return swap;
}
