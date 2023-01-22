// Create the board and initialize the rules
let board = new BOARD();
const size = 8;

var swap = true;

for (let i = 1; i <= size; i++) {
  for (let j = 1; j <= size; j++) {
    const square = board.getBoardSquare([i, j]);
    square.getSquare().addEventListener("click", function () {
      const boardTurn = board.control([i, j]);
      console.log(boardTurn + " " + swap);
      swap = turnControl(boardTurn, swap);
    });
  }
}

/** controls the turn based on the turn global variable */
function turnControl(bTurn, swap) {
  if (bTurn && !swap) {
    console.log("print white");
    document.getElementById("b-span").classList.add("hidden");
    document.getElementById("w-span").classList.remove("hidden");
    return !swap;
  } else if (!bTurn && swap) {
    console.log("print black");
    document.getElementById("w-span").classList.add("hidden");
    document.getElementById("b-span").classList.remove("hidden");
    return !swap;
  }
  return swap;
}
